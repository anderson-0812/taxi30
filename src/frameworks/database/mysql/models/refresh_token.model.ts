import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person.model";

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    idRefreshToken: number;

    @Column({ length: 1000 })
    token: string;

    @Column({ type: 'bigint' })
    expiryDate: string;

    @Column({ type: 'tinyint', comment: '1. Móvil  2. Web' })
    platform: number;

    @ManyToOne(() => Person, (person: Person) => person.refreshTokens)
    @JoinColumn({ name: 'idPerson' })
    person: Person;
}