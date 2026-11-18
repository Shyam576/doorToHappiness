import { Formik, Form, Field, FormikHelpers } from 'formik'
import Head from 'next/head'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'
import axios from 'axios'
import beautifulMoutain from "../../../public/beautifulMoutain.jpeg";


interface LoginProps {}

type LoginValues = { email: string; password: string }
type RegisterValues = { email: string; password: string; role: string }

const Login: React.FC<LoginProps> = ({}) => {
    const [formType, setFormType] = useState<'login' | 'register'>('login')
    const [showPassword, setShowPassword] = useState(false)
    const [apiErrors, setApiErrors] = useState<any>({})
    const router = useRouter()

    // Form configurations
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required').min(6, 'Too short')
    })

    const registerSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required').min(6, 'Too short'),
        role: Yup.string().required('Required')
    })

    const handleSubmit = async (values: LoginValues | RegisterValues) => {
        try {
            const endpoint = formType === 'login' ? '/api/auth/login' : '/api/auth/register'
            const res = await axios.post(endpoint, values)
            
            if (res.data.user) {
                router.push(formType === 'login' ? '/admin/majorCityPackage' : '/me')
            }
        } catch (err: any) {
            setApiErrors(err.response?.data?.errors || {})
        }
    }

    return (
        <>
            <Head>
                <title>{formType === 'login' ? 'Sign In' : 'Create Account'} | Bhutan Tourism</title>
                <meta name="description" content="Access your Bhutan travel account" />
            </Head>

            <div className="min-h-screen bg-brand-ivory pb-16">
                {/* Hero Section with Bhutanese imagery */}
                <div className="relative h-64 bg-emerald-950 overflow-hidden">
                    <Image 
                        src={beautifulMoutain.src}
                        alt="Beautiful Dagana, Bhutan"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="font-heading text-4xl font-medium text-white">
                            Discover Bhutan's Magic
                        </h1>
                    </div>
                </div>

                {/* Auth Container */}
                <div className="relative z-10 max-w-md mx-auto -mt-16 bg-white border border-stone-200 overflow-hidden">
                    {/* Form Toggle */}
                    <div className="flex border-b">
                        <button
                            onClick={() => setFormType('login')}
                            className={`flex-1 py-4 font-medium transition-colors duration-300 ${formType === 'login' ? 'text-emerald-900 border-b-2 border-emerald-900' : 'text-stone-500'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setFormType('register')}
                            className={`flex-1 py-4 font-medium transition-colors duration-300 ${formType === 'register' ? 'text-emerald-900 border-b-2 border-emerald-900' : 'text-stone-500'}`}
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <h2 key={formType} className="animate-page-in font-heading text-3xl font-medium text-stone-900 mb-6">
                            {formType === 'login' ? 'Welcome Back' : 'Join Our Journey'}
                        </h2>

                        <Formik
                            initialValues={formType === 'login' ? 
                                { email: '', password: '' } : 
                                { email: '', password: '', role: '' }}
                            validationSchema={formType === 'login' ? loginSchema : registerSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">
                                            Email address
                                        </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className="w-full px-4 py-3 text-base border border-stone-300 rounded-lg bg-white focus:ring-emerald-700 focus:border-emerald-700"
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && touched.email && (
                                            <p className="mt-1 text-sm text-red-700">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="block text-sm font-medium text-stone-700">
                                                Password
                                            </label>
                                            {formType === 'login' && (
                                                <a href="/account/password/reset" className="text-sm text-emerald-900 hover:underline">
                                                    Forgot password?
                                                </a>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Field
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                className="w-full px-4 py-3 text-base border border-stone-300 rounded-lg bg-white focus:ring-emerald-700 focus:border-emerald-700"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                            </button>
                                        </div>
                                        {errors.password && touched.password && (
                                            <p className="mt-1 text-sm text-red-700">{errors.password}</p>
                                        )}
                                    </div>

                                    {formType === 'register' && (
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">
                                                Account Type
                                            </label>
                                            <Field
                                                as="select"
                                                name="role"
                                                className="w-full px-4 py-3 text-base border border-stone-300 rounded-lg focus:ring-emerald-700 focus:border-emerald-700"
                                            >
                                                <option value="">Select role</option>
                                                <option value="traveler">Traveler</option>
                                                <option value="guide">Tour Guide</option>
                                                <option value="vendor">Local Vendor</option>
                                            </Field>
                                            {errors.role && touched.role && (
                                                <p className="mt-1 text-sm text-red-700">{errors.role}</p>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-emerald-900 text-white py-3 px-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-emerald-800 transition-colors duration-200 disabled:opacity-70"
                                    >
                                        {isSubmitting ? 'Processing...' : 
                                         formType === 'login' ? 'Sign In' : 'Create Account'}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>

                <div className="mt-8 text-center">
                    <a 
                        href="/" 
                        className="inline-flex items-center text-emerald-900 hover:underline"
                    >
                        <FiArrowLeft className="mr-1" />
                        Back to Bhutan Tourism
                    </a>
                </div>
            </div>
        </>
    )
}

export default Login