import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req,res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const themes = JSON.parse(req.body);
    const savedTheme = await prisma.theme.deleteMany({ });
    res.status(200).json(savedTheme);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}