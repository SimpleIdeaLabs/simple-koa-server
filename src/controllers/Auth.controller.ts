import { User } from './../database/models/User';
import { Controller, Post, Body, OnUndefined } from "routing-controllers";
import { UserRepository } from "../database/repositories/User.repository";

@Controller()
export class AuthController {

  constructor(
    private userRepository: UserRepository
  ) { }

  @Post("/login")
  @OnUndefined(401)
  async login(
    @Body() body: User
  ) {
    return await this.userRepository.login(body);
  }

}