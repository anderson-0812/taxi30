import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./person.model";
import { Profile } from "./profile.model";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    idAccount: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true, select: false })
    passwordTemp: string;

    @Column('boolean', { default: false })
    rememberMe: boolean;

    @Column('boolean', { default: true })
    active: boolean = true;

    @OneToOne(() => Person, (person: Person) => person.account)
    person: Person;

    @ManyToMany(() => Profile, profile => profile.accounts)
    @JoinTable({ 
        name: 'account_profile',
        joinColumn: {
            name: 'idAccount',
            referencedColumnName: 'idAccount',
        }, 
        inverseJoinColumn: {
            name: 'idProfile',
            referencedColumnName: 'idProfile'
        }
    })
    profiles: Profile[];

    @CreateDateColumn({ type: "timestamp", select: false })
    createdAt: number;

    @UpdateDateColumn({ type: "timestamp", select: false })
    updatedAt: number;

    
    @Column('boolean', { default: false })
    google: boolean;
}