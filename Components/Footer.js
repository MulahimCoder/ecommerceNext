import React, { useEffect, useState }  from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Footer = () => {
  const [admin, setAdmin] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (window.location.pathname === '/admin' ||  window.location.pathname === '/admin/addProduct') {
      setAdmin(false);
    }
  }, []);

  // Check if the current page is '/admin' and don't render the footer in that case
  if (router.pathname === '/admin' || router.pathname === '/admin/addProduct' || router.pathname === '/admin/viewProduct') {
    return null;
  }
  return (
    
   <div>
    <footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
   
      <Link href={"/"} className="flex title-font font-medium items-center md:justify-center justify-center text-gray-900">
      <span className="ml-3 text-xl text-pink-600 tracking-widest">CodeThreads</span>
      </Link>
    
      <p className="mt-2 mx-8  text-gray-500">Wear modern &lt;cloth&gt; </p>
      <p  className="mt-2 mx-8  text-gray-500"> Premium tshirts,hoodies and apparals</p>
     
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-bold text-pink-500 hover:text-pink-600 tracking-widest text-sm mb-3">SHOP</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/tshirts'} className="text-gray-600 hover:text-gray-800">T-shirts</Link>
          </li>
          <li>
            <Link href={'/hoodies'} className="text-gray-600 hover:text-gray-800">Hoodies</Link>
          </li>
          <li>
            <Link href={'/stickers'} className="text-gray-600 hover:text-gray-800">Stickers</Link>
          </li>
          <li>
            <Link href={'/mugs'} className="text-gray-600 hover:text-gray-800">Mugs</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font  font-bold text-pink-500 hover:text-pink-600 tracking-widest text-sm mb-3">COSTUMER SERVICES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/contact'} className="text-gray-600 hover:text-gray-800">Contact us</Link>
          </li>
          <li>
            <Link href={'/about'} className="text-gray-600 hover:text-gray-800">About Us</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font  font-bold text-pink-500 hover:text-pink-600 tracking-widest text-sm mb-3">POLICY</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/privacyPolicy'} className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
          </li>
          <li>
            <Link href={'/termsAndConditions'} className="text-gray-600 hover:text-gray-800">Terms & Conditions</Link>
          </li>
          
        </nav>
      </div>
      
    </div>
  </div>
  <div className="bg-gray-100">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 CodeThreads — All Rights Reserved
        
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a className="text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx={4} cy={4} r={2} stroke="none" />
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer