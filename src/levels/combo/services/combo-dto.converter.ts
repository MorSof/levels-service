import { Injectable } from '@nestjs/common';
import { ComboRequestDto } from '../dtos/combo-request.dto';
import { Combo } from '../models/combo.model';
import { ComboResponseDto } from '../dtos/combo-response.dto';
import { BarsDtoConverter } from '../../../bars/convertes/bars-dto.converter';

@Injectable()
export class ComboDtoConverter {
  constructor(private readonly barDtoConverter: BarsDtoConverter) {}

  public toModel(comboRequestDto: ComboRequestDto): Combo {
    const { bars } = comboRequestDto;
    return new Combo({
      bars: bars.map((bar) => this.barDtoConverter.toModel(bar)),
    });
  }

  public toDto(combo: Combo): ComboResponseDto {
    const { bars } = combo;
    return new ComboResponseDto({
      bars: bars.map((bar) => this.barDtoConverter.toDto(bar)),
    });
  }
}
