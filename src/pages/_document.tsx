import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {

    return (
        <Html lang="en">
            <Head>
                {/* Favicon and App Icons - with cache busting */}
                <link rel="icon" href="/favicon.ico?v=2" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=2" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png?v=2" />
                <link rel="apple-touch-icon" href="/favicon.png?v=2" />
                <meta name="theme-color" content="#B45309" />

                {/* Google Fonts — Cormorant Garamond (headings) + Inter (body) */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />

                {/* DNS prefetch for common external image domains */}
                <link rel="dns-prefetch" href="//images.unsplash.com" />
                <link rel="dns-prefetch" href="//ucarecdn.com" />
                <link rel="dns-prefetch" href="//cdn.drukasia.com" />
                <link rel="dns-prefetch" href="//upload.wikimedia.org" />
                <link rel="dns-prefetch" href="//dynamic-media-cdn.tripadvisor.com" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document