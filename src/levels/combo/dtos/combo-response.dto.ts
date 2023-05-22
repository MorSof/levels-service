import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BarsResponseDto } from '../../../bars/dtos/bars-response.dto';

export class ComboResponseDto {
  @ApiModelProperty({
    type: BarsResponseDto,
    description: 'The bars of the combo',
    isArray: true,
    required: true,
  })
  bars: BarsResponseDto[];

  constructor(partial: Partial<ComboResponseDto>) {
    Object.assign(this, partial);
  }
}
