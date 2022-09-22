import React from 'react'
import Layout from '@components/Layout';
import Logo from '@components/Logo';

export default function About() {

  return (
    <Layout title={'About'}>
      <div className="mx-auto max-w-screen-md prose p-4 xl:p-8">
        <div className="relative inline-block transform transition hover:scale-110 hover:-rotate-12">
          <Logo/>
        </div>
        <h2>Beautiful, curated themes to help personalize all of your different Slack workspaces.</h2>
        <p>Thanks for visiting 👍! Designed and Developed by Ryan Parag and Matthew Broughton</p>
      </div>
    </Layout>
  );
}