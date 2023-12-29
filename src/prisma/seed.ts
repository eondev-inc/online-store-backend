import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from './generated/category/dto/create-category.dto';

const prisma = new PrismaClient();

async function main() {
    const categories: CreateCategoryDto[] = [
        { name: 'Electronics', description: 'Gadgets, devices, and more.' },
        { name: 'Books', description: 'Wide range of books.' },
        { name: 'Clothing', description: 'Apparel for everyone.' },
        { name: 'Computers', description: 'A lot of computers.' },
        { name: 'Phones', description: 'Whatever, whatever' },
        // Agrega más categorías según sea necesario
    ];

    for (const category of categories) {
        await prisma.category.create({
            data: category,
        });
    }

    console.log('Categories seeded.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
