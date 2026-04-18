import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel:Model<Course>){}
  async create(createCourseDto: CreateCourseDto) {
    const course = await this.courseModel.create({
      name:createCourseDto.name,
      description:createCourseDto.description,
      level:createCourseDto.level,
      price:createCourseDto.price,
    })
    return course
  }

  findAll() {
    return this.courseModel.find();
  }

  findOne(id: string) {
    return this.courseModel.findById(id);
  }

  findByPrice(price: number) {
    return this.courseModel.find({ price: { $lte: price } });
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true });
  }

  remove(id: string) {
    return this.courseModel.findByIdAndDelete(id);
  }
}
