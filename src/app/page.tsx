"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {data } from "./constant/index"
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '../../public/assets/svgs/Logo'
import { Twitter } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Instagram } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [index, setIndex] = useState(0);

  const radius = 14; // circle radius
  const circumference = 2 * Math.PI * radius; // circle perimeter

  const [dropDown, setDropDown] = useState(false);
    const [theme, setTheme] = useState("light");
    const pathname = usePathname();
    console.log(pathname)
    if(pathname === '/'){
      console.log('Home')
    } else {
      console.log('Not Home')
    }

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % data.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="h-[100dvh] w-screen flex flex-col p-4 justify-center dark:bg-brand-black">

      <header className='flex h-6 justify-between'>
        <Link href={'/'} passHref>
          <Logo className="w-6 h-auto text-[#4d4d4d] hover:text-brand-orange dark:text-brand-light-gray" />
        </Link>
              
      
        {/* <motion.button 
            className='flex flex-col gap-1 items-end cursor-pointer justify-center hover:bg-brand-orange'
            onClick={() => {setClicked(!clicked); setDropDown(!dropDown) }}
          >
            <motion.div 
            className= { 'w-8 h-0.5 bg-brand-dark-gray dark:bg-brand-light-gray '}
              initial={{
                translateY: 0
              }}
              animate={{
                translateY: clicked ? 4 : 0,
                opacity: clicked ? 0 : 1
              }}

              transition={{
                duration: 0.5,
                type: 'spring',
                ease:'easeInOut'
              }}
            />
            <motion.div 
                className={ 'w-10 h-0.5 bg-brand-dark-gray dark:bg-brand-light-gray'}

                initial={{
                  width: '40px'
                }}
                animate={{
                  width: clicked ? '30px' : '40px'
                }}
                transition={{
                duration: 0.5,
                type: 'spring',
                ease:'easeInOut'
              }}
            />
            <motion.div 
              className={ 'w-6 h-0.5 bg-brand-dark-gray dark:bg-brand-light-gray'}

              initial={{
                translateY: 0
              }}
              animate={{
                translateY: clicked ? -4 : 0,
                opacity: clicked ? 0 : 1
              }}

              transition={{
                duration: 0.5,
                type: 'spring',
                ease:'easeInOut'
              }}
            />
        </motion.button> */}
        <motion.button
            onClick={() => {setClicked(!clicked); setDropDown(!dropDown)}}

            className="relative flex flex-col justify-center items-end w-6 h-6 cursor-pointer"
          >
            {/* Top line */}
            <motion.span
              className="absolute h-0.5 w-8 bg-brand-dark-gray dark:bg-brand-light-gray z-20"
              animate={{
                rotate: clicked ? 45 : 0,
                y: clicked ? 0 : -6,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Middle line */}
            <motion.span
              className="absolute h-0.5 w-10 bg-brand-dark-gray dark:bg-brand-light-gray"
              animate={{
                opacity: clicked ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Bottom line */}
            <motion.span
              className="absolute h-0.5 w-6 bg-brand-dark-gray dark:bg-brand-light-gray"
              animate={{
                rotate: clicked ? -45 : 0,
                y: clicked ? 0 : 6,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
        </motion.button>

         {
            dropDown && 
            <div className="p-4 lg:p-8  absolute w-full  lg:w-1/3 h-full bg-brand-light-gray dark:bg-brand-dark-gray top-0, lg:right-30 left-0 right-0 bottom-0 gap-10 lg:gap-20 z-40 flex flex-col lg:ml-auto">
              <div className="flex justify-between items-center h-6">
                <button 
                  className="flex cursor-pointer"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <div className=' h-5 w-2.5  bg-brand-light-gray  rounded-l-full dark:bg-brand-dark-gray border-l-2 border-t-2 border-b-2 dark:border-brand-light-gray'/>
                  <div className=' h-5 w-2.5   bg-brand-dark-gray rounded-r-full dark:bg-brand-light-gray  '/>
                </button>

                  <button 
                    className='flex flex-col gap-1 place-items-center hover:bg-amber-400 cursor-pointer'
                    onClick={() => setDropDown(prev => !prev)}
                  >
                    <div className= { 'w-10 h-0.5 bg-brand-900 dark:bg-brand-50'}/>
                    <div className={ 'w-8 h-0.5 bg-brand-900 dark:bg-brand-50'}/>
                    <div className={ 'w-10 h-0.5 bg-brand-900 dark:bg-brand-50'}/>
                  </button>
                
              </div>

              <div className="text-2xl font-black flex flex-col items-center lg:items-center gap-8 flex-1 dark:text-brand-light-gray ">
                <Link href="/" className=" hover:text-brand-orange">Home</Link>
                <Link href="/about"  className=" hover:text-brand-orange">About me</Link>
                <Link href=""  className=" hover:text-brand-orange">Projects</Link>
                <Link href=""  className=" hover:text-brand-orange">Contact</Link>
                <Link href="" className="dark:bg-brand-light-gray pl-10 pr-10 p-1 font-black  dark:text-brand-dark-gray uppercase hover:text-brand-orange text-brand-light-gray bg-brand-dark-gray">Resume</Link>
              </div>

              <div className=" flex-1 flex lg:justify-around gap-12 items-end justify-center  dark:border-brand-light-gray">
                  <Twitter className="dark:text-brand-light-gray cursor-pointer hover:text-brand-orange" size={24} />
                  <Linkedin className="dark:text-brand-light-gray cursor-pointer hover:text-brand-orange" size={24}/>
                  <Instagram  className="dark:text-brand-light-gray cursor-pointer hover:text-brand-orange" size={24}/>
              </div>
            </div>
          }
      </header>

      <div className="flex flex-col  flex-1 justify-center items-center gap-4">
        {/* //slides */}
        <div className="relative w-full max-w-2xl h-80 mx-auto overflow-hidden rounded-xl  bg-black">
          <AnimatePresence mode="wait">
            {/* Previous image (stays visible until covered) */}
            <motion.img
              key={`bg-${index}`}
              src={data[(index - 1 + data.length) % data.length].img}
              className="absolute w-full h-full object-cover cursor-pointer"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />

            {/* New image grows from left */}
            
            <motion.img
              key={data[index].id}
              src={data[index].img}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-full h-full object-cover cursor-pointer"
            />

            {/* Overlay gradient */}
            
          </AnimatePresence>

      
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 w-full max-w-2xl bottom-0 p-4">
            <div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/60 via-[#4d4d4d]/50 to-transparent" />
                <div className='uppercase text-white -mb-[4px]'>page</div>
                {data.map(({title, tags}, i) => 
                i === index ? (
                  <div key={index} className="flex flex-col gap-4">
                    <AnimatePresence mode="wait">
                      <motion.h1 className=" font-black capitalize text-2xl text-white "
                        initial={{ translateY: 10, opacity:0}}
                        animate={{ translateY: 0, opacity:1 }}
                        exit={{ translateY: 0, opacity:1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      >{title}
                      </motion.h1>
                    </AnimatePresence>

                    
                
                      {tags.map((tag) => (
                        <div key={tag} className='bg-brand-dark-gray pl-4 pr-4 p-1 rounded-full text-brand-light-gray capitalize z-10'>
                          {tag}
                        </div>
                      ))}
                      
                  </div>
                  
                ) : null
                )}
            </div>

            {/* ring */}
            <div className='absolute bottom-4 right-4'>
                <svg
                  className="w-8 h-8 rotate-[-90deg]" // 32px = 8 * 4 in Tailwind
                  viewBox="0 0 32 32"
                >
                  {/* Background circle */}
                  <circle
                    cx="16"
                    cy="16"
                    r={radius}
                    stroke="gray"
                    strokeWidth="3"
                    fill="transparent"
                    opacity="0.5"
                  />
                  {/* Animated circle */}
                  <motion.circle
                    cx="16"
                    cy="16"
                    r={radius}
                    stroke="white"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    animate={{
                      strokeDashoffset: [circumference, 0, circumference], // 0 → 360 → 0
                    }}
                    transition={{
                      duration: 10, // total cycle = 10s
                      times: [0, 0.5, 1.0], // forward = 5s, reverse = 5s
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
            </div>
          </div>
        </div>

        {/* CTA */}     
        <div className="flex gap-2 max-w-2xl w-full items-center">
          <div className='capitalize dark:text-brand-light-gray'>See more</div>
          {data.map(({title}, i) => 
            i === index ? (
              <Link href={''} key={index}>
                <motion.h1 className="font-black capitalize hover:text-brand-orange dark:text-brand-light-gray"
                  initial={{ translateY: 10, opacity:0}}
                  animate={{ translateY: 0, opacity:1 }}
                  exit={{ translateY: 0, opacity:1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >{title}
                </motion.h1>
              </Link>
            ) : null
          )}

         
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <ArrowRight className="text-brand-orange" size={20} />
          </motion.div>
        </div>
      </div> 

      <div className="flex  gap-12 items-end justify-center ">
        <Link passHref href="https://example.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="text-brand-dark-gray cursor-pointer hover:text-brand-orange dark:text-brand-light-gray" size={24} />
        </Link>
        <Link passHref href="https://example.com" target="_blank" rel="noopener noreferrer">
          <Linkedin className="text-brand-dark-gray cursor-pointer hover:text-brand-orange dark:text-brand-light-gray" size={24}/>
        </Link>
        <Link passHref href="https://example.com" target="_blank" rel="noopener noreferrer">
          <Instagram  className="text-brand-dark-gray cursor-pointer hover:text-brand-orange dark:text-brand-light-gray" size={24}/>
        </Link>
      </div>

    </div>
  );
}
