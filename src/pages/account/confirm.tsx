import axios, { AxiosError } from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Container } from '../../components/Container'
import { Dispatch } from '../../store/store'
import { AuthOption, withAuth } from '../../utils/withAuth'


interface ConfirmProps {

}

const Confirm: React.FC<ConfirmProps> = ({}) => {
    const dispatch = useDispatch<Dispatch>()
    const [ApiResponse, setApiResponse] = useState<any>('')
    
    const router = useRouter()
    const { token } = router.query

    const confirmAccount = async () => {
        try {
            const res = await axios.get('/auth/account/confirm', {
                params: {
                    token: token
                }
            })
    
            if(res.data.success) {
                dispatch.user.getUserProfileAsync()
            }
    
            setApiResponse(res.data)
        } catch (err) {
            if(err instanceof AxiosError) {
                setApiResponse(err.response!.data)
                console.log(err.response!.data)
            }
        }
    }

    const resendConfirmationToken = async () => {
        try {
            const res = await axios.get('/auth/account/confirm-resend')
            setApiResponse(res.data)
        } catch (err) {
            if(err instanceof AxiosError) {
                setApiResponse(err.response!.data)
                console.log(err.response!.data)
            }
        }
    }

    return (
        <>
            <Head>
                <title>Confirm account</title>
                <meta name="description" content="Profile page" />
            </Head>
            <Container className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center py-20 text-center">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">Your account</p>
                <h1 className="mb-8 font-heading text-4xl font-medium text-stone-900">Confirm your <em className="text-emerald-900">account</em></h1>
                {!ApiResponse ? <button onClick={confirmAccount} className="btn rounded-full border border-emerald-900 bg-transparent text-emerald-900 hover:bg-emerald-900 hover:text-white">Confirm account</button> 
                : 
                <div>
                    {!ApiResponse.success 
                        ? <p className="text-xl">{ApiResponse.message}. Click here to <button onClick={resendConfirmationToken} className="btn-link">resend it</button></p>
                        : <p className="text-xl">{ApiResponse.message}</p>
                    }
                    
                </div>
                }
            </Container>
        </>
    )
}

export default withAuth(AuthOption.REQUIRED, Confirm)