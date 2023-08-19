import { Injectable } from '@nestjs/common';
import { ResourcesDtoConverter } from './resources-dto.converter';
import { Bar } from '../../../models/bar.model';
import { BarsRequestDto, BarsResponseDto } from '@morsof/bars-service-api';

@Injectable()
export class BarsDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public toModel(barResponseDto: BarsResponseDto): Bar {
    const { id, name, barIndex, maxValue, rewards, milestones } =
      barResponseDto;
    return new Bar({
      id,
      name,
      barIndex,
      maxValue,
      rewards: rewards?.map((reward) =>
        this.resourcesDtoConverter.toModel(reward),
      ),
      milestones: milestones?.map((milestone) => this.toModel(milestone)),
    });
  }

  public toDto(bar: Bar): BarsRequestDto {
    const { name, barIndex, maxValue, rewards, milestones } = bar;
    const barsRequestDto = new BarsRequestDto();
    barsRequestDto.name = name;
    barsRequestDto.barIndex = barIndex;
    barsRequestDto.maxValue = maxValue;
    barsRequestDto.rewards = rewards?.map((reward) =>
      this.resourcesDtoConverter.toDto(reward),
    );
    barsRequestDto.milestones = milestones?.map((milestone) =>
      this.toDto(milestone),
    );
    return barsRequestDto;
  }
}
