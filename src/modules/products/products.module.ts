import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { DbEventsModule } from '../db-events/db-events.module';
import { dbEventProviders } from '../db-events/db-events.providers';

@Module({
  providers: [
    ProductsService,
    ...productsProviders,
    DbEventsModule,
    ...dbEventProviders,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
