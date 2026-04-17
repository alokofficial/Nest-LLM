import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import bcrypt from 'bcrypt'
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel:Model<User>){}
  async createUser(registerUserDto:RegisterDto){
    const hashPassword = await bcrypt.hash(registerUserDto.password, 10);
    try{
      return await this.userModel.create({
        fname:registerUserDto.fname,
        lname:registerUserDto.lname,
        email:registerUserDto.email,
        password:hashPassword,
        role:"admin"
      })
    }catch(err){
      const e = err as {code?:number}
      const DUPLICATE_KEY_CODE = 11000
      if(e.code==DUPLICATE_KEY_CODE) throw new ConflictException("Email already exist") 
      throw err
    }
  }
  async loginUser(loginUserDto:LoginUserDto){
    try {
      const user = await this.userModel.findOne({email:loginUserDto.email})
      if(user){
        const matchedPass = await bcrypt.compare(loginUserDto.password,user.password)
        if(matchedPass) return user
      }
      return null
  
    } catch (error) {
      throw new ExceptionsHandler()
    }
  }
  async userProfile(id:string){
    return await this.userModel.findOne({_id:id})
  }
}
