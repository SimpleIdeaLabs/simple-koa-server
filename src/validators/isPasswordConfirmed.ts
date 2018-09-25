import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export const IsPasswordConfirmed = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "IsPasswordConfirmed",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions, 
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          try {
            const parsed: any = args.object.valueOf();
            const { cpassword } = parsed;
            // If Update 
            if (parsed.id) {
              if (!value || value.length <= 0) return true;
              if (value.trim() === cpassword.trim()) {
                return true;
              }
              return false;
            }

            // If Create
            else {
              if (value.length && cpassword.length && (value.trim() === cpassword.trim())) {
                return true;
              }
            }

            // Default false
            return false;
          } catch(e) {
            return false;
          }
        }
      }
    });
  };
}