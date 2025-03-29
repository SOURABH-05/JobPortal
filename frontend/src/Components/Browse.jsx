import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/Hooks/useGetAllJobs';
import { setSearchQuery } from '@/redux/jobslice';

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]); // Added dispatch to dependency array

  const { alljob } = useSelector(store => store.jobs);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({alljob.length})</h1>

        {alljob.length === 0 ? ( 
          <div className="text-center text-gray-500 text-lg mt-10">
            🚀 No jobs found. Try searching for a different keyword!
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {alljob.map((jobs) => (
              <div key={jobs.id}> {/* Added key prop */}
                <Job jobs={jobs} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
