import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelRequestDto } from '../dtos/level-request.dto';
import { LevelResponseDto } from '../dtos/level-response.dto';
import { ComboDtoConverter } from '../combo/services/combo-dto.converter';
import { PlayableDtoConverter } from '../playable/services/playable-dto-converter.service';
import { BarsDtoConverter } from '../../bars/convertes/bars-dto.converter';

@Injectable()
export class LevelsDtoConverter {
  constructor(
    private readonly comboDtoConverter: ComboDtoConverter,
    private readonly barDtoConverter: BarsDtoConverter,
    private readonly playableDtoConverter: PlayableDtoConverter,
  ) {}

  public toModel(levelDto: LevelRequestDto): Level {
    const { order, playables, lives, combo, goals } = levelDto;
    return new Level({
      order,
      playables: playables.map((playable) =>
        this.playableDtoConverter.convertFrom(playable),
      ),
      lives,
      combo: this.comboDtoConverter.toModel(combo),
      goals: goals.map((goal) => this.barDtoConverter.toModel(goal)),
    });
  }

  public toDto(level: Level): LevelResponseDto {
    const { id, order, playables, lives, combo, stats, goals } = level;
    return new LevelResponseDto({
      id,
      order,
      playables: playables.map((playable) =>
        this.playableDtoConverter.convertTo(playable),
      ),
      lives,
      stats,
      combo: this.comboDtoConverter.toDto(combo),
      goals: goals.map((goal) => this.barDtoConverter.toDto(goal)),
    });
  }
}
