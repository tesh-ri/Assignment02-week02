import {
  Get,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { user } from './interface/user.interace';


@Injectable()
export class AuthService {
  private usersInfo: user[] = [];
  private userData = [];
  constructor(private jwtService: JwtService) {}
  //there are total two methods one is login and signup

  async login(body) {
    try {
      let user = this.usersInfo.find((u) => u.email === body.email);
      if (!user) {
        return {
          message: 'invalid user',
          status: 404,
        };
      }
      //now check here for the password
      let isValid = await bcrypt.compare(body.password, user.password);
      if (!isValid) {
        return {
          status: 401,
          message: 'user credentials are not valid',
        };
      }
      //now it is valid means it is authentic user now create a token and pass before this creat a payload
      const payload = { id: user.id, email: user.email };

      const token = await this.jwtService.signAsync(payload);
      return {
        token,
        message: 'user loged in successfully',
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

// signup ka code
async signup(body:user){
    try {
         //check whether email is already present or not
   let user=this.usersInfo.find(u=>u.email=body.email)
   if(user){
    return{
        status:409,
        message:"user already exist"
    }
   }
   //now write the logic to add user in database before this hash the password
   
   const hashedPassword = await bcrypt.hash(body.password, 10);
   this.usersInfo.push({
    ...body,
    password:hashedPassword
   })
   return {
     status:201,
     message:"user successfully registered"
   }

    } catch (error) {
        return{
            status:error.status,
            message:error.message
        }
    }
  



}














}
