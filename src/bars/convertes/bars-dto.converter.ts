import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { ResourcesDtoConverter } from './resources-dto.converter';
import { BarsResponseDto, BaseBarsRequestDto } from '../../api/build';

@Injectable()
export class BarsDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public toModel(barsRequestDto: BaseBarsRequestDto): Bar {
    const { maxValue, rewards, milestones } = barsRequestDto;
    return new Bar({
      maxValue,
      rewards: rewards?.map((reward) =>
        this.resourcesDtoConverter.convertFrom(reward),
      ),
      milestones: milestones?.map((milestone) => this.toModel(milestone)),
    });
  }

  public toDto(bar: Bar): BarsResponseDto {
    const barResponseDto = new BarsResponseDto();
    barResponseDto.id = bar.id;
    barResponseDto.name = bar.name;
    barResponseDto.barIndex = bar.barIndex;
    barResponseDto.maxValue = bar.maxValue;
    barResponseDto.rewards = bar.rewards?.map((reward) =>
      this.resourcesDtoConverter.convertTo(reward),
    );
    barResponseDto.milestones = bar.milestones?.map((milestone) =>
      this.toDto(milestone),
    );
    return barResponseDto;
  }
}
