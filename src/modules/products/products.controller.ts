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
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { QueryError } from 'sequelize';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary:
      'Obtención de registros de productos de la base de datos delimitado a ciertos registros por pagina, con orden y criterio de busqueda',
  })
  @ApiQuery({
    name: 'orderBy',
    required: true,
    description:
      'Criterio de orden acorde a las entidades de las bases de datos',
    schema: { oneOf: [{ type: 'string' }] },
    example: 'sku',
  })
  @ApiQuery({
    name: 'orderType',
    type: 'string',
    example: 'DESC',
    description:
      'Forma en la que se estará obteniendo los datos en la base (ASCendente/DESCendente)',
  })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    description: 'Palabra clave a buscar',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    example: '1',
    description: 'Pagina en cuestión',
  })
  @ApiQuery({
    name: 'limit',
    type: 'integer',
    example: '5',
    description: 'Limite por pagina',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        count: {
          description: 'Total de columnas en la base de datos',
          type: 'number',
          example: '2',
        },
        rows: {
          enum: [
            [
              {
                id: 1,
                sku: '5544332222',
                productName: 'Launcher en python',
                price: 15000,
                registryDate: '2020-12-10',
                userId: 2,
                productStatus: 'Active',
                productType: 'Software',
                isDeleted: null,
                createdAt: '2023-02-02T04:25:41.000Z',
                updatedAt: '2023-02-03T02:17:10.000Z',
                user: {
                  id: 2,
                  name: 'Juan Maximo',
                  lastName: 'Dominguez',
                  secondLastName: 'Santana',
                  birthdate: '1996-08-10',
                  phone: '5544332211',
                  userStatus: 'Active',
                  isDeleted: null,
                  createdAt: '2023-02-02T04:23:49.000Z',
                  updatedAt: '2023-02-02T04:23:49.000Z',
                },
              },
              {
                id: 2,
                sku: '5544332222',
                productName: 'Launcher en python',
                price: 15000,
                registryDate: '2020-12-10',
                userId: 2,
                productStatus: 'Active',
                productType: 'Software',
                isDeleted: null,
                createdAt: '2023-02-02T04:26:32.000Z',
                updatedAt: '2023-02-02T04:26:32.000Z',
                user: {
                  id: 2,
                  name: 'Juan Maximo',
                  lastName: 'Dominguez',
                  secondLastName: 'Santana',
                  birthdate: '1996-08-10',
                  phone: '5544332211',
                  userStatus: 'Active',
                  isDeleted: null,
                  createdAt: '2023-02-02T04:23:49.000Z',
                  updatedAt: '2023-02-02T04:23:49.000Z',
                },
              },
            ],
          ],
        },
      },
    },
  })
  async findAll(
    @Query('orderBy') orderBy: string,
    @Query('orderType') orderType: string,
    @Query('page') page: number,
    @Query('limit') limit: string,
    @Query('search') search?: string,
  ) {
    let data;
    const order = orderType && !!orderType ? orderType : 'ASC';
    const modality =
      orderBy && !search
        ? 'order'
        : search && !orderBy
        ? 'search'
        : search && orderBy
        ? 'both'
        : 'normal';
    if (modality === 'order') data = orderBy;
    else if (modality === 'search') data = search;
    else if (modality === 'both') data = [search, orderBy];

    return await this.productsService.findAll(
      modality,
      data,
      order,
      page ?? 1,
      parseInt(limit),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Obtiene los datos de un producto',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: '10',
    description: 'ID del producto en cuestión',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        id: {
          description: 'ID del producto en la base de datos',
          type: 'number',
          example: '10',
        },
        sku: {
          description: 'Clave del producto en la base de datos',
          type: 'string',
          example: 'XAXXX00000012345',
        },
        productName: {
          description: 'Nombre del producto en la base de datos',
          type: 'string',
          example: 'Launcher en python',
        },
        price: {
          description: 'Precio del producto en la base de datos',
          type: 'string',
          example: '15000',
        },
        registryDate: {
          description: 'Fecha de registro oficial del producto',
          type: 'string',
          example: '2020-12-10',
        },
        userId: {
          description:
            'ID del usuario que registró el producto en la base de datos',
          type: 'number',
          example: '2',
        },
        productStatus: {
          description: 'Estado actual del producto en la base de datos',
          type: 'string',
          example: 'Cancelled',
        },
        productType: {
          description: 'Tipo de producto en la base de datos',
          type: 'string',
          example: 'Software',
        },
        isDeleted: {
          description:
            'Esta es una bandera de borrado logico en la base de datos, si esta levantada, devolverá error',
          type: 'object',
          example: 'null',
        },
        createdAt: {
          description:
            'Este campo muestra la fecha y hora en UTC en la que se hizo el registro',
          type: 'string',
          example: '2023-02-02T04:23:49.000Z',
        },
        updatedAt: {
          description:
            'Este campo muestra la fecha y hora en UTC en la que se hizo el cambio al registro',
          type: 'string',
          example: '2023-02-02T04:23:49.000Z',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              description: 'ID del usuario en la base de datos',
              type: 'number',
              example: '2',
            },
            name: {
              description: 'Nombre del usuario en la base de datos',
              type: 'string',
              example: 'Juan Maximo',
            },
            lastName: {
              description: 'Apellido paterno del usuario en la base de datos',
              type: 'string',
              example: 'Dominguez',
            },
            secondLastName: {
              description: 'Apellido paterno del usuario en la base de datos',
              type: 'string',
              example: 'Santana',
            },
            birthdate: {
              description:
                'Fecha de nacimiento del usuario en la base de datos',
              type: 'string',
              example: '1996-08-10',
            },
            phone: {
              description: 'Teléfono del usuario en la base de datos',
              type: 'string',
              example: '5544332211',
            },
            userStatus: {
              description:
                'Estado actual del usuario en la base de datos (Devolverá error si el usuario esta inactivo)',
              type: 'string',
              example: 'Active',
            },
            isDeleted: {
              description:
                'Esta es una bandera de borrado logico en la base de datos, si esta levantada, devolverá error',
              type: 'object',
              example: 'null',
            },
            createdAt: {
              description:
                'Este campo muestra la fecha y hora en UTC en la que se hizo el registro',
              type: 'string',
              example: '2023-02-02T04:23:49.000Z',
            },
            updatedAt: {
              description:
                'Este campo muestra la fecha y hora en UTC en la que se hizo el cambio al registro',
              type: 'string',
              example: '2023-02-02T04:23:49.000Z',
            },
          },
        },
      },
    },
  })
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
  @ApiOperation({
    summary: 'Formulario de registro de productos',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sku: {
          description: 'Clave del producto',
          type: 'string',
          example: 'XAXXX00000012345',
        },
        productName: {
          description: 'Nombre del producto',
          type: 'string',
          example: 'Launcher en python',
        },
        price: {
          description: 'Precio del producto',
          type: 'string',
          example: '15000',
        },
        registryDate: {
          description: 'Fecha de registro oficial del producto',
          type: 'string',
          example: '2020-12-10',
        },
        productType: {
          description: 'Tipo de producto',
          type: 'string',
          example: 'Software',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        id: {
          description: 'ID del producto en la base de datos',
          type: 'number',
          example: '10',
        },
        sku: {
          description: 'Clave del producto en la base de datos',
          type: 'string',
          example: 'XAXXX00000012345',
        },
        productName: {
          description: 'Nombre del producto en la base de datos',
          type: 'string',
          example: 'Launcher en python',
        },
        price: {
          description: 'Precio del producto en la base de datos',
          type: 'string',
          example: '15000',
        },
        registryDate: {
          description: 'Fecha de registro oficial del producto',
          type: 'string',
          example: '2020-12-10',
        },

        productType: {
          description: 'Tipo de producto en la base de datos',
          type: 'string',
          example: 'Software',
        },
        productStatus: {
          description: 'Estado actual del producto en la base de datos',
          type: 'string',
          example: 'Active',
        },
        userId: {
          description:
            'ID del usuario que registró el producto en la base de datos',
          type: 'number',
          example: '2',
        },
        createdAt: {
          description:
            'Este campo muestra la fecha y hora en UTC en la que se hizo el registro',
          type: 'string',
          example: '2023-02-02T04:23:49.000Z',
        },
        updatedAt: {
          description:
            'Este campo muestra la fecha y hora en UTC en la que se hizo el cambio al registro',
          type: 'string',
          example: '2023-02-02T04:23:49.000Z',
        },
      },
    },
  })
  @ApiBearerAuth('access-token')
  async create(
    @Body() product: ProductsDto,
    @Request() req,
  ): Promise<ProductsEntity> {
    // create a new product and return the newly created product
    return await this.productsService.create(product, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: '10',
    description: 'ID del producto en cuestión',
  })
  @ApiOperation({
    summary: 'Formulario de modificación de productos',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sku: {
          description: 'Clave del producto',
          type: 'string',
          example: 'XAXXX00000012345',
        },
        productName: {
          description: 'Nombre del producto',
          type: 'string',
          example: 'Launcher en python',
        },
        price: {
          description: 'Precio del producto',
          type: 'string',
          example: '15000',
        },
        registryDate: {
          description: 'Fecha de registro oficial del producto',
          type: 'string',
          example: '2020-12-10',
        },
        productType: {
          description: 'Tipo de producto',
          type: 'string',
          example: 'Software',
        },
      },
    },
  })
  @ApiResponse({
      status: 200,
      schema: {
          type: 'object',
          properties: {
              id: {
                  description: 'ID del producto en la base de datos',
                  type: 'number',
                  example: '10',
              },
              sku: {
                  description: 'Clave del producto en la base de datos',
                  type: 'string',
                  example: 'XAXXX00000012345',
              },
              productName: {
                  description: 'Nombre del producto en la base de datos',
                  type: 'string',
                  example: 'Launcher en python',
              },
              price: {
                  description: 'Precio del producto en la base de datos',
                  type: 'string',
                  example: '15000',
              },
              registryDate: {
                  description: 'Fecha de registro oficial del producto',
                  type: 'string',
                  example: '2020-12-10',
              },
              userId: {
                  description:
                      'ID del usuario que registró el producto en la base de datos',
                  type: 'number',
                  example: '2',
              },
              productStatus: {
                  description: 'Estado actual del producto en la base de datos',
                  type: 'string',
                  example: 'Cancelled',
              },
              productType: {
                  description: 'Tipo de producto en la base de datos',
                  type: 'string',
                  example: 'Software',
              },
              isDeleted: {
                  description:
                      'Esta es una bandera de borrado logico en la base de datos, si esta levantada, devolverá error',
                  type: 'object',
                  example: 'null',
              },
              createdAt: {
                  description:
                      'Este campo muestra la fecha y hora en UTC en la que se hizo el registro',
                  type: 'string',
                  example: '2023-02-02T04:23:49.000Z',
              },
              updatedAt: {
                  description:
                      'Este campo muestra la fecha y hora en UTC en la que se hizo el cambio al registro',
                  type: 'string',
                  example: '2023-02-02T04:23:49.000Z',
              },
              user: {
                  type: 'object',
                  properties: {
                      id: {
                          description: 'ID del usuario en la base de datos',
                          type: 'number',
                          example: '2',
                      },
                      name: {
                          description: 'Nombre del usuario en la base de datos',
                          type: 'string',
                          example: 'Juan Maximo',
                      },
                      lastName: {
                          description: 'Apellido paterno del usuario en la base de datos',
                          type: 'string',
                          example: 'Dominguez',
                      },
                      secondLastName: {
                          description: 'Apellido paterno del usuario en la base de datos',
                          type: 'string',
                          example: 'Santana',
                      },
                      birthdate: {
                          description:
                              'Fecha de nacimiento del usuario en la base de datos',
                          type: 'string',
                          example: '1996-08-10',
                      },
                      phone: {
                          description: 'Teléfono del usuario en la base de datos',
                          type: 'string',
                          example: '5544332211',
                      },
                      userStatus: {
                          description:
                              'Estado actual del usuario en la base de datos (Devolverá error si el usuario esta inactivo)',
                          type: 'string',
                          example: 'Active',
                      },
                      isDeleted: {
                          description:
                              'Esta es una bandera de borrado logico en la base de datos, si esta levantada, devolverá error',
                          type: 'object',
                          example: 'null',
                      },
                      createdAt: {
                          description:
                              'Este campo muestra la fecha y hora en UTC en la que se hizo el registro',
                          type: 'string',
                          example: '2023-02-02T04:23:49.000Z',
                      },
                      updatedAt: {
                          description:
                              'Este campo muestra la fecha y hora en UTC en la que se hizo el cambio al registro',
                          type: 'string',
                          example: '2023-02-02T04:23:49.000Z',
                      },
                  },
              },
          },
      },
  })
  @ApiBearerAuth('access-token')
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
  @ApiParam({
    name: 'id',
    type: 'number',
    example: '10',
    description: 'ID del producto en cuestión',
  })
  @ApiOperation({
    summary: 'Borrado de producto',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('access-token')
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
