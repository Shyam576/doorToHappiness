import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

import { Container } from '../../components/Container';
import { AuthOption, withAuth } from '../../utils/withAuth';


interface LoginErrorProps {

}

const LoginError: React.FC<LoginErrorProps> = ({}) => {

    const router = useRouter()
    const { message } = router.query

    return (
        <>
            <Head>
                <title>Login Error</title>
                <meta name="description" content="Welcome to Witq" />
            </Head>
            <Container className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center py-20 text-center">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">Sign in</p>
                <h1 className="mb-4 font-heading text-4xl font-medium text-stone-900 sm:text-5xl">
                    We couldn&apos;t sign you <em className="text-emerald-900">in</em>
                </h1>
                <p className="mb-8 text-base leading-relaxed text-stone-600">
                    {message || `Either account is not verified or social provider's email is already in use in`}
                </p>
                <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800"
                >
                    Back to sign in
                </Link>
            </Container>
        </>
    );
}

export default withAuth(AuthOption.FORBIDDEN, LoginError)