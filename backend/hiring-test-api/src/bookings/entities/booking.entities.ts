// src/bookings/entities/booking.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @Field((type) => Date, { nullable: true }) // Explicitly define the type here
  expiresAt: Date | null;

  @ManyToOne(() => Travel, (travel) => travel.id, { eager: true })
  @Field()
  travel: Travel;
  booking: Booking;
}
