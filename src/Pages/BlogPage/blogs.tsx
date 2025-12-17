import React from 'react'
import HeroSection from './Components/HeroSection'
import BlogFilterBar from './Components/filterSearchBar'
import CategoryCarousel from './Components/CategoryCarousal'
import BlogSection from './Components/blogSection'
import LatestPosts from './Components/LatestPosts'

function Blogs() {
  return (
    <div className='w-full h-fit flex flex-col items-center   min-h-screen bg-background z-0 no-scrollbar '>
        <HeroSection/>
        <BlogFilterBar/>
         <BlogSection/>
        {/* <CategoryCarousel/> */}
       
        <LatestPosts/>

    </div>
  )
}

export default Blogs