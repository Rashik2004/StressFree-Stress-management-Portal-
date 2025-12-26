import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { LogOut, Search, Bell, Menu, X, User, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children, mobile }) => {
  const { currentTheme } = useContext(ThemeContext);
  return (
  <li>
    <Link
      to={to}
      className={`relative font-medium tracking-wide transition-colors duration-200
        ${mobile
            ? 'text-2xl text-primary block py-2'
            : "text-primary-foreground/90 hover:text-accent text-sm after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
        }`}
    >
      {children}
    </Link>
  </li>
)};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { themes, setManualTheme, currentTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <nav className="fixed top-6 inset-x-0 mx-auto w-[95%] max-w-7xl bg-primary rounded-full px-6 py-3 flex justify-between items-center shadow-2xl z-50 transition-colors duration-500">

      {/* 1. Left Section: Logo */}
      <div className="flex items-center shrink-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">SF</span>
            </div>
            <span className="text-primary-foreground font-bold text-xl tracking-wide hidden sm:block">StressFree</span>
        </Link>
      </div>

      {/* 2. Center Section: Desktop Links (Absolute Center) */}
      <ul className={`hidden lg:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {user ? (
                // Authenticated Links
                <>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/meditations">Meditate</NavLink>
                    <NavLink to="/dashboard">Progress</NavLink>
                    <NavLink to="/contribution">Contribute</NavLink>
                </>
            ) : (
                // Public Links
                <>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/meditations">Meditate</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/contribution">Contribute</NavLink>
                </>
            )}
      </ul>

      {/* 3. Right Section: Actions + Auth + Mobile Toggle */}
      <div className="flex items-center gap-4 shrink-0">

        {/* Theme Picker */}
        <div className="relative">
            <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="text-primary-foreground hover:text-white transition-opacity pt-1">
                <Palette size={18} />
            </button>
            <AnimatePresence>
                {isThemeMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-10 right-0 w-48 bg-surface rounded-xl shadow-xl border border-primary/10 overflow-hidden py-2"
                    >
                        {themes.map(t => (
                            <button
                                key={t.id}
                                onClick={() => { setManualTheme(t.id); setIsThemeMenuOpen(false); }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/5 transition-colors flex items-center justify-between group
                                    ${currentTheme === t.id ? 'font-bold text-primary' : 'text-primary/70'}
                                `}
                            >
                                <span>{t.name}</span>
                                {currentTheme === t.id && <div className="w-2 h-2 rounded-full bg-accent" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Search (Expandable) */}
        <div className={`flex items-center bg-primary-foreground/10 rounded-full transition-all duration-300 ${isSearchOpen ? 'w-48 px-3 py-1' : 'w-10 h-10 justify-center'}`}>
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-primary-foreground hover:text-white">
                <Search size={18} />
            </button>
            {isSearchOpen && (
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full placeholder-white/50"
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            navigate(`/meditations?search=${e.target.value}`);
                            setIsSearchOpen(false);
                        }
                    }}
                />
            )}
        </div>

        {/* Notifications (Auth Only) */}
        {user && (
            <button className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-primary" />
            </button>
        )}

        {/* Auth Buttons / Profile (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 ml-2">
            {user ? (
                <>
                   <Link to="/profile" className="flex items-center gap-2 pl-2 pr-1 py-1 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors">
                        <span className="text-primary-foreground text-sm font-bold pl-2">{user?.name?.split(' ')[0] || 'User'}</span>
                        <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-bold overflow-hidden">
                            {user?.profilePicture ? (
                                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                user?.name?.charAt(0) || 'U'
                            )}
                        </div>
                   </Link>
                </>
            ) : (
                <>
                    <Link to="/login" className="text-primary-foreground font-bold text-sm hover:text-white px-2">Login</Link>
                    <Link to="/register" className="bg-accent text-primary px-5 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-colors shadow-lg">
                        Sign Up
                    </Link>
                </>
            )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-primary-foreground hover:text-white"
        >
            <Menu size={24} />
        </button>
      </div>

    </nav>

    {/* Mobile Full Screen Menu Overlay */}
    <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 bg-background z-[60] p-6 flex flex-col"
            >
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                         <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">SF</div>
                         <span className="font-serif font-bold text-xl text-primary">Menu</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <ul className="flex flex-col gap-4 overflow-y-auto">
                    {user ? (
                        <>
                             <div className="flex items-center gap-4 mb-6 p-4 bg-surface rounded-2xl border border-primary/10">
                                <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xl overflow-hidden">
                                    {user?.profilePicture ? (
                                        <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user?.name?.charAt(0) || 'U'
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">{user?.name}</h3>
                                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-primary/60 underline">View Profile</Link>
                                </div>
                             </div>
                             <NavLink to="/" mobile onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
                             <NavLink to="/dashboard" mobile onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
                             <NavLink to="/meditations" mobile onClick={() => setIsMobileMenuOpen(false)}>Meditate</NavLink>
                             <NavLink to="/contribution" mobile onClick={() => setIsMobileMenuOpen(false)}>Contribute</NavLink>
                             <NavLink to="/profile/saved" mobile onClick={() => setIsMobileMenuOpen(false)}>Saved Sessions</NavLink>
                             <hr className="border-primary/10 my-2"/>
                             <button onClick={handleLogout} className="text-left text-2xl text-red-500 font-medium py-2 flex items-center gap-2">
                                <LogOut size={24} /> Logout
                             </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" mobile onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
                            <NavLink to="/meditations" mobile onClick={() => setIsMobileMenuOpen(false)}>Meditate</NavLink>
                            <NavLink to="/about" mobile onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
                            <NavLink to="/dashboard" mobile onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
                            <NavLink to="/contribution" mobile onClick={() => setIsMobileMenuOpen(false)}>Contribute</NavLink>
                            <hr className="border-primary/10 my-2"/>
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-3 rounded-xl bg-surface border border-primary text-primary font-bold mb-2">Login</Link>
                            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-3 rounded-xl bg-primary text-primary-foreground font-bold">Sign Up</Link>
                        </>
                    )}
                </ul>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;
