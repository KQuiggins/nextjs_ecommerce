import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
    const prisma = new PrismaClient();
    await prisma.comic.deleteMany();

    await prisma.comic.createMany({ data: sampleData.comics });

    console.log('Seeding completed');
}

main();