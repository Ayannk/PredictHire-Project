// // 'use client';
// // import Link from "next/link";
// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const Navbar = () => {
  
// //   return (
// //     <nav className="bg-blue-500 py-3 px-6 flex justify-between items-center">
// //       {/* Logo */}
// //       <div className="flex items-center space-x-2">
// //         {/* <img
// //           src="logo.png" // Replace with your actual logo path
// //           alt="Jobscan Logo"
// //           className="h-8"
// //         /> */}
// //         <span className="text-white text-lg font-semibold">PredictHire</span>
// //       </div>

// //       {/* Navigation Links */}
// //       <div className="hidden md:flex space-x-6 text-white">
// //         <div className="group relative">
// //           <button className="hover:underline">Products ▾</button>
// //           {/* Dropdown content can be added here */}
// //         </div>
// //         <div className="group relative">
// //           <button className="hover:underline">ATS Resume ▾</button>
// //         </div>
// //         <div className="group relative">
// //           <button className="hover:underline">Cover Letter ▾</button>
// //         </div>
// //         <div className="group relative">
// //           <button className="hover:underline">LinkedIn ▾</button>
// //         </div>
// //         <button className="hover:underline">Pricing</button>
// //         <div className="group relative">
// //           <button className="hover:underline">Resources ▾</button>
// //         </div>
// //         <button className="hover:underline">Organizations</button>
// //       </div>

// //       {/* Search Icon & Buttons */}
// //       <div className="flex items-center space-x-4">
// //         <button className="text-white">
// //           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg> {/* You can replace this with an actual icon */}
// //         </button>
// //         <Link>
// //         <button className="bg-blue-700 text-white px-4 py-2 rounded-md" href="/login">
// //           Log In
// //         </button>
// //         </Link>
// //         <button className="bg-white text-blue-700 px-4 py-2 rounded-md border border-blue-700">
// //           Sign Up
// //         </button>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;
// 'use client'
// import Link from 'next/link';
// import React from 'react'

// const Navbar = () => {
//   return (
//     <>
//   {/* ========== HEADER ========== */}
//   <header className="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
//     <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center gap-x-1">
//         <a
//           className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
//           href="#"
//           aria-label="Brand"
//         >
//           PredictHire
//         </a>
//         {/* Collapse Button */}
//         <button
//           type="button"
//           className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//           id="hs-header-base-collapse"
//           aria-expanded="false"
//           aria-controls="hs-header-base"
//           aria-label="Toggle navigation"
//           data-hs-collapse="#hs-header-base"
//         >
//           <svg
//             className="hs-collapse-open:hidden size-4"
//             xmlns="http://www.w3.org/2000/svg"
//             width={24}
//             height={24}
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1={3} x2={21} y1={6} y2={6} />
//             <line x1={3} x2={21} y1={12} y2={12} />
//             <line x1={3} x2={21} y1={18} y2={18} />
//           </svg>
//           <svg
//             className="hs-collapse-open:block shrink-0 hidden size-4"
//             xmlns="http://www.w3.org/2000/svg"
//             width={24}
//             height={24}
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M18 6 6 18" />
//             <path d="m6 6 12 12" />
//           </svg>
//           <span className="sr-only">Toggle navigation</span>
//         </button>
//         {/* End Collapse Button */}
//       </div>
//       {/* Collapse */}
//       <div
//         id="hs-header-base"
//         className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "
//         aria-labelledby="hs-header-base-collapse"
//       >
//         <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
//           <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
//             <div className="grow">
//               <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
//                 <Link
//                   className="p-2 flex items-center text-sm bg-gray-100 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                   href="/"
//                   aria-current="page"
//                 >
//                   <svg
//                     className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={24}
//                     height={24}
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
//                     <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//                   </svg>
//                   Home
//                 </Link>
//                 {/* <Link
//                   className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                   href="/login"
//                 >
//                   <svg
//                     className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={24}
//                     height={24}
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//                     <circle cx={12} cy={7} r={4} />
//                   </svg>
//                   Login
//                 </Link> */}
//                 <a
//                   className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                   href="#"
//                 >
//                   <svg
//                     className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={24}
//                     height={24}
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M12 12h.01" />
//                     <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
//                     <path d="M22 13a18.15 18.15 0 0 1-20 0" />
//                     <rect width={20} height={14} x={2} y={6} rx={2} />
//                   </svg>
//                   Work
//                 </a>
//                 <a
//                   className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                   href="#"
//                 >
//                   <svg
//                     className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={24}
//                     height={24}
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
//                     <path d="M18 14h-8" />
//                     <path d="M15 18h-5" />
//                     <path d="M10 6h8v4h-8V6Z" />
//                   </svg>
//                   Blog
//                 </a>
                

//               </div>
//             </div>
//             <div className="my-2 md:my-0 md:mx-2">
//               <div className="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300 dark:bg-neutral-700" />
//             </div>
//             {/* Button Group */}
//             <div className=" flex flex-wrap items-center gap-x-1.5">
//               <a
//                 className="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                 href="/login"
//               >
//                 Login
//               </a>
//               <a
//                 className="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-600"
//                 href="/signup"
//               >
//                 Sign Up
//               </a>
              

//             </div>
//             {/* End Button Group */}
//           </div>
//         </div>
//       </div>
//       {/* End Collapse */}
//     </nav>
//   </header>
//   {/* ========== END HEADER ========== */}
// </>

//   )
// }

// export default Navbar;