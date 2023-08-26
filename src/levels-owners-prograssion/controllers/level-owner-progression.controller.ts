import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { LevelOwnerProgressionService } from '../services/level-owner-progression.service';
import { LevelOwnerProgressionDtoConverter } from '../services/level-owner-progression-dto.converter';
import { LevelOwnerProgressionRequestDto } from '../../api/build/models/LevelOwnerProgressionRequestDto';
import { LevelOwnerProgressionResponseDto } from '../../api/build/models/LevelOwnerProgressionResponseDto';

@Controller('v1/level-owner-progressions')
export class LevelOwnerProgressionController {
  constructor(
    private readonly service: LevelOwnerProgressionService,
    private readonly dtoConverter: LevelOwnerProgressionDtoConverter,
  ) {}

  @Post()
  async create(
    @Body() dto: LevelOwnerProgressionRequestDto,
  ): Promise<LevelOwnerProgressionResponseDto> {
    const entity = this.dtoConverter.toModel(dto);
    const createdEntity = await this.service.create(entity);
    return this.dtoConverter.toDto(createdEntity);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<LevelOwnerProgressionResponseDto | undefined> {
    const entity = await this.service.findById(id);
    return entity ? this.dtoConverter.toDto(entity) : undefined;
  }

  @Get()
  async findAll(
    @Query('ownerId') ownerId?: string,
    @Query('ownerType') ownerType?: string,
  ): Promise<LevelOwnerProgressionResponseDto[]> {
    const entities = await this.service.findAll(ownerId, ownerType);
    return entities.map(this.dtoConverter.toDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: LevelOwnerProgressionRequestDto,
  ): Promise<LevelOwnerProgressionResponseDto | undefined> {
    const entity = this.dtoConverter.toModel(dto);
    const updatedEntity = await this.service.update(id, entity);
    return updatedEntity ? this.dtoConverter.toDto(updatedEntity) : undefined;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.service.delete(id);
  }
}
