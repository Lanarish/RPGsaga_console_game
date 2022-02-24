import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Category } from '../entity/category.entity';
import { Product } from '../entity/product.entity';
import { mockProductsRepository } from '../__mocks__/mockProductRepository.mock';

import { ProductDto } from './dto/productDto.dto';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, { provide: getRepositoryToken(Product), useValue: mockProductsRepository }],
    }).compile();
    controller = module.get<ProductsController>(ProductsController);
  });

  describe('create', () => {
    let productDto: ProductDto;
    beforeEach(async () => {
      productDto = {
        name: 'Jacket',
        description: 'TestDescription',
        color: 'Black',
        size: 'S',
        price: 10000,
        category: new Category(),
      };
    });
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('should create a product', async () => {
      expect(await controller.create(productDto)).toEqual({
        productId: 2,
        ...productDto,
      });
    });
  });
  describe('update', () => {
    let productDto: ProductDto;
    beforeEach(async () => {
      productDto = {
        name: 'Jacket',
        description: 'TestDescription',
        color: 'Black',
        size: 'S',
        price: 10000,
        category: new Category(),
      };
    });
    it('should update a product', async () => {
      expect(await controller.update(productDto, 2)).toEqual({
        productId: 2,
        ...productDto,
      });
    });
  });
  describe('get', () => {
    let product: Product;
    let products: Product[];
    beforeEach(async () => {
      product = {
        productId: 2,
        name: 'Jacket',
        description: 'TestDescription',
        color: 'Black',
        size: 'S',
        price: 10000,
        category: new Category(),
      };
      products = [
        {
          productId: 2,
          name: 'Jacket',
          description: 'TestDescription',
          color: 'Black',
          size: 'S',
          price: 10000,
          category: new Category(),
        },
      ];
    });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return a product', async () => {
      expect(await controller.getOne(2)).toEqual(product);
    });

    it('should return all products', async () => {
      expect(await controller.getAll()).toEqual(products);
    });

    it('should throw the exception that product not found', async () => {
      expect(async () => await controller.getOne(3)).rejects.toThrow('Element does not exist');
    });
  });
  describe('delete', () => {
    it('should return not found exception after we delete our product', async () => {
      await controller.remove(2);
      expect(async () => await controller.getOne(2)).rejects.toThrow('FAILED_DELETE');
    });
  });
});
