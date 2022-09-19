/* eslint-disable @typescript-eslint/naming-convention */
import User from '../modules/accounts/infrastructure/typeorm/entities/User';

declare module 'express' {
  export interface Response {
    locals: {
      user: User;
    };
  }
}
