import { Module } from '@nestjs/common';
import { TravelsModule } from './travels/travels.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { AppDataSource } from './data.source';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';




@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Specifica il driver Apollo
      autoSchemaFile: true,
    }),
    ScheduleModule.forRoot(),
    // Usa la configurazione dal DataSource
    TypeOrmModule.forRoot(AppDataSource.options),
    TravelsModule,
    BookingsModule,
    PaymentsModule,
  ],
})
export class AppModule {}