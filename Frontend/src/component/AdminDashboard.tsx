import React, { useState } from 'react';
import axios from 'axios';
import Getmyjobsadmin from './Getmyjobsadmin';

const AdminDashboard = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');
  const [message, setMessage] = useState('');
  const [activeView, setActiveView] = useState<'dashboard' | 'postJob' | 'manageJobs'>('dashboard');

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/jobs/post',
        {
          jobTitle,
          companyName,
          jobDescription,
          tags: tags.split(',').map(tag => tag.trim()),
          location,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setJobTitle('');
      setCompanyName('');
      setJobDescription('');
      setTags('');
      setLocation('');
      setType('Full-time');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error posting job:', error.response.data);
      } else {
        console.error('Error posting job:', error);
      }
      setMessage('Failed to post job');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#1C1C1C] text-white p-6 border-r-4 border-black flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold mb-8 text-[#4bffa5]">Admin Panel</h1>
        {['dashboard', 'postJob', 'manageJobs'].map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view as 'dashboard' | 'postJob' | 'manageJobs')}
            className={`px-4 py-2 rounded-lg shadow font-semibold border-2 border-black transition-all ${
              activeView === view
                ? 'bg-[#4BFFA5] text-black'
                : 'bg-white text-black hover:bg-[#c6fddf]'
            }`}
          >
            {view === 'dashboard' ? 'Dashboard' : view === 'postJob' ? 'Post Job' : 'Manage Jobs'}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-[#E0FFF4] overflow-y-auto">
        {activeView === 'dashboard' && (
          <div className="text-center mt-20 text-gray-700">
            <h2 className="text-4xl font-bold mb-4 text-[#00C896]">Welcome Admin 🚀</h2>
            <p className="text-xl text-[#1C1C1C]">Use the sidebar to manage job listings.</p>
          </div>
        )}

        {activeView === 'postJob' && (
          <form
            onSubmit={handlePostJob}
            className="bg-white border-2 border-black p-8 rounded-xl shadow-xl w-full max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#00C896]">Post a New Job</h2>

            {message && (
              <div className="mb-4 p-3 border-2 border-black rounded bg-[#ccffe2] text-black font-semibold">
                {message}
              </div>
            )}

            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-black rounded bg-[#f6fff9]"
              required
            />

            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-black rounded bg-[#f6fff9]"
              required
            />

            <textarea
              placeholder="Job Description"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-black rounded bg-[#f6fff9]"
              rows={5}
              required
            ></textarea>

            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-black rounded bg-[#f6fff9]"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-black rounded bg-[#f6fff9]"
              required
            />

            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-black rounded bg-[#f6fff9]"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
              <option value="internship">Internship</option>
            </select>

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded border-2 border-black hover:bg-white hover:text-black transition"
            >
              Post Job
            </button>
          </form>
        )}

        {activeView === 'manageJobs' && (
          <div className="mt-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#00C896]">Manage Posted Jobs</h2>
            <Getmyjobsadmin />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
