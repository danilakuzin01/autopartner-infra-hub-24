
import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Settings, User, Database, Network, MessageSquare, List } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  to: string;
  active: boolean;
}

const SidebarItem = ({ icon: Icon, title, to, active }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-autopartner-light/20",
        active ? "bg-autopartner-light/30 text-autopartner-dark font-semibold" : "text-gray-600"
      )}
    >
      <Icon className={cn("h-5 w-5", active ? "text-autopartner-primary" : "text-gray-500")} />
      <span>{title}</span>
    </Link>
  );
};

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { title: 'Главная', to: '/dashboard', icon: List },
    { title: 'Оборудование', to: '/equipment', icon: Database },
    { title: 'Пользователи', to: '/users', icon: User },
    { title: 'Карта офиса', to: '/office-map', icon: Network },
    { title: 'Сообщения', to: '/messages', icon: MessageSquare },
    { title: 'Настройки', to: '/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto flex flex-col",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {sidebarOpen && (
            <Link to="/dashboard" className="font-bold text-xl text-autopartner-dark">
              АВТОПАРТНЕР
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              title={item.title}
              to={item.to}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen ? (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              <span className="text-xs text-gray-500">{user?.position}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50 justify-start px-0"
              >
                Выйти
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </Button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-800">
              {navigation.find((item) => item.to === location.pathname)?.title || "Страница"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Поиск..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-autopartner-primary focus:border-autopartner-primary"
              />
            </div>
            <Link to="/profile" className="flex items-center text-sm text-gray-700 hover:text-autopartner-primary">
              <User className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">{user?.name}</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
