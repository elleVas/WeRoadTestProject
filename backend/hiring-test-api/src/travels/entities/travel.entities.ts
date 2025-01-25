import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int, GraphQLISODateTime, ResolveField, Parent } from '@nestjs/graphql';
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


 @Column('timestamp', { nullable: true })
  @Field(() => Date, { nullable: true })
  startingDate: Date | null

  @Column('timestamp', { nullable: true })
  @Field(() => Date, { nullable: true })
  endingDate: Date | null;



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
