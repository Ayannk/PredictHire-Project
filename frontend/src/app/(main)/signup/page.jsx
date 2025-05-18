'use client';
import { IconLoader, IconSend2 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({

  name: Yup.string()
  .min(4, 'To0 Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required')
  .matches(/[a-z]/, 'Lowercase letter is required')
  .matches(/[A-z]/, 'Uppercase latter is required')
  .matches(/[0-9]/, 'Number is required')
  .matches(/[\W]/, 'Special Character is required'),
  confirmPassword: Yup.string().required('Confirm Password is required')
  .oneOf([Yup.ref('password'), null], 'Password must match')
});

const Signup = () => {

  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (value, {resetForm, setSubmitting}) => {
      console.log(value);

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/add`, value)
      .then((result) => {
        toast.success('User registration successfully');
        resetForm();
        router.push('/login');
      }).catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
        setSubmitting(false);
        
      });
    },
    validationSchema: SignupSchema
   
  })

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center mt-16">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md">
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create an account
          </h2>

          <div className="flex justify-center space-x-3 mb-6 bg-blue-50 min-h-10 rounded-md p-2">
            <button className="flex items-center gap-2 border rounded-md px-4 py-2 shadow-sm hover:bg-gray-50 bg-white">
              <img
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                className="w-5 h-5"
                alt="LinkedIn"
              />
              <span className="text-sm font-medium text-gray-700">LinkedIn</span>
            </button>
            <button className="flex items-center gap-2 border rounded-md px-4 py-2 shadow-sm hover:bg-gray-50 bg-white">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center gap-2 border rounded-md px-4 py-2 shadow-sm hover:bg-gray-50 bg-white">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                className="w-5 h-5"
                alt="GitHub"
              />
              <span className="text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>

          <form onSubmit={signupForm.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.name}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 
                  ${signupForm.touched.name && signupForm.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="John Doe"
              />
              {signupForm.touched.name && signupForm.errors.name && (
                <div className="text-red-500 text-sm mt-1">{signupForm.errors.name}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.email}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 
                  ${signupForm.touched.email && signupForm.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="you@example.com"
              />
              {signupForm.touched.email && signupForm.errors.email && (
                <div className="text-red-500 text-sm mt-1">{signupForm.errors.email}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.password}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 
                  ${signupForm.touched.password && signupForm.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
              {signupForm.touched.password && signupForm.errors.password && (
                <div className="text-red-500 text-sm mt-1">{signupForm.errors.password}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.confirmPassword}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 
                  ${signupForm.touched.confirmPassword && signupForm.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
              {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{signupForm.errors.confirmPassword}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={signupForm.isSubmitting}
              className={`w-full bg-blue-600 text-white py-3 rounded-md font-semibold
                ${signupForm.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {signupForm.isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <IconLoader className="animate-spin" size={20} />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 text-center text-sm text-gray-600 py-4 rounded-b-xl">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
        </div>
      </div>
    </div>
    
  )
}

export default Signup;