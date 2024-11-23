import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Client } from './Client';

@Entity({
  name: 'devices',
})
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  mac_address: string;

  @OneToMany(() => Client, (client) => client.device)
  clients: Client[];
}
