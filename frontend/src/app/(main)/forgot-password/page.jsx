'use client';
import React from 'react';

const ForgotPassword = () => {
    
  return (
     <div className="bg-blue-50 min-h-screen flex items-center justify-center">
     <div className="bg-white rounded-xl shadow-md w-full max-w-md">
       <div className="px-8 pt-8 pb-4">
         <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
           Forgot your password?
         </h2>
         <p className="text-center text-gray-600 text-sm mb-6">
           Enter your email address and we'll send you a link to reset your password.
         </p>

         <form className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Email *
             </label>
             <input
               type="email"
               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
               placeholder="you@example.com"
             />
           </div>

           <button
             type="submit"
             className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
           >
             Send Reset Link
           </button>
         </form>
       </div>

       <div className="bg-gray-50 text-center text-sm text-gray-600 py-4 rounded-b-xl">
         Remember your password? <a href="#" className="text-blue-600 hover:underline">Sign in</a>
       </div>
     </div>
   </div>
  )
}

export default ForgotPassword;