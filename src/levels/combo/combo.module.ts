import { Module } from '@nestjs/common';
import { ComboDtoConverter } from './services/combo-dto.converter';
import { BarModule } from '../bar/bar.module';

@Module({
  imports: [BarModule],
  providers: [ComboDtoConverter],
  exports: [ComboDtoConverter],
})
export class ComboModule {}
