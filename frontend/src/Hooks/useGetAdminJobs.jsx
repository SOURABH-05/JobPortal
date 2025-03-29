import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setAdminJobs } from '@/redux/jobslice';
import { JOB_API_END_POINT } from '@/Constent/contest';

const useGetAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
    
  
      const fetchAdminJobs = async () => {
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
            withCredentials: true,
          });
         
          if (res.data.success) {
               dispatch(setAdminJobs(res.data.adminjobs))
          } else {
            console.error("Failed to fetch company:", res.data.message); // Handle failure
          }
        } catch (error) {
          console.error("Error fetching company:", error); // Log any error
        }
      };
  
      fetchAdminJobs(); // Call the function inside useEffect
    }, [dispatch]); // Add companyId to the dependency array
  
  };


export default useGetAdminJobs

