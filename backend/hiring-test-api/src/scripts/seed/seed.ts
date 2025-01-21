// src/scripts/seed.ts
import { DataSource } from 'typeorm';
import { Travel } from '../../travels/entities/travel.entities';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.development.env' });

const configService = new ConfigService();
const seedData = async () => {
  const AppDataSource = new DataSource({
    type: configService.get<string>('DB_TYPE') as 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [Travel],
    synchronize: true, // Sincronizza automaticamente gli schemi
  });

  await AppDataSource.initialize();

  const travelRepository = AppDataSource.getRepository(Travel);

  // Esempio di dati da importare
  const travels = [
    {
      id: 'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
      slug: 'jordan-360',
      name: 'Jordan 360°',
      description:
        'Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert...',
      startingDate: '2025-11-01',
      endingDate: '2025-11-09',
      price: 199900,
      maxCapacity: 5,
      moods: {
        nature: 80,
        relax: 20,
        history: 90,
        culture: 30,
        party: 10,
      },
    },
    {
      id: '7b5e7a1f-b7de-4f74-918d-68e77b9280fe',
      slug: 'Thailand-Border',
      name: 'Thailand-Border',
      description:
        'Thailand-Border: from Cambodia to beautiful island border...',
      startingDate: '2025-11-01',
      endingDate: '2025-11-09',
      price: 199900,
      maxCapacity: 5,
      moods: {
        nature: 80,
        relax: 20,
        history: 90,
        culture: 30,
        party: 40,
      },
    },
    {
      id: '6b1a4320-abe7-44d5-b1d5-9148d25e5ed9',
      slug: 'Vietnam-South',
      name: 'Vietnam South',
      description:
        'Vietnam South: from Ho-Chi-Min city (Saigon) to Phu Quoc island',
      startingDate: '2025-11-01',
      endingDate: '2025-11-09',
      price: 199900,
      maxCapacity: 5,
      moods: {
        nature: 80,
        relax: 60,
        history: 30,
        culture: 30,
        party: 50,
      },
    },
    {
      id: 'd85dba24-2a1d-4f7e-8194-df84c12f777b',
      slug: 'iceland-hunting-northern-lights',
      name: 'Iceland: hunting for the Northern Lights',
      description:
        'Why visit Iceland in winter? Because it is between October and March...',
      startingDate: '2025-11-01',
      endingDate: '2025-11-08',
      price: 199900,
      maxCapacity: 5,
      moods: {
        nature: 100,
        relax: 30,
        history: 10,
        culture: 20,
        party: 10,
      },
    },
    {
      id: '8b65e10e-b52f-4291-8f0a-6e5e6d145e2f',
      slug: 'united-arab-emirates',
      name: 'United Arab Emirates: from Dubai to Abu Dhabi',
      description: 'At Dubai and Abu Dhabi everything is huge and majestic...',
      startingDate: '2025-01-03',
      endingDate: '2025-01-10',
      price: 149900,
      maxCapacity: 5,
      moods: {
        nature: 30,
        relax: 40,
        history: 20,
        culture: 80,
        party: 70,
      },
    },
  ];

  try {
    console.log('Seeding travels...');
    for (const travel of travels) {
      const existingTravel = await travelRepository.findOneBy({
        id: travel.id,
      });
      if (!existingTravel) {
        const newTravel = travelRepository.create(travel);
        await travelRepository.save(newTravel);
        console.log(`Travel ${travel.name} added.`);
      } else {
        console.log(`Travel ${travel.name} already exists, skipping.`);
      }
    }
    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

seedData();
