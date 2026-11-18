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
                <meta name="theme-color" content="#183C32" />

                {/* Google Fonts — Fraunces (headings) + Inter (body) */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />

                {/* DNS prefetch for external image domains actually in use */}
                <link rel="dns-prefetch" href="//images.unsplash.com" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document