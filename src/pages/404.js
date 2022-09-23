import React from 'react'
import Layout from '@components/Layout';
import Logo from '@components/Logo';
import Link from 'next/link';

export default function About() {

  return (
    <Layout title={'Page Not Found'}>
      <div className="mx-auto max-w-screen-md prose p-4 xl:p-8 flex flex-col items-center text-center mt-16">
        <div className="relative inline-block transform transition hover:scale-110 hover:-rotate-12">
          <Logo/>
        </div>
        <h2>Hmm... this page doesn't exist</h2>
        <p>Try a different starting point by heading back to the main page</p>
        <Link href="/">
          <a className="rounded-lg px-4 py-2 border border-black border-opacity-10 dark:border-white dark:border-opacity-10 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow">Back to main page</a>
        </Link>
      </div>
    </Layout>
  );
}