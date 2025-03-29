import Navbar from '@/shared/Navbar'
import React, { useEffect, useState } from 'react'
import Job from '../Components/Job'
import FilterCard from '../Components/FilterCard'
import {  useSelector } from 'react-redux'



const Jobs = () => {
    const {alljob} = useSelector(store=>store.jobs)
    const { searchQuery } = useSelector(store => store.jobs);
    const [filterJob, setfilterJob] = useState(alljob);


     useEffect(()=>{
            if(searchQuery){
         const filteredJob = alljob.filter((job)=>{
            return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
         })
         setfilterJob(filteredJob)
            }

            else{
                setfilterJob(alljob)
            }
     },[searchQuery,alljob])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>

                        {filterJob.length === 0 ? (
                            <span>Job not found</span>
                        ) : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className='grid grid-cols-3 gap-4'>
                                {filterJob.map((jobs) => (
                                    <div>
                                        <Job key={jobs._id} jobs={jobs}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        )}
                    </div>

            </div>
        </div>
    )
}

export default Jobs
