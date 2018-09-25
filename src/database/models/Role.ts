import { User } from './User';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';

export enum Roles {
  GUEST = 'Guest',
  ADMIN = 'Admin'
}

@Entity()
export class Role{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => User, user => user.roles)
  users: User[]

}
