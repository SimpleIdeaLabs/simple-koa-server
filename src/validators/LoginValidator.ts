import { Container } from 'typedi';
import { User } from '../database/models/User';
import { Database } from './../database/Database';
import { BCryptService } from './../services/BCrypt.service';
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export const ValidateLogin = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "validateLogin",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): Promise<boolean> | boolean {
          const bcrypt = Container.get(BCryptService);
          const db = Container.get(Database);

          // Parse request body
          const parsed:any = args.object.valueOf();

          // Extract Payload
          const { username, password } = parsed;
          if (!username || !password) return false;
          
          // Check Payload Against Database
          return db.connection.manager.findOne(User, { username: value })
                  .then(async (user: User) => {
                    return user && await bcrypt.compare(password, String(user.password));
                  });
        }
      }
    });
  };
}