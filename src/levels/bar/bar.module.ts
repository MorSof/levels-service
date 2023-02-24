import { Module } from '@nestjs/common';
import { BarDtoConverter } from './services/bar-dto.converter';
import { ResourceModule } from '../../resources/resource.module';

@Module({
  imports: [ResourceModule],
  providers: [BarDtoConverter],
  exports: [BarDtoConverter],
})
export class BarModule {}
