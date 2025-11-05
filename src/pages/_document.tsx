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
                <meta name="theme-color" content="#f97316" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document