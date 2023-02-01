import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AfterCreate,
  AfterUpdate,
  AfterDestroy,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Products extends Model<Products> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sku: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productName: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  registryDate: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ENUM,
    values: ['Active', 'Cancelled'],
  })
  productStatus: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productType: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isDeleted: boolean;
}
