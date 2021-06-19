import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntities } from 'src/entities/user.entity';
import { ProfileController } from './profile.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntities]), AuthModule],
  controllers: [UserController, ProfileController],
  providers: [UserService],
})
export class UserModule {}
