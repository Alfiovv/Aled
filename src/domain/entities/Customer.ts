import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    constructor(firstname?: string, lastname?: string, email?: string) {
        if (firstname) this.firstname = firstname;
        if (lastname) this.lastname = lastname;
        if (email) this.email = email;

    }

}