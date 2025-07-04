
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: User['role']) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'System Administrator',
    email: 'admin@system.com',
    role: 'system_admin',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'admin@greenwood.edu',
    role: 'school_admin',
    school_id: 'school-1',
  },
  {
    id: '3',
    name: 'Dr. Margaret Williams',
    email: 'principal@greenwood.edu',
    role: 'principal',
    school_id: 'school-1',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.j@greenwood.edu',
    role: 'teacher',
    school_id: 'school-1',
  },
  {
    id: '5',
    name: 'Mike Wilson',
    email: 'mike.w@student.greenwood.edu',
    role: 'student',
    school_id: 'school-1',
  },
  {
    id: '6',
    name: 'Lisa Wilson',
    email: 'lisa.w@parent.greenwood.edu',
    role: 'parent',
    school_id: 'school-1',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('sms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call your PHP API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('sms_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sms_user');
  };

  const switchRole = (role: User['role']) => {
    if (user?.role === 'system_admin') {
      const mockUser = mockUsers.find(u => u.role === role);
      if (mockUser) {
        setUser({ ...mockUser });
        localStorage.setItem('sms_user', JSON.stringify(mockUser));
      }
    }
  };

  const value = {
    user,
    login,
    logout,
    switchRole,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
