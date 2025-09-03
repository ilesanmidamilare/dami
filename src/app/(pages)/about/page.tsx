import Header from '../../components.tsx/Header'
import React from 'react'
import { Dribbble, Github } from 'lucide-react';
import Link from 'next/link';
import { about } from '../../constant/index'
import Image from "next/image";
import { techstack } from '../../constant/index';
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Marquee from '../../components.tsx/Marquee'



const About = () => {
  return (
    <div className='h-[100dvh]  dark:bg-brand-black flex'>
      <div className='max-w-screen-lg mx-auto w-full p-4 lg:p-6 flex flex-col'>
        
        <Header/>

        <div className='flex flex-col flex-1 justify-center'>
          <div className='font-black  mb-4 lg:text-2xl '>About me.</div>
          {/* //Des. */}
          <div className='gap-12 flex flex-col p-6 lg:p-12 bg-brand-light-gray/50 rounded-3xl lg:4/6 overflow-y-scroll h-100'
            style={{
              overflowX: 'scroll',       
              msOverflowStyle: 'none',    
              scrollbarWidth: 'none',
            }}
          >
            {about.map(({id, title, description, href, icon}) => {
              return (
                <div key={id} className='flex flex-col gap-4'>
                  <div className='text-2xl font-black lg:text-8xl flex-1'>{title}</div>
                  
                
                    <div>{description}</div>
                    <Link href={href} className=' font-black flex items-center gap-2 underline'>
                      <div>View</div>
                      {React.createElement(icon, { size: 16 })}
                    </Link>
                  
                </div>
              )
            })}

            <div className="flex gap-2 items-center mt-4 mb-4 underline">
              <div className="capitalize dark:text-brand-light-gray">
                Let’s continue to
              </div>

              <h1
                className="font-black capitalize hover:text-brand-orange dark:text-brand-light-gray"
                // initial={{ translateY: 10, opacity: 0 }}
                // animate={{ translateY: 0, opacity: 1 }}
                // exit={{ translateY: 0, opacity: 1 }}
                // transition={{ duration: 1, ease: "easeInOut" }}
              >
                Projects
              </h1>

              <div
                // animate={{ x: [0, 10, 0] }}
                // transition={{
                //   duration: 1,
                //   repeat: Infinity,
                //   repeatType: "loop",
                //   ease: "easeInOut",
                // }}
              >
                <ArrowRight className="text-brand-orange" size={20} />
              </div>
            </div>
             
          </div>

         
          
        </div>

        {/* //Logo */}
        {/* className='flex gap-8 lg:gap-16  items-end  overflow-scroll h-10' */}
        <div

            style={{
            overflowY: 'scroll',       
            msOverflowStyle: 'none',    
            scrollbarWidth: 'none',
          }}
        > 
        <Marquee pauseOnHover className="[--duration:0s] ">
          {techstack.map(({id, name}) => {
            return(
              <div key={id} className='flex-shrink-0 '> 
                <Image
                  src={`assets/logos/${name}.svg`}
                  width={40}
                  height={40}
                  alt={'expo'}
                  className='h-15 w-15 lg:h-10 lg:w-24 object-contain lg:ml-15'
                />
              </div>
            )
          })}
          
        </Marquee>
          
        </div>
      </div>

      
    </div>
  )
}

export default About