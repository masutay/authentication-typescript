import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { validate, validateOrReject, IsEmail, isByteLength, Length } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userName: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    @IsEmail({},{message:"Invalid"})
    email: string;

    @Column()
    @Length(5)
    password: string;

}