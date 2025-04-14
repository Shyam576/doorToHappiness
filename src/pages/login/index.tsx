import { Formik, Form, Field, FormikState, FormikHelpers } from 'formik'
import Head from 'next/head'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'

import { SocialLogin } from '../../components/SocialLogin'
import { Dispatch } from '../../store/store'
import { AuthOption, withAuth } from '../../utils/withAuth'
import { SERVER_URL } from '../../utils/constants'
import { ErrorField } from '../../components/ErrorField'
import axios from 'axios'


interface LoginProps {

}

type LoginValues = {
    email: string;
    password: string;
}

type RegisterValues = {
    email: string;
    password: string;
    role: string;
}


const Login: React.FC<LoginProps> = ({}) => {

    const [FormType, setFormType] = useState<'login' | 'register'>('login')
    const [open, setOpen] = useState<boolean>(false)
    const [ApiErrors, setAPIErrors] = useState<any>({})
    const dispatch = useDispatch<Dispatch>()
    const router = useRouter()


    const toggle = () =>{
        setOpen(!open)
    }



    const loginValues: LoginValues = { email: '', password: '' }
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Email should be email').required('Email cannot be empty or whitespace'),
        password: Yup.string().required('Password cannot be empty or whitespace').min(6, 'Password must be between 6 and 100 characters long').max(100, 'Password must be between 6 and 100 characters long')
    })
    const submitLoginForm = async (values: LoginValues, helpers: FormikHelpers<LoginValues>) => {
        console.log(values)
        setTimeout(() => helpers.setSubmitting(false), 2000)
        try {
            const res = await axios.post("/api/auth/login",values,{
                // Use axios.post
                headers: {
                  "Content-Type": "application/json",
                },})

            console.log(res.data)
            if(res.status ===500) {
                setAPIErrors("Invalid credentials")
                console.log('ApiErrors', ApiErrors)
            }
            console.log('ApiErrors', ApiErrors)
            if(res.data.user) {
                router.push('/home')
            }
            console.log('ApiErrors', ApiErrors)
        } catch (err: any) {
            console.log('ERROR', err)
        }
    }



    const registerValues: RegisterValues = {
        email: '',
        password: '',
        role: ''
    }
    const registerSchema = Yup.object().shape({
        email: Yup.string().email('Email should be email').required('Email cannot be empty or whitespace'),
        password: Yup.string().required('Password cannot be empty or whitespace').min(6, 'Password must be between 6 and 100 characters long').max(100, 'Password must be between 6 and 100 characters long'),
        role: Yup.string().required('Role must be a string')
    })
    const submitRegisterForm = async (values: RegisterValues, helpers: FormikHelpers<RegisterValues>) => {
        console.log(values)
        setTimeout(() => helpers.setSubmitting(false), 2000)
        try {
            const res = await dispatch.user.localRegisterAsync(values)
            if(res.errors) {
                setAPIErrors(res.errors)
                console.log(ApiErrors)
            }

            if(res.user) {
                router.push('/me')
            }
        } catch (err: any) {
            console.log('ERROR', err)
        }
    }


    const changeForm = (formType: 'login' | 'register') => {
        setAPIErrors({})
        setFormType(formType)
    }

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login or create account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex w-full m-auto mt-0 shadow-xl lg:w-4/12 md:w-10/12 md:mt-28 bg-base-200 rounded-xl" >
                    <div className="mx-auto w-96">
                    <p className="m-10 mx-auto text-lg font-bold text-center">Door To Happiness Holiday</p>
                    <div className="box-border flex flex-wrap">
                        <button onClick={() => changeForm('login')} className={`flex-1 w-64 p-4 mr-4 text-center rounded-lg uppercase font-bold ${FormType === 'login' ? 'bg-primary' : ''}`}>Sign in</button>
                        <button onClick={() => changeForm('register')} className={`flex-1 w-64 p-4 text-center rounded-lg uppercase font-bold ${FormType === 'register' ? 'bg-primary' : ''}`}>Sign up</button>
                    </div>
                    {FormType && FormType === 'login' ?
                        <Formik
                            initialValues={loginValues} 
                            onSubmit={submitLoginForm}
                            validationSchema={loginSchema}
                        >
                            {({ isSubmitting, errors, touched }: FormikState<LoginValues>) => (
                                <Form>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="font-semibold label-text">Email</span>
                                                <span className="font-medium label-text-alt">e.g. john@gmail.com</span>
                                            </label>
                                            <Field placeholder="Enter your email" type="email" name="email" className={`w-full p-3 transition duration-200 rounded input`}/>
                                            <label className="label">
                                                {errors.email && touched.email ? <ErrorField error={errors.email}/>  : null}
                                                {ApiErrors.email && touched.email ? <ErrorField error={ApiErrors.email}/>: null}
                                            </label>    
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="relative label">
                                                <span className="font-semibold label-text">Password</span>
                                                <span className="font-medium label-text-alt">e.g. K3ybo@rdC@t</span>
                                                <div className='absolute text-2xl top-12 right-5'>
                                                    {
                                                        (open === false) ? <AiFillEye onClick={toggle}/> :
                                                        <AiFillEyeInvisible onClick={toggle}/>
                                                    }
                                                </div>
                                            </label>
                                            <Field placeholder="Enter your password" type={(open === false)? 'password' :'text'} name="password" className={`w-full p-3 transition duration-200 rounded input`}/>
                                            
                                            <label className="label">
                                                {errors.password ? <ErrorField error={errors.password}/> : null}
                                                {ApiErrors.password ? <ErrorField error={ApiErrors.password}/> : null}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-5">
                                        <Link href="/account/password/reset">
                                            <div className="form-control">
                                                <label className="cursor-pointer hover:underline">
                                                    <p>Forgot password?</p>
                                                </label>
                                            </div>
                                        </Link>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full btn">
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik> : null
                        }
                        {FormType && FormType === 'register' ?
                        <Formik
                            initialValues={registerValues} 
                            onSubmit={submitRegisterForm}
                            validationSchema={registerSchema}
                        >
                            {({ isSubmitting, errors, touched }: FormikState<RegisterValues>) => (
                                <Form>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="font-semibold label-text">Email</span>
                                                <span className="font-medium label-text-alt">e.g. john@gmail.com</span>
                                            </label>
                                            <Field placeholder="Enter your email" type="email" name="email" className={`w-full p-3 transition duration-200 rounded input`}/>
                                            <label className="label">
                                                {errors.email && touched.email ? <ErrorField error={errors.email}/> : null}
                                                {ApiErrors.email && touched.email ? <ErrorField error={ApiErrors.email}/> : null}
                                            </label>                                           
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="relative label">
                                                <span className="font-semibold label-text">Password</span>
                                                <span className="font-medium label-text-alt">e.g. K3ybo@rdC@t</span>
                                                <div className='absolute text-2xl top-12 right-5'>
                                                    {
                                                        (open === false) ? <AiFillEye onClick={toggle}/> :
                                                        <AiFillEyeInvisible onClick={toggle}/>
                                                    }
                                                </div>
                                            </label>
                                            <Field placeholder="Enter your password" type={(open === false)? 'password' :'text'} name="password" className={`w-full p-3 transition duration-200 rounded input`}/>                                           
                                            <label className="label">
                                                {errors.password ? <ErrorField error={errors.password}/> : null}
                                                {ApiErrors.password ? <ErrorField error={ApiErrors.password}/> : null}
                                            </label>
                                        </div>
                                    </div>                       
                                    <button type="submit" disabled={isSubmitting} className={`w-full btn ${isSubmitting ? 'btn loading' : ''}`}>
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik> : null
                        }
                        <div className="my-10 divider">OR</div>
                        <section className="box-border flex flex-wrap">
                            <SocialLogin className="w-64 mr-4" provider="Google" url={`${SERVER_URL}/auth/google`}/>
                            <SocialLogin className="w-64" provider="Facebook" url={`${SERVER_URL}/auth/facebook`}/>
                        </section>
                    </div>
            </div>    
            <div className="flex w-full m-auto mt-8 lg:w-4/12 md:w-10/12">
                <Link href="/" className="m-auto mb-10 text-xl shadow-xl btn btn-ghost btn-sm rounded-btn lg:m-0 btn-primary btn-outline">
                    <>
                        <FiArrowLeft/> Back to main site
                    </>
                </Link>
            </div>
        </>
    )
}

export default withAuth(AuthOption.FORBIDDEN, Login)