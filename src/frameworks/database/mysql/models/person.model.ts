import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.model';
// import { RelocatedSquare } from './relocated_square.model';
// import { SquareFraction } from './square_fraction.model';
// import { Member } from './member.model';
// import { Travel } from './travel.model';
// import { Vehicle } from './vehicle.model';
// import { PersonService } from './person_service.model';
// import { Blurd } from './blurd.model';
// import { PanicButtom, Passenger, Routes, Score, SummaryTravel } from './index';
import { } from './index';

// import { Group } from './group.model';
import { RefreshToken } from './refresh_token.model';
// import { NotificationPerson } from './notification_person.model';
// import { PersonPlace } from './person_place.model';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  idPerson: number;

  @Column({ nullable: true })
  identification: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column()
  countryCode: string;

  @Column()
  cellphone: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  gender: string;

  @Column()
  role: number;

  @Column({ default: false })
  isDisabled: boolean;

  @Column({ nullable: true })
  idAplication: number;

  @Column({ nullable: true })
  idPlatform: number;

  @Column({ nullable: false })
  hasAddress: boolean;

  @Column('boolean', { default: true })
  active: boolean = true;

  @Column('boolean', { default: false })
  isBicibus: boolean;

  @Column('boolean', { default: false })
  isCarpool: boolean;

  @Column({ type: "double", nullable: true })
  longitude: number;

  @Column({ type: "double", nullable: true })
  latitude: number;

  @Column({ nullable: true })
  principal_street: string;

  @Column({ nullable: true })
  secondary_street: string;

  @OneToOne(() => Account, { cascade: true })
  @JoinColumn({ name: 'idAccount' })
  account: Account;

  @OneToMany(() => RefreshToken, (refreshToken: RefreshToken) => refreshToken.person)
  refreshTokens: RefreshToken[];
/*
  @OneToMany(() => Group, (group) => group.person)
  groups: Group[];

  @OneToMany(() => Member, (Member) => Member.persona)
  members: Member[];

  @OneToMany(() => Travel, (travel) => travel.person)
  travels: Travel[];

  @OneToMany(() => Travel, (travel) => travel.personRegister)
  travelsRegisters: Travel[];
  */

  /*
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.people)
  @JoinTable({
    name: 'person_vehicle',
    joinColumn: {
      name: 'idPerson',
      referencedColumnName: 'idPerson'
    },
    inverseJoinColumn: {
      name: 'idVehicle',
      referencedColumnName: 'idVehicle'
    }
  })
  */
  // vehicles: Vehicle[];
  /*

  @OneToMany(() => RelocatedSquare, (relocatedSquare) => relocatedSquare.person)
  relocatedSquares: RelocatedSquare[];

  @OneToMany(() => SquareFraction, (squareFraction) => squareFraction.person)
  squareFractions: SquareFraction[];

  @OneToMany(() => PersonService, (personService) => personService.person)
  personServices: PersonService[];

  @OneToMany(() => PersonPlace, (personPlace) => personPlace.person)
  personPlaces: PersonPlace[];

  @OneToMany(() => Blurd, (blurd) => blurd.person)
  blurds: Blurd[];

  @OneToMany(() => Passenger, (passenger) => passenger.person)
  passengers: Passenger[];

  @OneToMany(() => NotificationPerson, notificationPerson => notificationPerson.notification)
  notificationPersons: NotificationPerson[];

  @OneToMany(() => PanicButtom, (panic) => panic.person)
  panic: PanicButtom[];

  @OneToMany(() => Routes, (routes) => routes.personRoute)
  routePerson: Routes[];

  @OneToMany(() => Score, (score) => score.person)
  scores: Score[];
  */

  // @ManyToMany(() => SummaryTravel, summaryTravel => summaryTravel.people)
  // summaryTravels: SummaryTravel[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
