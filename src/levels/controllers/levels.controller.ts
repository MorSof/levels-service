import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { LevelsService } from '../services/levels.service';
import { Level } from '../models/level.model';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.findOne(id);
    return this.levelsDtoConverterService.convertTo(level);
  }

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<LevelResponseDto[]> {
    const levels: Level[] = await this.levelsService.findAll();
    return levels.map((level) =>
      this.levelsDtoConverterService.convertTo(level),
    );
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
      this.levelsDtoConverterService.convertFrom(levelRequestDto),
    );
    return this.levelsDtoConverterService.convertTo(level);
  }

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
  })
  @Put()
  async update(
    @Param('id') id: number,
    @Body() levelRequestDto: LevelRequestDto,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.update(
      id,
      this.levelsDtoConverterService.convertFrom(levelRequestDto),
    );
    return this.levelsDtoConverterService.convertTo(level);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.levelsService.remove(id);
  }
}
