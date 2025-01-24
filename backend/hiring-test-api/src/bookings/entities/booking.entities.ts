// src/bookings/entities/booking.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Travel } from '../../travels/entities/travel.entities';

@ObjectType()
@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  email: string;

  @Column('int')
  @Field()
  seats: number;

  @Column({ default: false })
  @Field()
  isConfirmed: boolean;

  @Column('timestamp', { nullable: true })
  @Field(() => Date, { nullable: true })
  expiresAt: Date | null;

  /*
  @Field(() => Travel)
  @ManyToOne(() => Travel, (travel) => travel.bookings)
  travel: Travel;*/

  @ManyToOne(() => Travel, (travel) => travel.bookings, { eager: true })
  @JoinColumn({ name: 'travelId' })
  @Field(() => Travel)
  travel: Travel;
}
