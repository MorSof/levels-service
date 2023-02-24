import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'levels' })
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  playables: {
    type: string;
    name: string;
    subType?: string;
    duration: number;
    cooldown: number;
    vertices: number[];
    score: number;
  }[];

  @Column()
  lives: number;

  @Column('json')
  combo: {
    bars: {
      score: number;
    }[];
  };

  @Column({ nullable: true, type: 'json' })
  goals: {
    score: number;
  }[];

  @Column({ nullable: true, type: 'json' })
  stats: {
    playables: {
      countByName: object;
      total: number;
    };
  };

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

  constructor(partial: Partial<LevelEntity>) {
    Object.assign(this, partial);
  }
}
