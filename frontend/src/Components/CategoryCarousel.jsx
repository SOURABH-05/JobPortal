import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from "@/components/ui/button";


import { setSearchQuery } from '@/redux/jobslice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'




const Category = [
    "frontend developer",
    "Backend developer",
    "Data Science",
    "ML Engineering",
    "graphic Deginer",
    "FullStack developer",
     "web developer",
    "full stack"


]


const CategoryCarousel = () => {

const navigate= useNavigate();
const dispatch= useDispatch();
    
const searchHandler = (query)=>{

    dispatch(setSearchQuery(query))
    navigate("/browse")

}
    return (
        <div>


            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>


                    {

                        Category.map((Cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">

                                <Button variant="outline" onClick={()=>searchHandler(Cat)} className="rounded-full  text-gray" >{Cat}</Button>
                            </CarouselItem>


                        ))
                    }

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>


        </div>
    )
}

export default CategoryCarousel