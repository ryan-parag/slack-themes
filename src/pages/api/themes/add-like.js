import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req,res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const theme = JSON.parse(req.body);
    const updateTheme = await prisma.theme.update({
      where: {
        id: theme
      },
      data: {
        likes: {
          increment: 1,
        }
      },
    })
    res.status(200).json(updateTheme);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}