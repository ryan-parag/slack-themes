import React from 'react';
import '../styles/tailwind.css';
import '../styles/tailwind.css'
import '../styles/index.css'
import '../styles/tailwind-utils.css'
import {AuthProvider} from '../components/Auth'

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}