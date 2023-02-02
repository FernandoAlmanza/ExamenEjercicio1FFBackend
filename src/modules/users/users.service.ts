import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/users.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { phone, isDeleted: null, userStatus: 'Active' },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
