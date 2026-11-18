import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../store/store'
import { useAuthenticatedSocket } from '../utils/useSocket'


interface InviteProps {

}

const Index: React.FC<InviteProps> = ({}) => {
    const { socket } = useAuthenticatedSocket('ws://localhost:4000/chat')
    let userState = useSelector((state: RootState) => state.user)
    const { user, authenticated } = userState
    const router = useRouter()
    const { code } = router.query

    const [ApiResponse, setApiResponse] = useState<any>(null)
    const [JoinRoomResponse, setJoinRoomResponse] = useState<any>(null)

    useEffect(() => {
        if(socket) {
            socket.on('connect', () => {
                console.log('Socket connected')
            })
          
            socket.on('disconnect', () => {
                console.log('Socket disconnected')
            })

            return () => {
                socket.off('connect')
                socket.off('disconnect')
                socket.off('error')
            }
        }
    }, [socket])

    useEffect(() => {
        const getInvintationByCode = async() => {
            try {
                const res = await axios.get('/room/invitation', { 
                    params: {
                        code
                    }
                })
                console.log(code)
                setApiResponse(res.data)
                console.log(res.data)
            } catch (err) {
                setApiResponse(err)
            }
        }
        if(code && user) {
            getInvintationByCode()
        }
    }, [code, user])

    if(!user) {
        return <></>
    }
    

    const joinRoom = async(room: any) => {
        try {
            const res = await axios.post(`/room/add-user/${room.id}`, {
                userId: user.id,
                type: 'user'
            })
            console.log(res.data)
            if(res.data) {
                setJoinRoomResponse(res.data)
                socket.emit('room:join', { roomId: room.id })
            }
            
        } catch (err) {
            setJoinRoomResponse(err)
        }
    }

    return (
        <>
                        <Head>
                <title>Create Account - Door to Happiness Holiday</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <main className="bg-brand-ivory py-20 sm:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-10">
                    {ApiResponse &&
                        <section className="max-w-3xl animate-page-in">
                            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                                <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                                You&apos;re invited
                            </p>
                            <h1 className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-6xl">{ApiResponse.room.name}</h1>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-600">{ApiResponse.room.description}</p>

                            <div className="mt-12 grid gap-8 border-y border-stone-300 py-8 sm:grid-cols-2">
                                <div className="flex items-center gap-5">
                                    <img className="h-16 w-16 shrink-0 rounded-full object-cover" src={ApiResponse.room.owner.image} alt={`${ApiResponse.room.owner.displayName} profile picture`}/>
                                    <div>
                                        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Owned by</h2>
                                        <p className="mt-1 font-heading text-xl text-stone-900">{ApiResponse.room.owner.displayName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <img className="h-16 w-16 shrink-0 rounded-full object-cover" src={ApiResponse.user.image} alt={`${ApiResponse.user.displayName} profile picture`}/>
                                    <div>
                                        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Invited by</h2>
                                        <p className="mt-1 font-heading text-xl text-stone-900">{ApiResponse.user.displayName}</p>
                                    </div>
                                </div>
                            </div>

                            {JoinRoomResponse &&
                                <div role="status" className="mt-8 border-l-2 border-green-600 bg-green-50 p-4 text-sm font-medium text-green-800">
                                    <p>{JoinRoomResponse.message}</p>
                                </div>
                            }
                            <div className="mt-10">
                                <button onClick={() => joinRoom(ApiResponse.room)} className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-emerald-900 px-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800">Join</button>
                            </div>
                        </section>
                    }
                </div>
            </main>
        </>
    )
}

export default Index