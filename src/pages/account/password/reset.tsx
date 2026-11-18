import { Field, Form, Formik, FormikHelpers, FormikState } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import * as Yup from 'yup'
import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'

import { ErrorField } from '../../../components/ErrorField'
import { AuthOption, withAuth } from '../../../utils/withAuth'
import axios, { AxiosError } from 'axios'

interface ResetProps {

}

type EmailValue = {
    email: string;
}

const Reset: React.FC<ResetProps> = ({}) => {

    const [ApiResponse, setAPIResponse] = useState<any>()
    const [email, setEmail] = useState<string>('')

    const emailValue: EmailValue = { email: '' }
    const emailSchema = Yup.object().shape({
        email: Yup.string().email('Email should be email').required('Email cannot be empty or whitespace')
    })
    const submitResetForm = async (values: EmailValue, helpers: FormikHelpers<EmailValue>) => {
        try {
            const res = await axios.patch('/auth/password/reset', {
                email: values.email
            })
            setAPIResponse(res.data)
            setEmail(values.email)
        } catch (err) {
            if(err instanceof AxiosError) {
                setAPIResponse(err!.response!.data)
            }
        }
    }

    return (
        <>
            <Head>
                <title>Recover password</title>
                <meta name="description" content="Profile page" />
            </Head>
            <div className="mx-auto mt-12 w-[calc(100%-2rem)] max-w-md border border-stone-200 bg-white sm:mt-24" >
                    <div className="mx-auto w-full max-w-sm px-4 pb-4 sm:px-6">
                    <h1 className="m-10 mx-auto font-heading text-2xl font-medium text-center text-stone-900">Door to Happiness Holiday</h1>
                        {ApiResponse
                        ? 
                        <>
                            <p className="m-10 mx-auto text-center text-md">Password reset</p>
                            <p className="m-10 mx-auto text-center text-md">{ApiResponse.message}</p>
                            <p className="m-10 mx-auto font-bold text-center text-md">{ApiResponse.email}</p>
                        </> 
                        :
                        <Formik
                            initialValues={emailValue} 
                            onSubmit={submitResetForm}
                            validationSchema={emailSchema}
                        >
                            {({ isSubmitting, errors }: FormikState<EmailValue>) => (
                                <Form>
                                    <div>
                                        <div className="form-control">
                                        <label className="label">
                                                <span className="font-semibold label-text">Recovery Email</span>
                                            </label>
                                            <Field placeholder="Enter your email" type="email" name="email" className={`w-full p-3 text-base transition duration-200 rounded input bg-white border border-stone-300 focus:border-emerald-700 focus:outline-none`}/>
                                            <label className="label">
                                                {errors.email ? <ErrorField error={errors.email}/> : null}
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full mb-5 btn border-0 rounded-full bg-emerald-900 text-white text-[12px] uppercase tracking-[0.14em] hover:bg-emerald-800">
                                        Reset password
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        }
                    </div>
            </div>    
            <div className="mx-auto mb-24 mt-8 flex w-[calc(100%-2rem)] max-w-md justify-center">
                {ApiResponse ?
                    <Link href="/" className="m-auto mb-10 text-base btn btn-ghost btn-sm rounded-full lg:m-0 text-emerald-900 border border-emerald-900 hover:bg-emerald-900 hover:text-white">
                        <>
                        <FiArrowLeft/> Back to main site
                        </>
                    </Link>
                :
                    <Link href="/login" className="m-auto mb-10 text-base btn btn-ghost btn-sm rounded-full lg:m-0 text-emerald-900 border border-emerald-900 hover:bg-emerald-900 hover:text-white">
                        <>
                            <FiArrowLeft/> Back to login
                        </>
                    </Link>
                }
            </div>
        </>
    )
}

export default withAuth(AuthOption.FORBIDDEN, Reset)