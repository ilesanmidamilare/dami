"use client"

import React from 'react'
import {useEffect, useState} from 'react'
import { motion} from "framer-motion";
import Link from 'next/link';
import Logo from '../../../public/assets/svgs/Logo'


const Header = () => {

      const [clicked, setClicked] = useState(false);
      const [index, setIndex] = useState(0);
    
      const radius = 14; // circle radius
      const circumference = 2 * Math.PI * radius; // circle perimeter
    
      const [dropDown, setDropDown] = useState(false);
        const [theme, setTheme] = useState("light");

    
      // Auto slide every 4 seconds
        useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) {
          setTheme(saved);
          document.documentElement.setAttribute("data-theme", saved);
        } else {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          const defaultTheme = prefersDark ? "dark" : "light";
          setTheme(defaultTheme);
          document.documentElement.setAttribute("data-theme", defaultTheme);
        }
      }, []);
    
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }, [theme]);
    
  return (
    <header className='flex h-6 '>

            { dropDown 
              ? <button 
                className="flex cursor-pointer z-50"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <div className=' h-5 w-2.5  bg-brand-light-gray  rounded-l-full dark:bg-brand-dark-gray border-l-2 border-t-2 border-b-2 dark:border-brand-light-gray'/>
                <div className=' h-5 w-2.5   bg-brand-dark-gray rounded-r-full dark:bg-brand-light-gray  '/>
              </button>

              : <Link href={'/'} passHref>
                  <Logo className="w-6 h-auto text-[#4d4d4d] hover:text-brand-orange dark:text-brand-light-gray" />
                </Link>
            }
            
                
            <motion.button
                onClick={() => {setClicked(!clicked); setDropDown(!dropDown)}}
                className="relative flex flex-col justify-center items-center w-8 h-6 cursor-pointer z-50 ml-auto"
              >
                {/* Top line */}
                <motion.span
                  className="absolute h-0.5 w-8 bg-brand-dark-gray dark:bg-brand-light-gray"
                  animate={{
                    rotate: clicked ? 45 : 0,
                    y: clicked ? 0 : -6,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Middle line */}
                <motion.span
                  className="absolute h-0.5 w-8 bg-brand-dark-gray dark:bg-brand-light-gray"
                  animate={{
                    opacity: clicked ? 0 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />

                {/* Bottom line */}
                <motion.span
                  className="absolute h-0.5 w-8 bg-brand-dark-gray dark:bg-brand-light-gray"
                  animate={{
                    rotate: clicked ? -45 : 0,
                    y: clicked ? 0 : 6,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
            </motion.button>
            {
              dropDown && 
              <div className="p-4 lg:p-6 absolute bg-brand-light-gray h-full dark:bg-brand-dark-gray top-0, left-0 right-0 bottom-0 gap-10  z-40 flex flex-col">
                <div className="text-2xl lg:text-8xl font-black flex flex-col items-center gap-6 lg:gap-4  flex-1 dark:text-brand-light-gray justify-center h-full">
                  <Link href="/" className=" hover:text-brand-orange">Home</Link>
                  <Link href="/about"  className=" hover:text-brand-orange">About me</Link>
                  <Link href="/projects"  className=" hover:text-brand-orange">Projects</Link>
                  <Link href="/contact"  className=" hover:text-brand-orange">Contact</Link>
                  <Link href="/resume"  className=" hover:text-brand-orange">Resume</Link>
                </div>
              </div>
            }
          </header>
  )
}

export default Header