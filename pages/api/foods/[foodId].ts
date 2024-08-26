import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { foodId } = req.query;

    if (typeof foodId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!foodId) {
      throw new Error('Missing Id');
    }

    const foods = await prismadb.food.findUnique({
      where: {
        id: foodId
      }
    });

    return res.status(200).json(foods);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
