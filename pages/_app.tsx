import '../styles/globals.css'
import type { AppProps } from 'next/app'

/**
 * An application which enables a user to view a list of reporting dates for a set of companies. 
 * The user can filter the list by company name.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
