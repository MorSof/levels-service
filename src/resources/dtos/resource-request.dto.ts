import { ResourceType } from '../models/resourceTypes.enum';
import { CurrencyNamesEnum } from '../models/currencyNamesEnum';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceRequestDto {
  @IsEnum(ResourceType)
  @ApiProperty({
    enum: Object.values(ResourceType),
    description: 'The type of the resource',
  })
  readonly type: ResourceType;

  @IsEnum(CurrencyNamesEnum)
  @ApiProperty({
    enum: [...Object.values(CurrencyNamesEnum)],
    description: 'The name of the resource',
  })
  readonly name: CurrencyNamesEnum;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
  })
  readonly amount: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
  })
  readonly receivingProbability: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
  })
  readonly rarenessProbability: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    required: false,
    nullable: true,
  })
  readonly extraArgs: Record<string, any>;
}
