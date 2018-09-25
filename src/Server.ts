import "reflect-metadata";

import Koa from 'koa';
import { Container } from 'typedi';
import { AuthCheckerHelper } from './helpers/AuthChecker.helper';
import { createKoaServer, useContainer } from "routing-controllers";
import { CurrentUserCheckerHelper } from "./helpers/CurrentUserChecker.helper";

export class Server {

  public app: Koa;

  constructor() {
    useContainer(Container);
    const auth = Container.get(AuthCheckerHelper);
    const current = Container.get(CurrentUserCheckerHelper);
     this.app = createKoaServer({
      development: false,
      validation: false,
      cors: true,
       authorizationChecker: auth.check,
       currentUserChecker: current.check,
      controllers: [__dirname + '/controllers/*.js']
    });
  }

}