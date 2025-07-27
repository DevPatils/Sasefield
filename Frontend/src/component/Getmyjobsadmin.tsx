import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Applicant {
  _id: string;
  name: string;
  email: string;
}

interface Job {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  tags: string[];
  location: string;
  type: string;
  postDate: string;
  applicants: Applicant[];
}

const Getmyjobsadmin = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No auth token found');

        const res = await axios.get('http://localhost:5000/api/jobs/admin/my-jobs', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="text-center py-12 text-lg text-black">Loading your posted jobs...</div>;

  return (
    <div className="p-8 min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 border-b-4 border-black inline-block">My Posted Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border-2 border-black bg-white rounded-lg p-6 shadow-none hover:scale-105 transition-transform duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{job.jobTitle}</h2>
                <span className="text-xs text-gray-500">
                  {new Date(job.postDate).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-800 mb-4">{job.jobDescription}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#4bffa5] text-black text-xs px-2 py-1 rounded-full border border-black"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-700 mb-4 space-y-1">
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {job.applicants.length > 0
                    ? `${job.applicants.length} applicant(s)`
                    : 'No applicants yet'}
                </span>

                <button className="text-sm bg-[#4bffa5] text-black px-3 py-1 rounded border-2 border-black hover:bg-black hover:text-black transition-all duration-200">
                  View Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Getmyjobsadmin;
