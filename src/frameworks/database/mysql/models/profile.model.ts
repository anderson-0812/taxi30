import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.model";
// import { Module } from "./module.model";


@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    idProfile: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column('boolean', { default: true })
    active: boolean = true;

    @ManyToMany(() => Account, account => account.profiles)
    accounts: Account[];

    // @ManyToMany(() => Module, module => module.profiles, { cascade: true })
    // @JoinTable({
    //     name: 'profile_module',
    //     joinColumn: {
    //         name: 'idProfile',
    //         referencedColumnName: 'idProfile'
    //     },
    //     inverseJoinColumn: {
    //         name: 'idModule',
    //         referencedColumnName: 'idModule'
    //     }
    // })
    // modules: Module[];

    @CreateDateColumn({ type: "timestamp", select: false })
    createdAt: number;

    @UpdateDateColumn({ type: "timestamp", select: false })
    updatedAt: number;
}