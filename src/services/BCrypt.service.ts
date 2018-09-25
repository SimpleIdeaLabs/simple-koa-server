import { Service } from 'typedi';
import { hash, compare } from 'bcryptjs';
 
@Service()
export class BCryptService {

  public async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }

  public async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(rawPassword, hashedPassword);
  }

}