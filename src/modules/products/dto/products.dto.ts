import { IsNotEmpty, MinLength } from 'class-validator';

export class ProductsDto {
  @IsNotEmpty()
  readonly sku: string;

  @IsNotEmpty()
  readonly productName: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly registryDate: string;

  @IsNotEmpty()
  readonly productType: string;
}
