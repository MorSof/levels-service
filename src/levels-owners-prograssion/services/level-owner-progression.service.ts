import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LevelOwnerProgressionEntity } from '../entities/level-owner-progression.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelOwnerProgressionEntityConverter } from './level-owner-progression-entity.converter';
import { LevelOwnerProgression } from '../models/level-owner-progression.model';

@Injectable()
export class LevelOwnerProgressionService {
  constructor(
    @InjectRepository(LevelOwnerProgressionEntity)
    private readonly repository: Repository<LevelOwnerProgressionEntity>,
    private readonly levelOwnerProgressionEntityConverter: LevelOwnerProgressionEntityConverter,
  ) {}

  async create(
    progression: LevelOwnerProgression,
  ): Promise<LevelOwnerProgression> {
    const existingProgression = await this.repository.findOne({
      where: {
        ownerType: progression.ownerType,
        ownerId: progression.ownerId,
        levelOrder: progression.levelOrder,
      },
    });

    if (existingProgression) {
      throw new BadRequestException(
        'The combination of ownerId, ownerType, and levelOrder already exists.',
      );
    }

    const entity =
      this.levelOwnerProgressionEntityConverter.toEntity(progression);

    const savedEntity = await this.repository.save(entity);
    return this.levelOwnerProgressionEntityConverter.toModel(savedEntity);
  }

  async findById(id: number): Promise<LevelOwnerProgression | undefined> {
    const entity = await this.repository.findOne({ where: { id } });
    if (entity) {
      return this.levelOwnerProgressionEntityConverter.toModel(entity);
    }
    return undefined;
  }

  async findAll(
    ownerId?: string,
    ownerType?: string,
  ): Promise<LevelOwnerProgression[]> {
    const where: any = {};
    if (ownerId) {
      where.ownerId = ownerId;
    }
    if (ownerType) {
      where.ownerType = ownerType;
    }

    const entities = await this.repository.find({ where });
    return entities.map(this.levelOwnerProgressionEntityConverter.toModel);
  }

  async update(
    id: number,
    updatedProgression: LevelOwnerProgression,
  ): Promise<LevelOwnerProgression | undefined> {
    const entity =
      this.levelOwnerProgressionEntityConverter.toEntity(updatedProgression);
    await this.repository.update(id, entity);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
