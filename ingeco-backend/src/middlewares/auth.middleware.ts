import { Injectable, NestMiddleware } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
   
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      let token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, 'mysecret', function(err, payload) {
        if (!err) {
          //confirm identity and check user permissions
          req.payload = payload;
          console.log("payload",payload)
          next();
        } else {
          return res.status(403).json(err);
        }
      });
    } else {  
      return res
        .status(401)
        .json('You must provide a valid authenticated access token.');
    }

    // console.log(res);
  }
}
