import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { BaseBarsRequestDto } from '../dtos/base-bars-request.dto';
import { BarsResponseDto } from '../dtos/bars-response.dto';
import { ResourcesDtoConverter } from './resources-dto.converter';

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
    const { id, name, barIndex, maxValue, rewards, milestones } = bar;
    return new BarsResponseDto({
      id,
      name,
      barIndex,
      maxValue,
      rewards: rewards?.map((reward) =>
        this.resourcesDtoConverter.convertTo(reward),
      ),
      milestones: milestones?.map((milestone) => this.toDto(milestone)),
    });
  }
}
