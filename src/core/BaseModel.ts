import { ValidationOptions, ValidationError, validate } from 'class-validator';

export class BaseModel {
  
  public async validate(groups?: ValidationOptions): Promise<ValidationError[]> {
    return await validate(this, groups);
  }

}