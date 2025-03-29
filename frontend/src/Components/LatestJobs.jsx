import React from 'react'
import LatestJobCard from '../Components/LatestJobCards';
import { useSelector } from 'react-redux'


const LatestJobs = () => {
    const {alljob} = useSelector(store=>store.jobs)
    
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span>Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>

                {
                    alljob.slice(0,6).map((jobs) => (
                        <LatestJobCard    key={jobs._id}  jobs ={jobs} />
                    ))
                }

            </div>
        </div>
    )
}

export default LatestJobs