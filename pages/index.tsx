import Head from 'next/head'
import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useOfficeList from '@/hooks/useOfficeList';
import useMovieList from '@/hooks/useMovieList';
import useFoodList from '@/hooks/useFoodList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: offices = [] } = useOfficeList();
  const { data: foods = [] } = useFoodList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
      <Head>
        <title>Charles&apos;s Netflix</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/images/c.png"></link>
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Singapore Highlights" data={movies} />
        <MovieList title="Singapore Office" data={offices} />
        <MovieList title="Singapore Food" data={foods} />
        <MovieList title="Favorite Food" data={favorites} />
      </div>
    </>
  )
}

export default Home;
