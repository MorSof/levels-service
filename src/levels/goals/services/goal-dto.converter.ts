import { Injectable } from '@nestjs/common';
import { GoalRequestDto } from '../dtos/goal-request.dto';
import { Goal } from '../models/goal.model';
import { GoalResponseDto } from '../dtos/goal-response.dto';
import { ResourcesDtoConverter } from '../../../resources/convertes/resources-dto.converter';

@Injectable()
export class GoalDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public convertFrom(goalRequestDto: GoalRequestDto): Goal {
    const { score, resources } = goalRequestDto;
    return new Goal({
      score,
      resources: resources.map((resource) =>
        this.resourcesDtoConverter.convertFrom(resource),
      ),
    });
  }

  public convertTo(goal: Goal): GoalResponseDto {
    const { score, resources } = goal;
    return new GoalResponseDto({ score, resources });
  }
}
