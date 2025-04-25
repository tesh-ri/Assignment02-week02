import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt/jwt.strategy';

@Module({
  imports: [PassportModule , 
    JwtModule.register({
      secret: 'ritesh#001', // secret key here
      signOptions: { expiresIn: '1h' }, // optional
    })
  ],
  controllers: [AppController , AuthController],
  providers: [AppService , AuthService , JwtStrategy],
})
export class AppModule {}
