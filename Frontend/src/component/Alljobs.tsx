import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface Job {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  tags: string[];
  location: string;
  type: string;
  postDate: string;
}

const AllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs/alljobs');
        setJobs(res.data.jobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId: string) => {
    const token = localStorage.getItem('authToken'); // ✅ Corrected key
    if (!token) {
      alert('You are not logged in. Please login to apply.');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/jobs/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (err: unknown) {
      console.error('Application failed:', err);
      interface AxiosError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        (err as AxiosError).response?.data?.message
      ) {
        alert((err as AxiosError).response!.data!.message!);
      } else {
        alert('Something went wrong during job application.');
      }
    }
  };

  const daysAgo = (dateStr: string): string => {
    const postDate = new Date(dateStr);
    const diffTime = Math.abs(new Date().getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-[#e0ffe0] border border-[#00ffae] rounded-lg p-5 shadow-lg relative transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-semibold text-[#007755]">{job.jobTitle}</h2>
            <button className="text-gray-600 hover:text-red-500 text-xl">♡</button>
          </div>
          <p className="text-gray-700 mt-2 text-sm">
            {job.jobDescription.substring(0, 120)}...
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {job.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
              {job.type}
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FaClock /> {daysAgo(job.postDate)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-md text-sm hover:bg-blue-300 disabled:opacity-50"
                onClick={() => handleApply(job._id)}
                disabled={appliedJobs.includes(job._id)}
              >
                {appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}
              </button>

              <button className="bg-red-200 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-300">
                Report
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllJobs;
