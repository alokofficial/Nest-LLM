import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    const user = await this.userService.createUser(registerUserDto)
    const payload = {sub:user._id}
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token:token
    }
  }

  async loginUser(loginUserDto:LoginUserDto){
    const user = await this.userService.loginUser(loginUserDto)
    if(!user) return "Invalid credential"
    const payload = {sub:user._id}
    const token = await this.jwtService.signAsync(payload)
    return {
      access_token:token
    }
  }
}
