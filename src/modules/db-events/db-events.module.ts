import { Module } from '@nestjs/common';
import { dbEventProviders } from './db-events.providers';
import { DbEventsService } from './db-events.service';

@Module({
  providers: [DbEventsService, ...dbEventProviders],
})
export class DbEventsModule {}
