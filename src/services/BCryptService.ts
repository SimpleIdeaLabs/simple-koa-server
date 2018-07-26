import { hash, compare } from 'bcryptjs';

/**
 * Wrapper for BCrypt
 */
export class BCryptService {

  /**
   * Generate secured password
   */
  static hash = async (password: string) => {
    return await hash(password, 10);
  }

  /**
   * Check password
   */
  static compare = async (rawPassword: string, hashedPassword: string) => {
    return await compare(rawPassword, hashedPassword);
  }

}