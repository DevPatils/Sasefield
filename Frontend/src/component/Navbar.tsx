import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();
  const location = useLocation();

  // Sync login state when route changes (optional but useful)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [location]);

  // Sync across browser tabs
  useEffect(() => {
    const syncLogout = () => {
      setIsLoggedIn(!!localStorage.getItem('authToken'));
    };
    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login'); // Optional: redirect after logout
  };

  return (
    <nav className="bg-green-400 px-8 py-4 flex items-center justify-between shadow-md border-b border-black">
      {/* Logo */}
      <div className="flex flex-col leading-tight">
        <span className="text-2xl font-bold text-black -mb-1">Nottingham</span>
        <span className="text-sm text-black tracking-tight">Building Society</span>
      </div>

      {/* Center Nav Links */}
      <div className="flex gap-8 items-center text-black font-medium">
        {['/', '/alljobs', '/about', '/contact'].map((path, idx) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `hover:text-blue-700 border-b-2 ${
                isActive ? 'text-blue-700 border-blue-700' : 'border-transparent'
              } transition`
            }
          >
            {['Home', 'Open Jobs', 'About Us', 'Contact Us'][idx]}
          </NavLink>
        ))}
      </div>

      {/* Right Auth Buttons */}
      <div className="space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Log out
          </button>
        ) : (
          <NavLink to="/signup">
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Sign up
            </button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
