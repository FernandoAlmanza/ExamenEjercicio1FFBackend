import { IsNotEmpty } from 'class-validator';

enum USER_STATUS {
  ON = 'Active',
  OFF = 'Inactive',
}

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly secondLastName: string;

  readonly birthdate: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly password: string;

  readonly userStatus: string;

  readonly isDeleted: boolean;
}
