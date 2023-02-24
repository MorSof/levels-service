import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { BarRequestDto } from '../dtos/bar-request.dto';
import { BarResponseDto } from '../dtos/bar-response.dto';
import { ResourcesDtoConverter } from '../../../resources/convertes/resources-dto.converter';

@Injectable()
export class BarDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public convertFrom(barRequestDto: BarRequestDto): Bar {
    const { score, resources } = barRequestDto;
    return new Bar({
      score,
      resources: resources.map((resource) =>
        this.resourcesDtoConverter.convertFrom(resource),
      ),
    });
  }

  public convertTo(bar: Bar): BarResponseDto {
    const { score, resources } = bar;
    return new BarResponseDto({ score, resources });
  }
}
