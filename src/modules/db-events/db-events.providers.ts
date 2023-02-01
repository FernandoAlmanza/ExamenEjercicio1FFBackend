import { DbEvent } from './db-events.entity';
import { DB_EVENT_REPOSITORY } from '../../core/constants';

export const dbEventProviders = [
  {
    provide: DB_EVENT_REPOSITORY,
    useValue: DbEvent,
  },
];
