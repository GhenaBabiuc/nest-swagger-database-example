import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { Repository } from 'typeorm';
import { CatResponseDto } from './dto/cat.response.dto';
import { plainToInstance } from 'class-transformer';
import { CatCreateDto } from './dto/cat.create.dto';

@Injectable()
export class CatsService {
  @InjectRepository(CatEntity)
  private catsRepository: Repository<CatEntity>;

  async getAll(): Promise<CatResponseDto[]> {
    const cats = await this.catsRepository.find();
    return plainToInstance(CatResponseDto, cats);
  }

  async getOne(id: number): Promise<CatResponseDto> {
    try {
      const cats = await this.catsRepository.findOneOrFail({
        where: {
          id,
        },
      });
      return plainToInstance(CatResponseDto, cats);
    } catch (e) {
      throw new NotFoundException('Cat not found');
    }

  }

  async create(payload: CatCreateDto): Promise<CatResponseDto> {
    try {
      const createdCat = await this.catsRepository.save({
        name: payload.name,
      });

      return plainToInstance(CatResponseDto, createdCat);
    } catch (e) {
      console.log('exception');
      throw new BadRequestException('Wrong cat');
    }
  }

  async delete(id: number) {

    const existingCat = await this.getOne(id);

    this.catsRepository.delete(id);
  }

  async update(id: number, payload: CatCreateDto): Promise<CatResponseDto> {
    const existingCat = await this.getOne(id);

    const updatedCat = await this.catsRepository.save({
      id: id,
      name: payload.name,
    });

    return plainToInstance(CatResponseDto, updatedCat);
  }
}