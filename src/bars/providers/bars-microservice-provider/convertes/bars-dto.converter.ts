import { Injectable } from '@nestjs/common';
import { ResourcesDtoConverter } from './resources-dto.converter';
import { Bar } from '../../../models/bar.model';
import { BarResponseDto } from '../dtos/bar-response.dto';
import { CreateBarRequestDto } from '../dtos/create-bar-request.dto';

@Injectable()
export class BarsDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public toModel(barResponseDto: BarResponseDto): Bar {
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

  public toDto(bar: Bar): CreateBarRequestDto {
    const { name, barIndex, maxValue, rewards, milestones } = bar;
    return new CreateBarRequestDto({
      name,
      barIndex,
      maxValue,
      rewards: rewards?.map((reward) =>
        this.resourcesDtoConverter.toDto(reward),
      ),
      milestones: milestones?.map((milestone) => this.toDto(milestone)),
    });
  }
}
