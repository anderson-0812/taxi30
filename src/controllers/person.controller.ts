import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PersonVehicleOptionsDto, SearchOptionsDto, UpdateActiveDto, UpdateImagePersonDto, UpdatePersonDto } from "../core/dtos";
import { CountPersonResponseDto, GetPeopleResponseDto, GetPersonResponseDto, ImportPersonResponseDto, SearchPersonResponseDto, SetActiveVehicleResponseDto, UpdateActivePersonResponseDto, UpdateImagePersonResponseDto, UpdatePersonResponseDto
    // , VehiclePersonActiveResponseDto, VehiclePersonResponseDto 
} from "../core/dtos/responses";
import { excelFileFilter, storage } from "../helpers/upload-file";
import { JwtAuthGuard } from "../frameworks/auth/guards/jwt.auth.guard";
import { PersonUseCases } from "../use-cases/people/person.use-cases";


@ApiBearerAuth()
@ApiTags('Persona')
@Controller('/api/person')
export class PersonController {
    constructor(private personUseCases: PersonUseCases) { }

    //Obtener listado de Usuarios completa
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @ApiResponse({
        status: 200,
        description: 'Obtener listado de personas y la cuenta asociada',
        type: GetPeopleResponseDto
    })
    getAllPeople() {
        return this.personUseCases.getAllPeople();
    }

    //Obtener el número total de personas
    @UseGuards(JwtAuthGuard)
    @Get('/count')
    @ApiResponse({
        status: 200,
        description: 'Obtener el número total de usuarios registrados en el sistema',
        type: CountPersonResponseDto
    })
    countPeople() {
        return this.personUseCases.countPerson();
    }

    //Obtener los últimos 14 registros de usuarios
    @UseGuards(JwtAuthGuard)
    @Get('/last')
    @ApiResponse({
        status: 200,
        description: 'Obtener listado de los últimos 14 usuarios registrados',
        type: GetPeopleResponseDto
    })
    getLastUsers() {
        return this.personUseCases.getLastUsers();
    }

    //Obtener usuario por id
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiResponse({
        status: 200,
        description: 'Obtener un registro de persona con su cuenta asociada',
        type: GetPersonResponseDto
    })
    getPerson(@Param('id') idPerson: number) {
        return this.personUseCases.getPerson(idPerson);
    }

    //Actualizar Información de Usuario
    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    @ApiResponse({
        status: 200,
        description: 'Actualizar información del usuario',
        type: UpdatePersonResponseDto
    })
    updatePerson(
        @Param('id') personId: number,
        @Body() updatePersonDto: UpdatePersonDto) {
        return this.personUseCases.updatePerson(personId, updatePersonDto);
    }

    //Actualizar imagen de usuario
    @UseGuards(JwtAuthGuard)
    @Put('/update-image/:id')
    @ApiResponse({
        status: 200,
        description: 'Actualizar imagen del usuario',
        type: UpdateImagePersonResponseDto
    })
    updateImagePerson(@Param('id') idPerson: number, @Body() updateImagePersonDto: UpdateImagePersonDto) {
        return this.personUseCases.updateImagePerson(idPerson, updateImagePersonDto);
    }

    //Actualizar Estado del Usuario
    @UseGuards(JwtAuthGuard)
    @Put('/update-active/:id')
    @ApiResponse({
        status: 200,
        description: 'Actualizar estado del usuario (Activo/Inactivo)',
        type: UpdateActivePersonResponseDto
    })
    updateActivePerson(@Param('id') idPerson: number, @Body() updateActiveDto: UpdateActiveDto) {
        return this.personUseCases.updateActivePerson(idPerson, updateActiveDto);
    }

    //Buscar Usuarios
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 201,
        description: 'Buscar y filtrar usuarios de acuerdo a su estado (Activo/Inactivo)',
        type: SearchPersonResponseDto
    })
    @Post('/search')
    searchPerson(@Body() searchOptionsDto: SearchOptionsDto) {
        searchOptionsDto.limit = parseInt(searchOptionsDto.limit) > 100 ? '100' : searchOptionsDto.limit;

        const pagination = { 
            page: parseInt(searchOptionsDto.page), 
            limit: parseInt(searchOptionsDto.limit),  
            orderBy: searchOptionsDto.sortBy,
            descending: searchOptionsDto.descending
        }
        return this.personUseCases.searchPerson(pagination, searchOptionsDto.search, searchOptionsDto.filters);
    }

    //Importar datos desde archivo de Excel
    @UseGuards(JwtAuthGuard)
    @Post('/upload-file')
    @ApiResponse({
        status: 201,
        description: 'Importar datos de usuarios desde archivo de excel',
        type: ImportPersonResponseDto
    })
    // @UseInterceptors(FileInterceptor('file', { storage: storage('./uploads/user-data'), fileFilter: excelFileFilter }))
    // uploadFilePerson(@UploadedFile() file: Express.Multer.File) {
    //     return this.personUseCases.importDataFromExcel(file);
    // }

    //Obtener vehículos por persona
    // @UseGuards(JwtAuthGuard)
    // @Get('/get-vehicles/:id')
    // @ApiResponse({
    //     status: 201,
    //     description: 'Obtener todos los vehículos que estén activos y asociados a un usuario',
    //     type: VehiclePersonActiveResponseDto
    // })
    getVehiclesByPerson(@Param('id') idPerson: number) {
        return this.personUseCases.getVehiclesByPerson(idPerson);
    }

    //Obtener vehículos por persona (todos)
    // @UseGuards(JwtAuthGuard)
    // @Post('/get-vehicle-active')
    // @ApiResponse({
    //     status: 201,
    //     description: 'Obtener el vehículo activo del usuario',
    //     type: VehiclePersonResponseDto
    // })
    // getActiveVehicleByPerson(@Body() personVehicleOptionsDto: PersonVehicleOptionsDto) {
    //     return this.personUseCases.getActiveVehicleByPerson(personVehicleOptionsDto);
    // }

    // Actualizar el vehículo activo del usuario
    @UseGuards(JwtAuthGuard)
    @Put('/set-active-use-vehicle')
    @ApiResponse({
        status: 201,
        description: 'Actualizar el vehículo que está en uso por parte del usuario. El usuario solo puede contar con un vehículo activo a la vez.',
        type: SetActiveVehicleResponseDto
    })
    setActiveUseVehicle(@Body() personVehicleOptionsDto: PersonVehicleOptionsDto) {
        return this.personUseCases.setActiveUseVehicle(personVehicleOptionsDto);
    }
}