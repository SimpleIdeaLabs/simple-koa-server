import { User } from '../../models/User';
import { plainToClass } from 'class-transformer';
import { BaseSeed } from '../../libs/core/BaseSeed';
import { BCryptService } from '../../services/BCryptService';
import { SeederInterface } from '../../libs/interface/SeederInterface';

/**
 * Seed Users
 */
export class UserSeed extends BaseSeed implements SeederInterface {

  /**
   * Initialize
   */
  constructor() {
    super();
  }

  /**
   * Check if already seeded
   */
  async hasBeenSeed(): Promise<boolean> {
    try {
      const hasData = await this.database.manager.findOne(User);
      if (hasData) return true;
      return false;
    } catch(e) {
      console.log(e);
      throw new Error(e);
    }
  }

  /**
   * Insert User's data
   */
  async execute(): Promise<void> {
    try {
      // Prevent seed twice
      if (await this.hasBeenSeed() === true) return;

      // Create user object
      const newUser = await plainToClass(User, {
        username: 'test',
        password: await BCryptService.hash('test')
      });
      await this.database.manager.save(User, newUser);
    } catch(e) {
      console.log(e);
      throw new Error(e);
    }
  }

}