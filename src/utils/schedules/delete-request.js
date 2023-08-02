import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function deleteRequest(req, res) {
    const usersToDelete = await prisma.accountDeleteRequest.findMany({
        where: {
            createdAt: {
                lte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
            }
        }
    }
    );
    for (const user of usersToDelete) {
        await prisma.accountDeleteRequest.delete({
            where: {
                id: user.id
            }
        });
    }
}