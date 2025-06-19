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

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section with Bhutanese imagery */}
                <div className="relative h-64 bg-blue-600 overflow-hidden">
                    <Image 
                        src={beautifulMoutain.src}
                        alt="Beautiful Dagana, Bhutan"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-white">
                            Discover Bhutan's Magic
                        </h1>
                    </div>
                </div>

                {/* Auth Container */}
                <div className="max-w-md mx-auto -mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Form Toggle */}
                    <div className="flex border-b">
                        <button
                            onClick={() => setFormType('login')}
                            className={`flex-1 py-4 font-medium ${formType === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setFormType('register')}
                            className={`flex-1 py-4 font-medium ${formType === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email address
                                        </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && touched.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            {formType === 'login' && (
                                                <a href="/account/password/reset" className="text-sm text-blue-600 hover:underline">
                                                    Forgot password?
                                                </a>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Field
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
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
                                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                        )}
                                    </div>

                                    {formType === 'register' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Account Type
                                            </label>
                                            <Field
                                                as="select"
                                                name="role"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select role</option>
                                                <option value="traveler">Traveler</option>
                                                <option value="guide">Tour Guide</option>
                                                <option value="vendor">Local Vendor</option>
                                            </Field>
                                            {errors.role && touched.role && (
                                                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
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
                        className="inline-flex items-center text-blue-600 hover:underline"
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