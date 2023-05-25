import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseBarsRequestDto } from '../../../bars/dtos/base-bars-request.dto';

export class ComboRequestDto {
  @ApiModelProperty({
    type: BaseBarsRequestDto,
    isArray: true,
  })
  bars: BaseBarsRequestDto[];
}
