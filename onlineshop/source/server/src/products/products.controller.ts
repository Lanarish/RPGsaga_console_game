import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Product } from '../entity/product.entity';

import { ProductDto } from './dto/productDto.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  private logger: Logger;
  constructor(private productService: ProductsService) {
    this.logger = new Logger(ProductsController.name);
  }

  @Get()
  getAll(): Promise<Product[]> {
    try {
      return this.productService.findAll();
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      return this.productService.findOne(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() productDto: ProductDto): Promise<Product> {
    try {
      return this.productService.create(productDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    try {
      return this.productService.remove(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() productDto: ProductDto, @Param('id') id: string): Promise<Product> {
    try {
      return this.productService.update(productDto, Number(id));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
