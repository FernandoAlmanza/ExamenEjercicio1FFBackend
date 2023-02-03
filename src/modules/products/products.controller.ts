import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { Products as ProductsEntity } from './products.entity';
import { ProductsDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query() query) {
    let data;
    const order =
      query.orderType && !!query.orderType ? query.orderType : 'ASC';
    const modality =
      query.orderBy && !query.search
        ? 'order'
        : query.search && !query.orderBy
        ? 'search'
        : query.search && query.orderBy
        ? 'both'
        : 'normal';
    if (modality === 'order') data = query.orderBy;
    else if (modality === 'search') data = query.search;
    else if (modality === 'both') data = [query.search, query.orderBy];

    return await this.productsService.findAll(modality, data, order, query.page, query.limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductsEntity> {
    // find the product with this id
    const product = await this.productsService.findOne(id);

    // if the product doesn't exit in the db, throw a 404 error
    if (!product) {
      throw new NotFoundException("This product doesn't exist");
    }

    // if post exist, return the product
    return product;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() product: ProductsDto,
    @Request() req,
  ): Promise<ProductsEntity> {
    // create a new product and return the newly created product
    return await this.productsService.create(product, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: ProductsDto,
    @Request() req,
  ): Promise<ProductsEntity> {
    // get the number of row affected and the updated product
    const { numberOfAffectedRows, updatedProduct } =
      await this.productsService.update(id, product, req.user.id);

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (!numberOfAffectedRows) {
      throw new NotFoundException("This product doesn't exist");
    }

    // return the updated post
    return updatedProduct;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.productsService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (!deleted) {
      throw new NotFoundException("This product doesn't exist");
    }

    // return success message
    return 'Product was successfully deleted';
  }
}
