import { Injectable, Inject } from '@nestjs/common';
import { DbEvent } from './db-events.entity';
import { User } from '../users/user.entity';
import { Products } from '../products/products.entity';
import { DB_EVENT_REPOSITORY } from '../../core/constants';

@Injectable()
export class DbEventsService {
  constructor(
    @Inject(DB_EVENT_REPOSITORY)
    private readonly dbEventRepository: typeof DbEvent,
  ) {}

  async create(operation, userId, productId): Promise<DbEvent> {
    return await this.dbEventRepository.create<DbEvent>({
      operation,
      userId,
      productId,
    });
  }
}
