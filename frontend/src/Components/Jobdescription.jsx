import { Badge } from './ui/badge';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobslice';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/Constent/contest';
import { toast } from 'sonner';

const Jobdescription = () => {
    const { singleJob } = useSelector(store => store.jobs);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;

    // Initialize isApplied state based on localStorage or redux job data
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        // Get the current 'applied' status from localStorage
        const storedApplicationStatus = localStorage.getItem(`applied-${jobId}-${user?.id}`) === 'true';

        // Set the initial state of 'isApplied' to the value in localStorage
        setIsApplied(storedApplicationStatus);

        // Fetch the job details from the API
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobbyid/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    // Update the Redux store with the fetched job data
                    dispatch(setSingleJob(res.data.job));

                    // After the job data is fetched, check if the current user has applied
                    const hasAlreadyApplied = res.data.job.applications.some(application => application.applicant === user?.id);
                    // Update 'isApplied' based on the job data fetched
                    setIsApplied(hasAlreadyApplied);

                    // Persist the application status in localStorage for future visits
                    localStorage.setItem(`applied-${jobId}-${user?.id}`, hasAlreadyApplied.toString());
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?.id]);

    const applyJobHandler = async () => {
        try {
            // Apply for the job via API
            const response = await axios.get(`${APPLICATION_API_END_POINT}/applyjob/${jobId}`, { withCredentials: true });
            if (response.data.success) {
                // Update state and Redux store after successful application
                setIsApplied(true);
                
                // Persist the applied status in localStorage
                localStorage.setItem(`applied-${jobId}-${user?.id}`, 'true');
                
                // Update the job data in Redux
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));  // Dispatch updated job to Redux store

                toast.success(response.data.message);  // Show success message
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 ">
            {/* Job Title & Button */}
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-900">{singleJob?.title}</h1>
                <Button
                    disabled={isApplied}  // Disable the button if the user has already applied
                    onClick={isApplied ? null : applyJobHandler}  // Prevent further click if already applied
                    className={`px-6 py-2 text-white text-sm font-medium rounded-lg transition-all duration-300 ease-in-out 
                    ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? "Already Applied" : "Apply Now"}  {/* Show different text based on application status */}
                </Button>
            </div>

            {/* Job Info Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded-full">{singleJob?.position}</Badge>
                <Badge className="text-[#F83002] font-bold bg-red-100 px-3 py-1 rounded-full"> {singleJob?.jobType} </Badge>
                <Badge className="text-[#7209b7] font-bold bg-purple-100 px-3 py-1 rounded-full">{singleJob?.salary} LPA</Badge>
            </div>

            {/* Job Description */}
            <h2 className="text-lg font-semibold mt-6 border-b pb-2 text-gray-900">{singleJob?.description}</h2>
            <div className="mt-4 space-y-3 text-gray-700">
                <p><span className="font-bold text-gray-900">Role:</span> <span className="ml-2">{singleJob?.title}</span></p>
                <p><span className="font-bold text-gray-900">Location:</span> <span className="ml-2">{singleJob?.location}</span></p>
                <p><span className="font-bold text-gray-900">Description:</span> <span className="ml-2">{singleJob?.description}</span></p>
                <p><span className="font-bold text-gray-900">Experience:</span> <span className="ml-2">{singleJob?.experience}</span></p>
                <p><span className="font-bold text-gray-900">Salary:</span> <span className="ml-2">{singleJob?.salary} LPA</span></p>
                <p><span className="font-bold text-gray-900">Total Applicants:</span> <span className="ml-2">{singleJob?.applications?.length}</span></p>
                <p>
                    <span className="font-bold text-gray-900">Posted Date:</span>
                    <span className="ml-2">
                        {singleJob?.createdAt && typeof singleJob.createdAt === 'string'
                            ? singleJob.createdAt.split("T")[0]
                            : "Date not available"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Jobdescription;
