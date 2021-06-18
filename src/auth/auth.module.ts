import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntities } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntities])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
