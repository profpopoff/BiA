import icons from '../../public/static/staticImages'

export default function DefaultTags() {
   return (
      <>
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="shortcut icon" href={icons.favicon.src} />
         <link rel="apple-touch-icon" sizes="180x180" href={icons.apple.src} />
         <link rel="icon" type="image/png" sizes="32x32" href={icons.favicon32.src} />
         <link rel="icon" type="image/png" sizes="16x16" href={icons.favicon16.src} />
         <link rel="manifest" href="/static/site.webmanifest" />
         <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
         <meta name="msapplication-TileColor" content="#b91d47" />
         <meta name="theme-color" content="#ffffff" />
      </>
   );
}