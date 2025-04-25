import React from 'react'
import { ArrowRight, Upload, FileText, BarChart, CheckCircle, Search, BrainCircuit } from "lucide-react"
import Link from 'next/link'
import Button from './Button'

const Navbar = () => {
  return (
    <div>
        <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary " />
            {/* <span className="text-xl font-bold" >PredictHire</span> */}
            <Link href="/" className='text-xl font-bold'>PredictHire</Link>
          </div>
          <nav className="hidden md:flex gap-6 ">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#templates" className="text-sm font-medium hover:text-primary">
              Templates
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Log in
            </Link>
            <Link href="/signup">

            <Button className="hidden md:inline-flex"> 
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
        
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar