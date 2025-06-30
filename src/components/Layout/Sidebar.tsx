
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Users,
  Settings,
  Bell,
  Calendar,
  FileText,
  User,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'system_admin':
        return [
          { to: '/system-admin', icon: Home, label: 'Dashboard' },
          { to: '/system-admin/schools', icon: Home, label: 'Schools' },
          { to: '/system-admin/users', icon: Users, label: 'Users' },
          { to: '/system-admin/settings', icon: Settings, label: 'Settings' },
        ];
      case 'school_admin':
        return [
          { to: '/school-admin', icon: Home, label: 'Dashboard' },
          { to: '/school-admin/students', icon: Users, label: 'Students' },
          { to: '/school-admin/teachers', icon: Users, label: 'Teachers' },
          { to: '/school-admin/classes', icon: Home, label: 'Classes' },
          { to: '/school-admin/fees', icon: FileText, label: 'Fee Management' },
          { to: '/school-admin/announcements', icon: Bell, label: 'Announcements' },
          { to: '/school-admin/settings', icon: Settings, label: 'Settings' },
        ];
      case 'teacher':
        return [
          { to: '/teacher', icon: Home, label: 'Dashboard' },
          { to: '/teacher/classes', icon: Home, label: 'My Classes' },
          { to: '/teacher/assignments', icon: FileText, label: 'Assignments' },
          { to: '/teacher/attendance', icon: Calendar, label: 'Attendance' },
          { to: '/teacher/students', icon: Users, label: 'Students' },
        ];
      case 'student':
        return [
          { to: '/student', icon: Home, label: 'Dashboard' },
          { to: '/student/assignments', icon: FileText, label: 'Assignments' },
          { to: '/student/grades', icon: FileText, label: 'Grades' },
          { to: '/student/attendance', icon: Calendar, label: 'Attendance' },
          { to: '/student/announcements', icon: Bell, label: 'Announcements' },
        ];
      case 'parent':
        return [
          { to: '/parent', icon: Home, label: 'Dashboard' },
          { to: '/parent/children', icon: Users, label: 'My Children' },
          { to: '/parent/fees', icon: FileText, label: 'Fees' },
          { to: '/parent/attendance', icon: Calendar, label: 'Attendance' },
          { to: '/parent/announcements', icon: Bell, label: 'Announcements' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={`bg-slate-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen flex flex-col`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-600 text-white">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>

      <Separator className="bg-slate-700" />

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4">
        <Button
          variant="ghost"
          onClick={logout}
          className={`w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 ${
            collapsed ? 'px-0' : 'px-3'
          }`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
