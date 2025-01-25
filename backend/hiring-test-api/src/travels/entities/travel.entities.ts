import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Booking } from '../../bookings/entities/booking.entities';

@ObjectType()
class Moods {
  @Field((type) => Int)
  nature: number;

  @Field((type) => Int)
  relax: number;

  @Field((type) => Int)
  history: number;

  @Field((type) => Int)
  culture: number;

  @Field((type) => Int)
  party: number;
}

@ObjectType()
@Entity()
export class Travel {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  slug: string;

  @Column()
  @Field()
  name: string;

  @Column('text')
  @Field()
  description: string;

  @Column('text')
  @Field()
  description_extended: string;

  @Column({ type: 'date', nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true })
  startingDate: Date;

  @Column({ type: 'date' })
  endingDate: Date;
  //TODO FIX PROBLEM SERIALIZE GRAPHQL DATE idk why only on endingDate case study
  @Field(() => GraphQLISODateTime, { nullable: true })
  get formattedEndingDate(): Date | null {
    return this.endingDate ? new Date(this.endingDate) : null;
  }

  @Column('int')
  @Field()
  price: number;

  // Riferisci il tipo 'Moods' esplicitamente
  @Column('json', { nullable: true })
  @Field((type) => Moods, { nullable: true })
  moods?: Moods;

  @Column('int')
  @Field()
  maxCapacity: number;

  @Column()
  @Field()
  iata: string;

  @Field(() => [Booking])
  @OneToMany(() => Booking, (booking) => booking.travel)
  bookings: Booking[];
}
