import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "@/redux/companyslice"; 
import { COMPANY_API_END_POINT } from "@/Constent/contest.js";

const useGetCompanyById = (companyId) => { // Pass companyId as a parameter
  const dispatch = useDispatch();
  const [company, setCompany] = useState(null); // Local state to store company data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) return; // Prevent fetching if companyId is not provided

    const fetchCompanyById = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getcompanybyid/${companyId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company)); // Update Redux store
          setCompany(res.data.company); // Store in local state
        } else {
          setError(res.data.message || "Failed to fetch company");
        }
      } catch (error) {
        setError(error.message || "Error fetching company");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyById();
  }, [dispatch, companyId]);

  return { company, loading, error }; // Return the fetched company data, loading state, and error
};

export default useGetCompanyById;
