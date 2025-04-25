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
  .oneOf([Yup.ref('password'), null], 'Password must mtch')
});

const Signup = () => {

  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (value, {resetForm, setSubmitting}) => {
      console.log(value);

      axios.post('http://localhost:5000/user/add', value)
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
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
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
                Email *
              </label>
              <input
                type="email"
                id='email'
                onChange={signupForm.handleChange}
                value={signupForm.values.email}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password (8 or more characters) *
              </label>
              <input
                type="password"
                id='password'
                onChange={signupForm.handleChange}  
                value={signupForm.values.password}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
            >
              
              Create Account
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