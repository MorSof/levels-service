import { ResourceResponseDto } from './resource-response.dto';

export class BarResponseDto {
  id: number;
  maxValue: number;
  name?: string;
  barIndex?: number;
  milestones?: BarResponseDto[];
  rewards?: ResourceResponseDto[];

  constructor(partial: Partial<BarResponseDto>) {
    Object.assign(this, partial);
  }
}
