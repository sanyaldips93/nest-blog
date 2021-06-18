import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/models/user.dto';

@Injectable()
export class AuthService {
  private mockUser = {
    email: 'd.s@sd.com',
    token: 'jwt.token.here',
    username: 'jake',
    bio: 'i work at state',
    image: null,
  };

  register(credentials: RegisterDto) {
    return this.mockUser;
  }

  login(credentials: LoginDto) {
    if (credentials.email == this.mockUser.email) return this.mockUser;
    throw new InternalServerErrorException();
  }
}
