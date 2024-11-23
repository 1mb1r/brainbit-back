import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Client } from './Client';

@Entity({
  name: 'roles',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @OneToMany(() => Client, (client) => client.role)
  clients: Client[];
}
