import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllJob } from "@/redux/jobslice";
import { JOB_API_END_POINT } from "@/Constent/contest.js";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(store => store.jobs);

  const fetchAllJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/getalljobs?keyword=${searchQuery}`, { withCredentials: true });

      if (res.data.success) {
        dispatch(setAllJob(res.data.jobs)); // Dispatch jobs to Redux store
      } else {
        console.error("Failed to fetch jobs:", res.data.message); // Handle failure
      }
    } catch (error) {
      console.error("Error fetching jobs:", error); // Log any error
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAllJobs(); // Call fetchAllJobs when the component mounts
  }, [fetchAllJobs]); // Re-run the effect if fetchAllJobs changes

};

export default useGetAllJobs;
