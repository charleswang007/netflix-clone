import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { json } from "stream/consumers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        }
      }
    });

    const favoritedFoods = await prismadb.food.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        }
      }
    });

    const favoritedOffices = await prismadb.office.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        }
      }
    });

    console.log("### My Favorites ###")
    console.log("favoritedMovies: ", favoritedMovies)
    console.log("favoritedOffices: ", favoritedOffices)
    console.log("favoritedFoods: ", favoritedFoods)
    
    var jsons = new Array();
    if (favoritedMovies.length > 0) {jsons.push(favoritedMovies[0]);}
    if (favoritedOffices.length > 0) {jsons.push(favoritedOffices[0]);}
    if (favoritedFoods.length > 0) {jsons.push(favoritedFoods[0]);}

    return res.status(200).json(favoritedFoods);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
