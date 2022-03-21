import '@src/styles/globals.css';
import '@src/firebase';
import type { AppProps } from 'next/app';
import UserContextProvider from '@src/context/user';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
