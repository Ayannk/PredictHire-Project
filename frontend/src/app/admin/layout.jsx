'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const Layout = ({ children }) => {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin');
        if (!token) {
            toast.error('You are not authorized to access this page');
            router.push('/login');
        }
    }, [])


    return (
        <div>{children}</div>
    )
}

export default Layout