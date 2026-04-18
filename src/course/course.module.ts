import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name: Course.name, schema: CourseSchema}]), JwtModule.register({
        // global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '600s' },
      }),],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
