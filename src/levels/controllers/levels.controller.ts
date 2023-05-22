import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { LevelsService } from '../services/levels.service';
import { Level } from '../models/level.model';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LevelRequestDto } from '../dtos/level-request.dto';
import { LevelResponseDto } from '../dtos/level-response.dto';
import { LevelsDtoConverter } from '../services/levels-dto.converter';

@ApiTags('levels')
@Controller('levels')
export class LevelsController {
  constructor(
    private readonly levelsService: LevelsService,
    private readonly levelsDtoConverterService: LevelsDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Level not found' })
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.findOneById(id);
    return this.levelsDtoConverterService.toDto(level);
  }

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Level not found' })
  @Get('order/:order')
  async getByLevelOrder(
    @Param('order', ParseIntPipe) order: number,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.findOneByLevelOrder(order);
    return this.levelsDtoConverterService.toDto(level);
  }

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<LevelResponseDto[]> {
    const levels: Level[] = await this.levelsService.findAll();
    return levels.map((level) => this.levelsDtoConverterService.toDto(level));
  }

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
  })
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
