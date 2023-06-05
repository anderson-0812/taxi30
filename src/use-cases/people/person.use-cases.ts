import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import readXlsxFile from "read-excel-file/node";
import * as fs from 'fs';

import { PersonVehicleOptionsDto, SignUpDto, UpdateActiveDto, UpdateImagePersonDto, UpdatePersonDto } from "../../core/dtos";
import { errorClientResponse, errorNotRegisterFound, responseDetail, successResponse } from "../../helpers/responses";
import { IDataServices } from "../../core/abstracts";
import { PersonFactoryService } from "./person-factory.service";
import { ERROR_CODE_OK, INTERNAL_CODE_EMPTY_LIST } from "../../helpers/codeResponse";
import { formatDatePerson, formatRole, formatRolePerson } from "../../helpers/utilities";
import { AuthFactoryService } from "../auth";

@Injectable()
export class PersonUseCases {

  constructor(
    private dataServices: IDataServices,
    private personFactoryService: PersonFactoryService,
    private authFactoryService: AuthFactoryService
  ) { }

  //Atributos a obtener del usuario
  private userAttributes = {
    idPerson: true,
    identification: true,
    name: true,
    lastname: true,
    birthday: true,
    cellphone: true,
    email: true,
    gender: true,
    active: true,
    image: true,
    role: true,
    isDisabled: true,
    account: {
      idAccount: true,
      username: true,
      google: true,
      profiles: {
        idProfile: true,
        name: true
      }
    },
    refreshTokens: {
      idRefreshToken: true,
      token: true
    },
  };

  //Atributos a obtener del usuario por paginación
  private userAttibutesPaginate = [
    'person.idPerson',
    'person.identification',
    'person.name',
    'person.lastname',
    'person.birthday',
    'person.countryCode',
    'person.cellphone',
    'person.email',
    'person.gender',
    'person.image',
    'person.active',
    'person.role',
    'person.hasAddress',
    'person.isBicibus',
    'person.isCarpool',
    'person.latitude',
    'person.longitude',
    'person.principal_street',
    'person.secondary_street',
    'person.isDisabled',
    'account.username',
    'account.idAccount',
    'account.google'
  ];


  //Obtener listado de personas
  async getAllPeople() {
    const people = await this.dataServices.people.getAll('account', this.userAttributes);
    if (people.length <= 0) {
      return responseDetail(INTERNAL_CODE_EMPTY_LIST, null, ERROR_CODE_OK, "Listado de personas vacía", null);
    }
    return successResponse("Listado de Personas obtenido satisfactoriamente", people);
  }

  //Obtener información de una persona
  async getPerson(idPerson: number) {
    const person = await this.dataServices.people.getOne({ idPerson: idPerson }, 'account,refreshTokens,account.profiles', this.userAttributes);
    if (!person) {
      return errorNotRegisterFound("No existe la persona con el id enviado");
    }
    return successResponse("Persona obtenida correctamente", person);
  }

  //Actualizar persona y cuenta
  async updatePerson(idPerson: number, updatePersonDto: UpdatePersonDto) {
    const obj = this.personFactoryService.updatePerson(updatePersonDto);
    const person = await this.dataServices.people.getOne({ idPerson }, 'account');
    await this.dataServices.accounts.update(person.account.idAccount, obj.account);
    await this.dataServices.people.update(idPerson, obj.person);
    return successResponse("Persona actualizada satisfactoriamente", null);
  }

  //Actualizar imagen de la persona
  async updateImagePerson(idPerson: number, updateImagePersonDto: UpdateImagePersonDto) {
    await this.dataServices.people.update(idPerson, { image: updateImagePersonDto.imagePath });
    return successResponse("La imagen de usuario se actualizó correctamente", null);
  }

  //Actualizar estado de la persona
  async updateActivePerson(personId: number, updateActiveDto: UpdateActiveDto) {
    await this.dataServices.people.updateActive(personId, { active: updateActiveDto.active });
    return successResponse("El estado de la persona se actualizó correctamente", null);
  }

  //Buscar Persona
  async searchPerson(options: any, search: any, filters: any) {
    const relations = [
      {
        principal: 'person',
        secondary: 'account'
      }
    ];

    let columnsQueryEquals = {}
    let columnsQueryLike = {}

    if (search != '') {
      columnsQueryLike = {
        'person.name': search,
        'person.lastname': search,
        'person.identification': search,
        'person.email': search,
        'person.role': formatRolePerson(search),
        'account.username': search,
      }
    }

    if (filters.isCarpool && filters.isBicibus) {
      columnsQueryEquals = { 'person.isCarpool': true, 'person.isBicibus': true };
    } else {
      if (filters.isBicibus !== undefined || filters.isCarpool !== undefined) {
        if (filters.isBicibus !== undefined && filters.isCarpool == undefined) {
          columnsQueryEquals = filters.isBicibus ? { 'person.isBicibus': true } : { 'person.isBicibus': false };
        } else if (filters.isBicibus == undefined && filters.isCarpool !== undefined) {
          columnsQueryEquals = filters.isCarpool ? { 'person.isCarpool': true } : { 'person.isCarpool': false };
        } else if (filters.isBicibus !== undefined && filters.isCarpool !== undefined) {
          if (filters.isBicibus == false && filters.isBicibus == false) {
            columnsQueryEquals = { 'person.isCarpool': false, 'person.isBicibus': false };
          }
          if (filters.isBicibus == false && filters.isCarpool) {
            columnsQueryEquals = ({ 'person.isCarpool': true });
          }
          if (filters.isBicibus && filters.isCarpool == false) {
            columnsQueryEquals = ({ 'person.isBicibus': true });
          }
        }
      }
    }

    // filter type: 1(Todos) 2 (Rol Chofer) 3 (Uusarios sin rol chofer)
    if (filters.active && !filters.inactive) {
      switch (filters.type) {
        case 1:
          columnsQueryEquals = this.getColumnsQueryEquals(true, filters);
          break;
        case 2:
          columnsQueryEquals = this.getColumnsQueryEquals(true, filters, 4);
          break;
        case 3:
          columnsQueryEquals = this.getColumnsQueryEquals(true, filters, [1, 2, 3]);
          break;
        default:
          break;
      }
    }

    if (!filters.active && filters.inactive) {
      switch (filters.type) {
        case 1:
          columnsQueryEquals = this.getColumnsQueryEquals(false, filters);
          break;
        case 2:
          columnsQueryEquals = this.getColumnsQueryEquals(false, filters, 4);
          break;
        case 3:
          columnsQueryEquals = this.getColumnsQueryEquals(false, filters, [1, 2, 3]);
          break;
        default:
          break;
      }
    }

    const orderBy = (options.orderBy == 'username') ? `account.${options.orderBy}` : `person.${options.orderBy}`;
    const people = await this.dataServices.people.paginateCondition(options, 'person', relations, this.userAttibutesPaginate, columnsQueryEquals, columnsQueryLike, [{ attribute: orderBy, order: (options.descending) ? 'DESC' : 'ASC' }]);
    return successResponse("Búsqueda exitosa de usuarios", people);
  }

  private getColumnsQueryEquals(active: boolean, filters?: any, role?: any) {
    let columnsQueryEquals = (active) ? { 'person.active': 1 } : { 'person.active': 0 };

    if (role) {
      columnsQueryEquals['person.role'] = role;
    }

    if (filters.isCarpool || filters.isBicibus) {
      if (filters.isCarpool) {
        columnsQueryEquals['person.isCarpool'] = true;
        columnsQueryEquals['person.isBicibus'] = (filters.isBicibus) ? true : false;
      } else {
        columnsQueryEquals['person.isCarpool'] = false;
        columnsQueryEquals['person.isBicibus'] = (filters.isBicibus) ? true : false;
      }
    }
    return columnsQueryEquals;
  }


  //Subir imagen de usuario
  /*
  async uploadImage(idPerson: number, image: Express.Multer.File) {
    const person = await this.dataServices.people.getOne({ idPerson });
    if (!person) {
      throw new HttpException('El usuario no existe', HttpStatus.BAD_REQUEST);
    }
    person.image = image.filename;
    const result = await this.dataServices.people.update(idPerson, person);
    successResponse('La imagen se subio correctamente', result);
  }
  */

  //Importar datos desde excel
  /*
  async importDataFromExcel(file: Express.Multer.File) {
    try {
      const data = await readXlsxFile(file.path);
      data.shift();

      let people = [] as any;

      for (const user of data) {
        const result = await this.dataServices.people.count([{ identification: user[0] }, { cellphone: user[5] }, { email: user[6] }]);
        //En caso de que el usuario no esté registrado
        if (result == 0) {
          const obj: SignUpDto = {
            identification: user[0].toString(),
            name: user[1] as string,
            lastname: user[2] as string,
            birthday: formatDatePerson(user[3] as string),
            countryCode: user[4] as string,
            cellphone: user[5] as string,
            email: user[6] as string,
            gender: user[7] as string,
            image: '',
            role: formatRole(user[8] as string),
            isDisabled: (user[9].toString() == "Si") ? true : false,
            account: {
              username: user[10] as string,
              password: user[11] as string,
            }
          }
          const person = await this.authFactoryService.signUp(obj);
          people.push(person);
        }
      }

      const newPeople = await this.dataServices.people.create(people);
      // //Eliminar el archivo subido
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });

      return successResponse("Se han creado las personas y cuentas de manera correctamente", newPeople);
    } catch (error) {
      console.log(error);
      errorClientResponse('Existió un error al importar los datos de los usuarios', null);
    }
  }
  */

  //Obtener vehículos por persona
  async getVehiclesByPerson(idPerson: number) {
    const person = await this.dataServices.people.getOne({ idPerson: idPerson, vehicles: [{ active: true }] }, 'vehicles');
    return successResponse("Listado de vehículos activos obtenida correctamente", person);
  }

  //Obtener vehículo activo de la persona
  async getActiveVehicleByPerson(personVehicleOptionsDto: PersonVehicleOptionsDto) {
    const person = await this.dataServices.people.getOne({ idPerson: personVehicleOptionsDto.idPerson, vehicles: [{ active: true }, { idVehicle: personVehicleOptionsDto.idVehicle }] }, 'vehicles');
    return successResponse("Vehículo activo de la persona obtenido correctamente", person);
  }

  //Actualizar el vehículo activo del usuario
  async setActiveUseVehicle(personVehicleOptionsDto: PersonVehicleOptionsDto) {
    const person = await this.dataServices.people.getOne({ idPerson: personVehicleOptionsDto.idPerson, vehicles: { active: true } }, 'vehicles');
    if (!person) {
      return responseDetail(INTERNAL_CODE_EMPTY_LIST, null, ERROR_CODE_OK, "La persona no tiene vehículos asignados", null);
    }

    /*
    for (const vehicle of person.vehicles) {
      const value = (vehicle.idVehicle == personVehicleOptionsDto.idVehicle) ? true : false;
      await this.dataServices.vehicles.update(vehicle.idVehicle, { activeUse: value });
    }
    */
    
    return successResponse('Se actualizó el vehículo correctamente', null);
  }

  // Obtener el numero de usuarios
  async countPerson() {
    const result = await this.dataServices.people.count();
    return successResponse('El número de personas se obtuvo correctamente', result);
  }

  //Obtener los últimos 14 registros de usuarios
  async getLastUsers() {
    const people = await this.dataServices.people.getAll(null, { idPerson: 1, name: 1, lastname: 1, role: 1, email: 1, createdAt: 1 }, null, 14, { createdAt: "DESC" });
    return successResponse('El listado de usuarios se obtuvo correctamente', people);
  }

  //Obtener personas de acuerdo a su rol institucional 
  async getPeopleByRole(role: number) {
    const people = await this.dataServices.people.getAll(null, { idPerson: true }, { role: role });
    return successResponse('El listado de usuarios de acuerdo a su rol se obtuvo correctamente', people);
  }
}
