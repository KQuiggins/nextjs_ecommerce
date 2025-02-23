import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
    const prisma = new PrismaClient();
    await prisma.comic.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();
    
    await prisma.comic.createMany({ data: sampleData.comics });
    await prisma.user.createMany({ data: sampleData.users });

    console.log('Seeding completed');
}

main();