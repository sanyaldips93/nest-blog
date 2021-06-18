/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto } from 'src/auth/dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntities } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntities) private userRepo: Repository<UserEntities>,
  ) {}

  async register(credentials: RegisterDto) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      return user;
    } catch (err) {
      if (err.code == '23505') {
        throw new ConflictException('Username already exists!');
      }
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (user && (await user.comparePassword(password))) return user;
      throw new UnauthorizedException();
    } catch (err) {
      throw new InternalServerErrorException('Invalid Credentials');
    }
  }
}
