import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCompanies } from "@/redux/companyslice"; // Assuming this is the correct action
import { COMPANY_API_END_POINT } from "@/Constent/contest.js";

const useGetAllCompany = () => { // Accept companyId as a prop
  const dispatch = useDispatch();

  useEffect(() => {
  

    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getallcompany`, {
          withCredentials: true,
        });
        console.log(res)
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies)); // Dispatch the company data to Redux store
        } else {
          console.error("Failed to fetch company:", res.data.message); // Handle failure
        }
      } catch (error) {
        console.error("Error fetching company:", error); // Log any error
      }
    };

    fetchAllCompanies(); // Call the function inside useEffect
  }, [dispatch]); // Add companyId to the dependency array

};

export default useGetAllCompany;
