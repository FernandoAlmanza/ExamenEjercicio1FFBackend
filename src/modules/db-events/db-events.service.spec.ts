import { Test, TestingModule } from '@nestjs/testing';
import { DbEventsService } from './db-events.service';

describe('DbEventsService', () => {
  let service: DbEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbEventsService],
    }).compile();

    service = module.get<DbEventsService>(DbEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
