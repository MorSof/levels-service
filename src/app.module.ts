import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelsModule } from './levels/levels.module';
import { LevelEntity } from './levels/entities/level.entity';
import { LevelOwnerProgressionEntity } from './levels-owners-prograssion/entities/level-owner-progression.entity';
import { LevelOwnerProgressionModule } from './levels-owners-prograssion/level-owner-progression.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [LevelEntity, LevelOwnerProgressionEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    LevelsModule,
    LevelOwnerProgressionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
