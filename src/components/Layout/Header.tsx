
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Bell, Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, switchRole } = useAuth();

  const handleRoleSwitch = (role: string) => {
    if (user?.role === 'system_admin') {
      switchRole(role as any);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">
            School Management System
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64"
            />
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          {user?.role === 'system_admin' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Switch Role
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleRoleSwitch('system_admin')}>
                  System Admin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleSwitch('school_admin')}>
                  School Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('teacher')}>
                  Teacher
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('student')}>
                  Student
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('parent')}>
                  Parent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="text-sm text-gray-600">
            Welcome, <span className="font-medium">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
