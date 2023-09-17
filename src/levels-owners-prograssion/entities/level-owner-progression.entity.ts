import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { LevelEntity } from '../../levels/entities/level.entity';

@Entity({ name: 'level_owner_progression' })
export class LevelOwnerProgressionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  ownerType: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => LevelEntity, (level) => level.levelOwnerProgressionEntity, {
    eager: true,
  })
  levelEntity: LevelEntity;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  constructor(partial: Partial<LevelOwnerProgressionEntity>) {
    Object.assign(this, partial);
  }
}
