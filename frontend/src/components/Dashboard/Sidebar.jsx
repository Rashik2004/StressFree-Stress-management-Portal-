import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutGrid, Brain, Book, Users, Settings, LogOut, Home, Heart } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutGrid, label: "Dashboard", path: "/dashboard" },
    { icon: Brain, label: "Meditations", path: "/meditations" },
    { icon: Book, label: "Journal", path: "/journal" },
    { icon: Heart, label: "Contribute", path: "/contribution" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-20 lg:w-64 bg-surface border-r border-primary/5 flex flex-col justify-between py-8 px-4 z-50 transition-all duration-300">

      {/* Logo Area */}
      <div className="flex justify-center lg:justify-start lg:px-4 mb-12">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-xl">
          SF
        </div>
        <span className="hidden lg:block ml-3 text-xl font-serif font-bold text-primary self-center">
            StressFree
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-center lg:justify-start gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
              ${isActive
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'text-primary/60 hover:bg-primary/10 hover:text-primary'
              }
            `}
          >
            <item.icon size={22} strokeWidth={2} />
            <span className="hidden lg:block font-bold text-sm tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="border-t border-primary/10 pt-6 space-y-4">
        <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center lg:justify-start gap-4 px-4 py-3 text-red-400 hover:bg-red-50 rounded-2xl transition-colors"
        >
            <LogOut size={22} />
            <span className="hidden lg:block font-bold text-sm">Logout</span>
        </button>

        <Link to="/profile" className="flex items-center gap-3 px-2 hover:bg-primary/5 p-2 rounded-2xl transition-colors cursor-pointer">
             <div className="w-10 h-10 rounded-full bg-accent overflow-hidden border-2 border-surface shadow-sm flex-shrink-0 flex items-center justify-center font-bold text-primary">
                 {user?.name?.charAt(0) || 'U'}
             </div>
             <div className="hidden lg:block overflow-hidden">
                 <p className="text-sm font-bold text-primary truncate">{user?.name || 'User'}</p>
                 <p className="text-xs text-primary/50 truncate">Account Settings</p>
             </div>
        </Link>
      </div>

    </aside>
  );
};

export default Sidebar;
