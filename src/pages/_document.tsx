import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
   return (
      <Html>
         <Head>
            <link rel="shortcut icon" href="/static/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
            <link rel="manifest" href="/static/site.webmanifest" />
            <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#b91d47" />
            <meta name="msapplication-TileColor" content="#b91d47" />
            <meta name="theme-color" content="#ffffff" />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}
