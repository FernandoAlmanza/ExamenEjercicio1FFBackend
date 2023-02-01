import { Injectable, Inject } from '@nestjs/common';
import { User } from '../users/user.entity';
import { DB_EVENT_REPOSITORY, PRODUCTS_REPOSITORY } from '../../core/constants';
import { Products } from './products.entity';
import { ProductsDto } from './dto/products.dto';
import { DbEvent } from '../db-events/db-events.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: typeof Products,
    @Inject(DB_EVENT_REPOSITORY)
    private readonly dbEventsRepository: typeof DbEvent,
  ) {}

  async create(products: ProductsDto, userId): Promise<Products> {
    const promiseSolved = await this.productsRepository.create<Products>({
      ...products,
      userId,
      productStatus: 'Active',
    });
    await this.dbEventsRepository.create<DbEvent>({
      userId,
      operation: 'Created a product',
      productId: promiseSolved.dataValues.id,
    });
    return promiseSolved;
  }

  async findAll(): Promise<Products[]> {
    // TODO: Agregar orderBy y busquedas
    return await this.productsRepository.findAll<Products>({
      where: { isDeleted: null },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Products | null> {
    return await this.productsRepository.findOne({
      where: { id, isDeleted: null },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    const updateResponse = await this.productsRepository.update(
      { isDeleted: true },
      { where: { id, userId, isDeleted: null }, returning: true },
    );
    await this.dbEventsRepository.create<DbEvent>({
      userId,
      operation: 'Deleted a product',
      productId: id,
    });
    return updateResponse[1];
  }

  async update(id, data, userId) {
    const updateResponse = await this.productsRepository.update(
      { ...data },
      { where: { id, userId, isDeleted: null }, returning: true },
    );
    const numberOfAffectedRows = updateResponse[1];
    const updatedProduct = await this.productsRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    await this.dbEventsRepository.create<DbEvent>({
      userId,
      operation: 'Modified a product',
      productId: updatedProduct.dataValues.id,
    });
    return { numberOfAffectedRows, updatedProduct };
  }
}
