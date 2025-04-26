
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, User } from 'lucide-react';
import ProfileEditor from '../profile/ProfileEditor';
import NotificationsPopover from '../notifications/NotificationsPopover';
import NewsTicker from '../news/NewsTicker';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { title: 'Главная', to: '/dashboard' },
    { title: 'Оборудование', to: '/equipment' },
    { title: 'Карта офиса', to: '/office-map' },
    { title: 'Пользователи', to: '/users' },
    { title: 'Настройки', to: '/settings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              АВТОПАРТНЕР
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm transition-colors hover:text-primary ${
                  location.pathname === item.to ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 mx-6">
          <NewsTicker />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Поиск..."
              className="pl-9 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-gray-50/50"
            />
          </div>

          <NotificationsPopover />

          <div className="flex items-center space-x-1">
            <ProfileEditor />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-5 w-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex flex-col items-start">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.position}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
