import Head from 'next/head'
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  
  return (
    <div>
      <Head>
        <title>Charles's Netflix</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/images/c.png"></link>
      </Head>
      <div className="h-screen w-screen bg-black">
        <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
          <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
          <p className="text-white text-1xl md:text-3xl font-bold">
            <span className="font-light">Watching:</span> {data?.title}
          </p>
        </nav>
        <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
      </div>
    </div>
  )
}

export default Watch;
