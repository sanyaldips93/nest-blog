/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntities } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntities) private userRepo: Repository<UserEntities>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDto) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJson(), token } };
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
      if (user && (await user.comparePassword(password))) {
        const payload = { username: user.username };
        const token = this.jwtService.sign(payload);
        return { user: { ...user.toJson(), token } };
      }
      throw new UnauthorizedException();
    } catch (err) {
      throw new InternalServerErrorException('Invalid Credentials');
    }
  }
}
