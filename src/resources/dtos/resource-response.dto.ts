import { ResourceType } from '../models/resourceTypes.enum';
import { CurrencyNamesEnum } from '../models/currencyNamesEnum';
import { IsEnum } from 'class-validator';
import { BoosterNamesEnum } from '../models/boosterNamesEnum';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceResponseDto {
  @ApiProperty()
  id?: number;

  @ApiProperty({
    enum: Object.values(ResourceType),
    description: 'The type of the resource',
    required: true,
  })
  type?: ResourceType;

  @IsEnum(CurrencyNamesEnum)
  @ApiProperty({
    enum: [
      ...Object.values(CurrencyNamesEnum),
      ...Object.values(BoosterNamesEnum),
    ],
    description: 'The name of the resource',
    required: true,
  })
  name?: CurrencyNamesEnum | BoosterNamesEnum;

  @ApiProperty({
    nullable: true,
  })
  amount?: number;

  @ApiProperty({
    nullable: true,
  })
  receivingProbability?: number;

  @ApiProperty({
    nullable: true,
  })
  rarenessProbability?: number;

  @ApiProperty({
    nullable: true,
  })
  extraArgs?: object;

  constructor(partial: Partial<ResourceResponseDto>) {
    Object.assign(this, partial);
  }
}
