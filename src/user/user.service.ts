import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { updateUserDto } from 'src/dto/user.dto';
import { UserEntities } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntities) private userRepo: Repository<UserEntities>,
  ) {}

  async findByUsername(username: string): Promise<UserEntities> {
    return this.userRepo.findOne({ where: { username } });
  }

  async updateUser(username: string, data: updateUserDto) {
    await this.userRepo.update({ username }, data);
    return this.findByUsername(username);
  }
}
