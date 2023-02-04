import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/users.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({
    summary: 'Inicia sesión con el numero de teléfono y contraseña',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          description: 'Número de teléfono del usuario en cuestión',
          type: 'string',
          example: '5544332211',
        },
        password: {
          description: 'Contraseña del usuario en cuestión',
          type: 'string',
          example: '12345678',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
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
        token: {
          type: 'string',
          description:
            'Este token se va a utilizar para autenticar el usuario, se puede modificar la vigencia desde el .env',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikp1YW4gTWF4aW1vIiwibGFzdE5hbWUiOiJEb21pbmd1ZXoiLCJzZWNvbmRMYXN0TmFtZSI6IlNhbnRhbmEiLCJiaXJ0aGRhdGUiOiIxOTk2LTA4LTEwIiwicGhvbmUiOiI1NTQ0MzMyMjExIiwidXNlclN0YXR1cyI6IkFjdGl2ZSIsImlzRGVsZXRlZCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wMlQwNDoyMzo0OS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wMi0wMlQwNDoyMzo0OS4wMDBaIiwiaWF0IjoxNjc1NDkwMzg0LCJleHAiOjE2NzU2NjMxODR9.yOZmEORDue7YgvYGGbd1FKD1x2NybKAmg7xnF_zNXkk',
        },
      },
    },
  })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  @ApiOperation({
    summary: 'Formulario de registro de usuarios',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
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
          description: 'Fecha de nacimiento del usuario en la base de datos',
          type: 'string',
          example: '1996-08-10',
        },
        phone: {
          description: 'Teléfono del usuario en la base de datos',
          type: 'string',
          example: '5544332211',
        },
        password: {
          description: 'Contraseña del usuario en cuestión',
          type: 'string',
          example: '12345678',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
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
        token: {
          type: 'string',
          description:
            'Este token se va a utilizar para autenticar el usuario, se puede modificar la vigencia desde el .env',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikp1YW4gTWF4aW1vIiwibGFzdE5hbWUiOiJEb21pbmd1ZXoiLCJzZWNvbmRMYXN0TmFtZSI6IlNhbnRhbmEiLCJiaXJ0aGRhdGUiOiIxOTk2LTA4LTEwIiwicGhvbmUiOiI1NTQ0MzMyMjExIiwidXNlclN0YXR1cyI6IkFjdGl2ZSIsImlzRGVsZXRlZCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wMlQwNDoyMzo0OS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wMi0wMlQwNDoyMzo0OS4wMDBaIiwiaWF0IjoxNjc1NDkwMzg0LCJleHAiOjE2NzU2NjMxODR9.yOZmEORDue7YgvYGGbd1FKD1x2NybKAmg7xnF_zNXkk',
        },
      },
    },
  })
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
