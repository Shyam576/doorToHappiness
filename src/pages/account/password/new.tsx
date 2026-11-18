import { Field, Form, Formik, FormikHelpers, FormikState } from 'formik'
import Head from 'next/head'
import * as Yup from 'yup'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

import { ErrorField } from '../../../components/ErrorField'
import { AuthOption, withAuth } from '../../../utils/withAuth'


interface NewProps {

}

type PasswordValues = {
    newPassword: string;
}


const New: React.FC<NewProps> = ({}) => {

    const router = useRouter()
    const { token } = router.query

    const [ApiResponse, setAPIResponse] = useState<any>({})
    const [open, setOpen] = useState<boolean>(false)

    const toggle = () =>{
        setOpen(!open)
    }

    const passwordValues: PasswordValues = { newPassword: ''}
    const passwordSchema = Yup.object().shape({
        newPassword: Yup.string().required('Password cannot be empty or whitespace').min(6, 'Password must be between 6 and 100 characters long').max(100, 'Password must be between 6 and 100 characters long')
        .notOneOf([Yup.ref('oldPassword')], 'New password cannot be same as old password')
    })
    const submitNewPassword = async (values: PasswordValues, helpers: FormikHelpers<PasswordValues>) => {
        try {
            const res = await axios.patch('/auth/password/new', {
                newPassword: values.newPassword
            }, {
                params: {
                    token
                }
            })
            helpers.resetForm()
            setAPIResponse(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
            if(err instanceof AxiosError) {
                setAPIResponse(err!.response!.data)
            }
        }
    }

    return (
        <>
            <Head>
                <title>New password</title>
                <meta name="description" content="Profile page" />
            </Head>
            <div className="h-screen">
            <div className="mx-auto mt-12 w-[calc(100%-2rem)] max-w-md border border-stone-200 bg-white sm:mt-24" >
                    <div className="mx-auto w-full max-w-sm px-4 pb-4 sm:px-6">
                    <h1 className="m-10 mx-auto font-heading text-2xl font-medium text-center text-stone-900">Door to Happiness Holiday</h1>
                    {ApiResponse.success ? <p className="p-4 m-10 mx-auto font-bold text-center border text-md text-success rounded-xl border-success">{ApiResponse.message}</p> : (ApiResponse.message ? <p className="p-4 m-10 mx-auto font-bold text-center border rounded-xl border-error text-md text-error">{ApiResponse.message}</p> : null)}
                    {ApiResponse.password ? <p className="p-4 m-10 mx-auto font-bold text-center border text-md text-error rounded-xl border-error">Invalid password</p> : null}
                        <Formik
                            initialValues={passwordValues} 
                            onSubmit={submitNewPassword}
                            validationSchema={passwordSchema}
                        >
                            {({ isSubmitting, errors }: FormikState<PasswordValues>) => (
                                <Form>
                                    <div>
                                        <div className="form-control">
                                            <label className="relative label">
                                                <span className="font-semibold label-text">New Password</span>
                                                <div className='absolute text-2xl top-12 right-5'>
                                                    {
                                                        (open === false) ? <AiFillEye onClick={toggle}/> :
                                                        <AiFillEyeInvisible onClick={toggle}/>
                                                    }
                                                </div>
                                            </label>
                                            <Field placeholder="Enter new password" type={(open === false)? 'password' :'text'} name="newPassword" className={`w-full p-3 text-base transition duration-200 rounded input bg-white border border-stone-300 focus:border-emerald-700 focus:outline-none`}/>
                                            <label className="label">
                                                {errors.newPassword ? <ErrorField error={errors.newPassword}/> : null}
                                                {/* {ApiResponse.password ? <ErrorField error={ApiResponse.password}/> : null} */}
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full mb-5 btn border-0 rounded-full bg-emerald-900 text-white text-[12px] uppercase tracking-[0.14em] hover:bg-emerald-800">
                                        Set new password
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
            </div>
            </div>
        </>
    )
}

export default withAuth(AuthOption.FORBIDDEN, New)