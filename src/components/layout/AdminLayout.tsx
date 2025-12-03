import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { CommandConsole } from '../CommandConsole';

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/admin/dashboard', label: 'Dashboard', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      path: '/admin/profile', label: 'Profile', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      path: '/admin/projects', label: 'Projects', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      path: '/admin/skills', label: 'Skills', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      path: '/admin/experiences', label: 'Experience', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex h-screen" style={{ background: 'linear-gradient(135deg, #0A091A 0%, #1a1535 50%, #0A091A 100%)' }}>
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 backdrop-blur-xl border-r" style={{ background: 'rgba(10, 9, 26, 0.8)', borderColor: 'rgba(90, 107, 140, 0.3)' }}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b" style={{ borderColor: 'rgba(90, 107, 140, 0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3A7FFF, #A335E0)' }}>
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold" style={{ color: '#F0F0F0' }}>CodeFolio</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={isActive ? {
                  background: 'linear-gradient(90deg, #3A7FFF, #A335E0)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(58, 127, 255, 0.3)'
                } : { color: '#5A6B8C' }}
                onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = 'rgba(58, 127, 255, 0.1)')}
                onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(90, 107, 140, 0.3)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all duration-200"
            style={{ color: '#5A6B8C' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(163, 53, 224, 0.1)'; e.currentTarget.style.color = '#F0F0F0'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5A6B8C'; }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b backdrop-blur-xl" style={{ background: 'rgba(10, 9, 26, 0.5)', borderColor: 'rgba(90, 107, 140, 0.3)' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#5A6B8C' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(58, 127, 255, 0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold" style={{ color: '#F0F0F0' }}>
              {menuItems.find(item => location.pathname.startsWith(item.path))?.label || 'Dashboard'}
            </h1>
          </div>
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
            style={{ background: 'rgba(58, 127, 255, 0.1)', color: '#5A6B8C' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(58, 127, 255, 0.2)'; e.currentTarget.style.color = '#F0F0F0'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(58, 127, 255, 0.1)'; e.currentTarget.style.color = '#5A6B8C'; }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="font-medium hidden sm:inline">View Portfolio</span>
          </Link>
        </header>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <aside className="w-64 h-full backdrop-blur-xl" style={{ background: 'rgba(10, 9, 26, 0.95)' }} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between h-16 px-6 border-b" style={{ borderColor: 'rgba(90, 107, 140, 0.3)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3A7FFF, #A335E0)' }}>
                    <span className="text-lg font-bold text-white">C</span>
                  </div>
                  <span className="text-xl font-bold" style={{ color: '#F0F0F0' }}>CodeFolio</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: '#5A6B8C' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="px-4 py-6 space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path ||
                    (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                      style={isActive ? {
                        background: 'linear-gradient(90deg, #3A7FFF, #A335E0)',
                        color: '#FFFFFF'
                      } : { color: '#5A6B8C' }}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="px-4 border-t pt-4" style={{ borderColor: 'rgba(90, 107, 140, 0.3)' }}>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ color: '#5A6B8C' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <CommandConsole />
    </div>
  );
};
