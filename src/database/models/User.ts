import { Role } from './Role';
import { MinLength } from 'class-validator';
import { BaseModel } from './../../core/BaseModel';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { IsUsernameTaken } from '../../validators/IsUsernameTaken';
import { IsPasswordConfirmed } from './../../validators/isPasswordConfirmed';

@Entity()
export class User extends BaseModel{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(1, {
    groups: ['save', 'update', 'login']
  })
  @IsUsernameTaken({
    message: 'Username already taken',
    groups: ['save', 'update']
  })
  username: string;

  @Column()
  @MinLength(1, {
    groups: ['save', 'login']
  })
  @IsPasswordConfirmed({
      message: 'Confirm Password',
      groups: ['save', 'update']
  })
  password: string;

  cpassword: string;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable({name: 'user_role'})
  roles: Role[]


}