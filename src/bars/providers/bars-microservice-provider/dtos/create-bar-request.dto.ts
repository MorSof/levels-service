import { CreateResourceRequestDto } from './create-resource-request.dto';

export class CreateBarRequestDto {
  maxValue: number;
  name?: string;
  barIndex?: number;
  milestones?: CreateBarRequestDto[];
  rewards?: CreateResourceRequestDto[];

  constructor(partial: Partial<CreateBarRequestDto>) {
    Object.assign(this, partial);
  }
}
