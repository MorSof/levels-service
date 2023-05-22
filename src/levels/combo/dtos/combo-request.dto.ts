import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BarsRequestDto } from '../../../bars/dtos/bars-request.dto';

export class ComboRequestDto {
  @ApiModelProperty({
    type: BarsRequestDto,
    isArray: true,
  })
  bars: BarsRequestDto[];
}
