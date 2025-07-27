import React, { useState, useEffect } from 'react';
import profile from "../Pages/profile.png";

export default function StudentDashboard() {
  const [searchData, setSearchData] = useState({
    jobTitle: '',
    location: '',
    dateOfPosting: '',
    typeOfEmployment: '',
    workExperience: '',
    salary: ''
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        setUserInfo({
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email
        });
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // Fallback to default values if parsing fails
      setUserInfo({
        name: 'User',
        email: 'user@example.com'
      });
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    console.log('Search data:', searchData);
    // Add search functionality here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-green-400 shadow-xl">
        <div className="p-6">
          {/* Profile Section */}
          <div className="bg-green-500 rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full mb-4 overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={profile} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-bold text-lg">{userInfo.name}</h3>
              <p className="text-green-100 text-sm">{userInfo.email}</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-3">
            <div className="bg-green-500 flex items-center p-4 text-white rounded-xl cursor-pointer shadow-md hover:bg-green-600 transition duration-300">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="font-medium">Search Job</span>
            </div>

            <div className="flex items-center p-4 text-white rounded-xl cursor-pointer hover:bg-green-500 transition duration-300">
              <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-medium">Favorites</span>
            </div>

            <div className="flex items-center p-4 text-white rounded-xl cursor-pointer hover:bg-green-500 transition duration-300">
              <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="font-medium">Interview prep</span>
            </div>

            <div className="flex items-center p-4 text-white rounded-xl cursor-pointer hover:bg-green-500 transition duration-300">
              <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-medium">Dashboards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 px-10 py-12 border-b border-green-200">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-3 leading-tight">
              Find the <span className="text-green-600">most exciting</span>
            </h1>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">remote-friendly jobs</h1>
            <p className="text-gray-700 text-lg max-w-2xl leading-relaxed">
              Jobseek is our love letter to find remote or onsite work with 45,000+ Jobs. 
              Unlock your new career working from anywhere in the world
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-10 py-8">
          {/* Search Section */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Search</h2>
            
            {/* Search Inputs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-1 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title or Keyword</label>
                <svg className="w-5 h-5 absolute left-3 top-11 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="jobTitle"
                  value={searchData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Developer"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                />
              </div>
              
              <div className="lg:col-span-1 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <svg className="w-5 h-5 absolute left-3 top-11 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  name="location"
                  value={searchData.location}
                  onChange={handleInputChange}
                  placeholder="Anywhere"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                />
              </div>

              <div className="lg:col-span-1 flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Search Jobs
                </button>
              </div>
            </div>

            {/* Filters Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Posted</label>
                  <select
                    name="dateOfPosting"
                    value={searchData.dateOfPosting}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Any time</option>
                    <option value="today">Today</option>
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                  <select
                    name="typeOfEmployment"
                    value={searchData.typeOfEmployment}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    name="workExperience"
                    value={searchData.workExperience}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Any level</option>
                    <option value="entry">Entry level</option>
                    <option value="mid">Mid level</option>
                    <option value="senior">Senior level</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <select
                    name="salary"
                    value={searchData.salary}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Any salary</option>
                    <option value="0-30k">£0 - £30,000</option>
                    <option value="30-50k">£30,000 - £50,000</option>
                    <option value="50-70k">£50,000 - £70,000</option>
                    <option value="70k+">£70,000+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Resume Section */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Upload your resume</h2>
                <p className="text-gray-600 text-lg">Upload your CV to get personalized job matches and increase your visibility to employers</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                  Upload CV
                </button>
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}