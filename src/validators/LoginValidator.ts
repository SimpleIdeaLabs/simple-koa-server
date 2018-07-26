import { User } from '../models/User';
import Database from '../database/Database';
import { BCryptService } from '../services/BCryptService';
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/**
 * Custom Class-Validator for User Login
 * @param validationOptions 
 */
export const ValidateLogin = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "validateLogin",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          
          // Parse request body
          const parsed:any = args.object.valueOf();

          // Extract Payload
          const { username, password } = parsed;
          if (!username || !password) return false;
          
          // Check Payload Against Database
          return Database.manager.findOne(User, { username: value })
                  .then(async (user: User) => {
                    return user && await BCryptService.compare(password, String(user.password));
                  });
        }
      }
    });
  };
}