"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {data } from "./constant/index"
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Twitter } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Instagram } from "lucide-react";
import { usePathname } from 'next/navigation';
import Header from "./components.tsx/Header";

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
    <div className="h-[100dvh] w-screen dark:bg-brand-black  ">
      
      <div className="max-w-screen-lg mx-auto h-full w-full p-4 lg:p-6 flex flex-col">
          
          <Header/>

          {/* Desktop Screen */}
          <div className="lg:flex flex-col hidden h-full w-full">
              {/* Upper Wrapper */}
              <div className="w-full h-5/12 flex flex-col justify-end relative">
                <div className="absolute -bottom-4 z-10">
                  <div className="text-8xl font-black dark:text-brand-light-gray">Software</div>
                  <div className="text-8xl font-black dark:text-brand-light-gray w-full">Engineer & Designer</div>
                </div>
                  
              </div>

              {/* Lower Wrapper */}
              <div className=" h-7/12 flex relative items-center max-h-70">
                <div className="w-5/12 h-full flex gap-6">
                  
                  {/* Socials */}
                  <div className="w-1/7 h-3/5  flex flex-col justify-end self-center gap-4">
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
                  
                  {/* Images slider */}
                  <div className="w-4/5 bg-gray-300 overflow-hidden relative rounded-3xl">
                    <AnimatePresence mode="wait">
                      {/* Previous image (stays visible until covered) */}
                      <motion.img
                        key={`bg-${index}`}
                        src={data[(index - 1 + data.length) % data.length].img}
                        className="absolute w-full h-full object-cover cursor-pointer "
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
                    </AnimatePresence>

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/30 via-[#4d4d4d]/50 to-transparent" />

                    <div className="absolute bottom-0 p-6 ">
                      <div className="uppercase text-brand-light-gray">page</div>
                      {data.map(({title, tags}, i) => 
                        i === index ? (
                          <div key={index} className="flex flex-col gap-4">
                            <AnimatePresence mode="wait">
                              <motion.h1 className=" font-black capitalize text-white text-2xl"
                                initial={{ translateY: 10, opacity:0}}
                                animate={{ translateY: 0, opacity:1 }}
                                exit={{ translateY: 0, opacity:1 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                              >{title}
                              </motion.h1>
                            </AnimatePresence>

                            
                        
                              {tags.map((tag) => (
                                <div key={tag} className='bg-brand-dark-gray pl-4 pr-4 p-1 rounded-full text-brand-light-gray capitalize z-10 text-[16px]'>
                                  {tag}
                                </div>
                              ))}
                              
                          </div>
                          
                        ) : null
                      )}

                      
                    </div>

                    {/* rings */}
                    <div className='absolute bottom-4 right-4 '>
                        {/* <svg
                          className="w-8 h-8 rotate-[-90deg]" // 32px = 8 * 4 in Tailwind
                          viewBox="0 0 32 32"
                        > */}
                          {/* Background circle */}
                          {/* <circle
                            cx="16"
                            cy="16"
                            r={radius}
                            stroke="gray"
                            strokeWidth="3"
                            fill="transparent"
                            opacity="0.5"
                          /> */}
                          {/* Animated circle */}
                          {/* <motion.circle
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
                          /> */}
                        {/* </svg> */}
                    </div>
                  </div>
                </div>


                {/* Video & Description & CTA */}
                <div className="w-8/12 h-3/5 absolute right-0 flex gap-4">
                
                  {/* Video */}
                  <div className="w-4/10 h-full bg-amber-200 rounded-2xl"></div>

                  {/* //description & CTA */}
                  <div className="w-6/10 h-full  flex justify-end flex-col gap-3">
                    {data.map(({description}, i) => 
                    i === index ?(
                      <motion.div key={i} className="dark:text-brand-light-gray"
                        initial={{ translateY: 10, opacity:0}}
                        animate={{ translateY: 0, opacity:1 }}
                        exit={{ translateY: 0, opacity:1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      >{description}</motion.div>
                    ) : null)}

                    <div className="flex gap-2 items-center -mb-1">
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
                </div>
              </div>
          </div>
          
          {/* Mobile screen */}
          <div className="lg:hidden flex flex-col gap-6 w-full justify-center flex-1 ">
            <div className="gap-4 flex flex-col items-center justify-center flex-1 rounded-3xl">
              <div className="relative w-full max-w-xl h-80 mx-auto overflow-hidden rounded-3xl  bg-black">
                <AnimatePresence mode="wait">
                  {/* Previous image (stays visible until covered) */}
                  <motion.img
                    key={`bg-${index}`}
                    src={data[(index - 1 + data.length) % data.length].img}
                    className="absolute w-full h-full object-cover cursor-pointer rounded-3xl "
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  />

                  {/* New image grows from left */}
                  <motion.img
                    key={data[index].id}
                    src={data[index].img}
                    // initial={{ scaleX: 0, originX: 0 }}
                    // animate={{ scaleX: 1 }}
                    // exit={{ scaleX: 1 }}
                    // transition={{ duration: 1, ease: "easeInOut" }}
                    initial={{ translateY: 10, opacity:0}}
                    animate={{ translateY: 0, opacity:1 }}
                    exit={{ translateY: 0, opacity:1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute w-full h-full object-cover cursor-pointer rounded-3xl "
                  />
                </AnimatePresence>

                {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/30 via-[#4d4d4d]/50 to-transparent" />
    
                  <div className="absolute bottom-0 p-6 ">
                    <div className="uppercase text-brand-light-gray">page</div>
                    {data.map(({title, tags}, i) => 
                      i === index ? (
                        <div key={index} className="flex flex-col gap-4">
                          <AnimatePresence mode="wait">
                            <motion.h1 className=" font-black capitalize text-white text-2xl"
                              initial={{ translateY: 10, opacity:0}}
                              animate={{ translateY: 0, opacity:1 }}
                              exit={{ translateY: 0, opacity:1 }}
                              transition={{ duration: 1, ease: "easeInOut" }}
                            >{title}
                            </motion.h1>
                          </AnimatePresence>
    
                          
                      
                            {tags.map((tag) => (
                              <div key={tag} className='bg-brand-dark-gray pl-4 pr-4 p-1 rounded-full text-brand-light-gray capitalize z-10 text-[16px]'>
                                {tag}
                              </div>
                            ))}
                            
                        </div>
                        
                      ) : null
                    )}
    
                    
                  </div>
    
                  {/* rings */}
                  <div className='absolute bottom-6 right-6 '>
                    <svg
                      className="w-6 h-6 rotate-[-90deg]" // 32px = 8 * 4 in Tailwind
                      viewBox="0 0 32 32"
                    >
                      {/* Background circle */}
                      <circle
                        cx="16"
                        cy="16"
                        r={radius}
                        stroke="gray"
                        strokeWidth="4"
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

              {/* CTA */}
              <div className="flex gap-2 w-full ">
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

            {/* Centered social icons */}
            <div className="flex flex-row gap-12 items-center justify-center ">
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
      </div>

    </div>
  );
}
