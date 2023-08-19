import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LevelsService } from '../services/levels.service';
import { Level } from '../models/level.model';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LevelsDtoConverter } from '../services/levels-dto.converter';
import { LevelRequestDto, LevelResponseDto } from '../../api/build';

@ApiTags('levels')
@Controller('levels')
export class LevelsController {
  constructor(
    private readonly levelsService: LevelsService,
    private readonly levelsDtoConverterService: LevelsDtoConverter,
  ) {}

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.findOneById(id);
    return this.levelsDtoConverterService.toDto(level);
  }

  @Get('order/:order')
  async getByLevelOrder(
    @Param('order', ParseIntPipe) order: number,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.findOneByLevelOrder(order);
    return this.levelsDtoConverterService.toDto(level);
  }

  @Get()
  async findAll(): Promise<LevelResponseDto[]> {
    const levels: Level[] = await this.levelsService.findAll();
    return levels.map((level) => this.levelsDtoConverterService.toDto(level));
  }

  @Post()
  async create(
    @Body() levelRequestDto: LevelRequestDto,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.create(
      this.levelsDtoConverterService.toModel(levelRequestDto),
    );
    return this.levelsDtoConverterService.toDto(level);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.levelsService.remove(id);
  }
}
