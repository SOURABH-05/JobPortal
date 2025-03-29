import { Job } from "../Model/job.model.js";

export const jobPost = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Check if all required fields are provided
        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId) {
            return res.status(400).json({
                message: "Please fill all required fields",
                success: false,
            });
        }

        // Validate salary is a valid number
        const parsedSalary = Number(salary);
        if (isNaN(parsedSalary)) {
            return res.status(400).json({
                message: "Salary must be a valid number",
                success: false,
            });
        }

        // Validate that requirements are in correct format (comma-separated string)
        const requirementsArray = requirements.split(",");
        if (requirementsArray.length === 0) {
            return res.status(400).json({
                message: "Requirements should be a non-empty comma-separated list",
                success: false,
            });
        }

        // Create the job posting
        const job = await Job.create({
            title,
            description,
            requirements: requirementsArray,
            salary: parsedSalary,
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: "Job created successfully",
            success: true,
            job,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error, please try again later",
            success: false,
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { DecompressionStream: { $regex: keyword, $options: "i" } },
            ]

        }
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAT:-1})
        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false,
            });
        }

        return res.status(201).json({

            success: true,
            jobs,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Server error, please try again later",
            success: false,
        });
    }

}

export const getJobById = async (req, res) => {

    try {
        const jobId = req.params.id

        const job = await Job.findById(jobId).populate({
            path:"applications"
        })
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false,
            });
        }
        return res.status(201).json({

            success: true,
            job,
        })

    } catch (error) {

    }


}

export const getAdminJobs = async (req, res) => {
    try {
      const  adminId = req.id
        const adminjobs = await Job.find({ created_by: adminId }).populate({
            path:"company"
        })
        if (!adminjobs) {
            return res.status(400).json({
                message: "Job not found",
                success: false,
            });
        }
            return res.status(201).json({

                success: true,
                adminjobs
            });
        } catch (error) {
            console.log(error)
                return res.status(400).json({
                    message: "Server error, please try again later",
                    success: false,
                });
        
    }
}