import * as _ from 'lodash';
import { Service, Container } from 'typedi';
import { Action } from 'routing-controllers';
import { User } from './../database/models/User';
import { JWTService } from './../services/JWT.service';
import { UserRepository } from '../database/repositories/User.repository';

@Service()
export class AuthCheckerHelper {
  
  public async check(action: Action, roles: string[]): Promise<boolean> {
    const jwt = Container.get(JWTService);
    const userRepo = Container.get(UserRepository);
    const token = action.request.headers["authorization"];

    // Check token
    if (!token) return false;
    const parsed: User  = await jwt.verify(token);

    // Get User form DB
    const user = await userRepo.getUserById(parsed.id);

    // Check with Roles
    const intersectingRoles = _.intersection(roles, _.map(user.roles, 'name'));

    return user && intersectingRoles.length ? true : false;
  }

}