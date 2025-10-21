import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {

    return (
        <Html lang="en">
            <Head>
                {/* Favicon and App Icons */}
                <link rel="icon" type="image/png" href="/logowhitebg.png" />
                <link rel="shortcut icon" type="image/png" href="/logowhitebg.png" />
                <link rel="apple-touch-icon" href="/logowhitebg.png" />
                <meta name="msapplication-TileImage" content="/logowhitebg.png" />
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