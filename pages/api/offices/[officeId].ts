import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { officeId } = req.query;

    if (typeof officeId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!officeId) {
      throw new Error('Missing Id');
    }

    const offices = await prismadb.office.findUnique({
      where: {
        id: officeId
      }
    });

    return res.status(200).json(offices);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
