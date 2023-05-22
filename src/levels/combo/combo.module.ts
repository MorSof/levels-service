import { Module } from '@nestjs/common';
import { ComboDtoConverter } from './services/combo-dto.converter';
import { BarsModule } from '../../bars/bars.module';

@Module({
  imports: [BarsModule],
  providers: [ComboDtoConverter],
  exports: [ComboDtoConverter],
})
export class ComboModule {}
