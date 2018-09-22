import { ValidateLogin } from '../validators/LoginValidator';
import { IsUsernameTaken } from '../validators/IsUsernameTaken';
import { ModelInterface } from '../libs/interface/ModelInterface';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length, ValidationError, ValidationOptions, validate } from 'class-validator';

@Entity()
export class User implements ModelInterface {

  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 80, {
    groups: ['save', 'update', 'login']
  })
  @IsUsernameTaken({
    message: 'Username is already taken.',
    groups: ['save', 'update']
  })
  @ValidateLogin({
    message: 'Account not found.',
    groups: ['login']
  })
  @Column()
  username: String

  @Length(1, 80, {
    groups: ['save', 'update', 'login']
  })
  @Column()
  password: String

  public validate = async (groups?: ValidationOptions): Promise<Array<ValidationError>> => {
    return await validate(this, groups);
  }

}