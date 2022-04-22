import { Home } from '@/interfaces/home.interface'
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class HomeEntity extends BaseEntity implements Home {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  desc: string

  @Column()
  price: number

  @Column()
  post_code: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
