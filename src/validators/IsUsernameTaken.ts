import { User } from '../models/User';
import Database from '../database/Database';
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/**
 * Custom Class-Validator for Username Checking
 * @param validationOptions 
 */
export const IsUsernameTaken = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isUsernameTaken",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
           // Check Payload Against Database
          return Database.manager.findOne(User, { username: value })
            .then(async (user: User) => {
              return user? false: true;
            });
        }
      }
    });
  };
}