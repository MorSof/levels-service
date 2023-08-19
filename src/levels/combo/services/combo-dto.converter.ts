import { Injectable } from '@nestjs/common';
import { Combo } from '../models/combo.model';
import { BarsDtoConverter } from '../../../bars/convertes/bars-dto.converter';
import { ComboRequestDto, ComboResponseDto } from '../../../api/build';

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
    const comboResponseDto = new ComboResponseDto();
    comboResponseDto.bars = combo.bars.map((bar) =>
      this.barDtoConverter.toDto(bar),
    );
    return comboResponseDto;
  }
}
