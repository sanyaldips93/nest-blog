import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from './abstract-entity';

@Entity('users')
export class UserEntities extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany((type) => UserEntities, (user) => user.followees)
  @JoinTable()
  followers: UserEntities[];

  @ManyToMany((type) => UserEntities, (user) => user.followers)
  followees: UserEntities[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJson() {
    return classToPlain(this);
  }

  toProfile(user: UserEntities) {
    const following = this.followers.includes(user);
    const profile: any = this.toJson();
    delete profile.followers;
    return { ...profile, following };
  }
}
