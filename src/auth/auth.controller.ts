/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body(ValidationPipe) credentials: RegisterDto) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}
