import { Container } from 'typedi';
import { User } from './../database/models/User';
import { Database } from './../database/Database';
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export const IsUsernameTaken = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string):void => {
    registerDecorator({
      name: "isUsernameTaken",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): Promise<boolean> {
          const db = Container.get(Database);
          const parsed: any = args.object.valueOf();
          const qB = db.connection.manager.createQueryBuilder(User, 'user');
          if (parsed.id) {
            qB.where('user.id != :id AND user.username = :username', { id: parsed.id, username: value })
          } else {
            qB.where('user.username = :username', { username: value })
          }
          return qB.getOne().then((user) => {
            return user ? false : true;
          });
        }
      }
    });
  };
}