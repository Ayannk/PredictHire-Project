'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required')
});

const Login = () => {

  const Router = useRouter();

  const loginForm = useFormik({
    initialValues:{
      email: '',
      password: ''
    },
    onSubmit: (values,{resetForm, setSubmitting}) => {
      console.log(values);
      
      axios.post('http://localhost:5000/user/authenticate', values)
      .then((result) => {
        toast.success('Login successful');
        resetForm();
        console.log(result.data?.token);
        localStorage.setItem('token', result.data?.token);
        Router.push('/');

      }).catch((err) => {
        console.log(err);
        toast.error('Login failed');
        setSubmitting(false);
      });
    }


  })
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md">
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Sign in to your account
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

          <form onSubmit={loginForm.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id='email'
                onChange={loginForm.handleChange}
                value={loginForm.values.email}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="you@example.com"
              />
              
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                id='password'
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              onChange={loginForm.handleChange}
              value={loginForm.values.signin}
              
              href="/manage-resume"
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="bg-gray-50 text-center text-sm text-gray-600 py-4 rounded-b-xl">
          Not registered? <a href="/signup" className="text-blue-600 hover:underline">Create an account</a>
        </div>
      </div>
    </div>
  )
}

export default Login;