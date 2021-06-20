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

  async followUser(currentUser: UserEntities, username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });
    user.followers.push(currentUser);
    await user.save();
    return user.toProfile(currentUser);
  }

  async unfollowUser(currentUser: UserEntities, username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });
    user.followers = user.followers.filter(
      (follower) => follower.username !== currentUser.username,
    );
    await user.save();
    return user.toProfile(currentUser);
  }
}
