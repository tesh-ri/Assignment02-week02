import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'ritesh#001',
        });
      }
      async validate(payload: any) {
        // payload = { username: 'john', sub: 1 }
        console.log(payload)
       return {email:payload.email , id:payload.id}
      }
    
}