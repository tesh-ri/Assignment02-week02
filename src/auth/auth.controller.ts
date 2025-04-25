import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/jwt.gaurd";


@Controller('')
export class AuthController{
    constructor(private authService:AuthService){}
//signup req
@Post('/signup')
register(@Body()body:CreateUserDto){
   return this.authService.signup(body)
}

@Post('/login')
login(@Body() body){
  return this.authService.login(body)
}




@UseGuards(JwtAuthGuard)
@Get('/profile')
profile(@Req() req){
    // console.log(req)
    return{
      data:req.user,
      message:"User profile data"
    }
   
}
@UseGuards(JwtAuthGuard)
@Get('/dashboard')
dashboard(@Req() req){
    // console.log(req)
    return{
      data:req.user,
      message:"User Dashboard data"
    }
   
}

}
