import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { ComboDtoConverter } from '../combo/services/combo-dto.converter';
import { PlayableDtoConverter } from '../playable/services/playable-dto-converter.service';
import { BarsDtoConverter } from '../../bars/convertes/bars-dto.converter';
import { LevelRequestDto, LevelResponseDto } from '../../api/build';

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
    const levelResponseDto = new LevelResponseDto();
    levelResponseDto.id = id;
    levelResponseDto.order = order;
    levelResponseDto.playables = playables.map((playable) =>
      this.playableDtoConverter.convertTo(playable),
    );
    levelResponseDto.lives = lives;
    levelResponseDto.combo = this.comboDtoConverter.toDto(combo);
    levelResponseDto.goals = goals.map((goal) =>
      this.barDtoConverter.toDto(goal),
    );
    levelResponseDto.stats = stats;
    return levelResponseDto;
  }
}
