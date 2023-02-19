import { Module } from '@nestjs/common';
import { GoalDtoConverter } from './services/goal-dto.converter';
import { ResourceModule } from '../../resources/resource.module';

@Module({
  imports: [ResourceModule],
  providers: [GoalDtoConverter],
  exports: [GoalDtoConverter],
})
export class GoalModule {}
