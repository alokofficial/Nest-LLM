import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth') // /auth/*
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return token
  }
  @Post('login')
  async login(@Body() loginUserDto:LoginUserDto){
    const token = await this.authService.loginUser(loginUserDto)
    return token
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req){
    const id = req.user.sub
    const user = await this.authService.userProfile(id)
    return user
  }
}
