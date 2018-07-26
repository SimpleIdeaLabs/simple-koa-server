export interface SeederInterface {
  /**
   * Function to check if seed should run
   */
  hasBeenSeed: Function

  /**
   * Function to trigger seeding
   */
  execute: Function
}