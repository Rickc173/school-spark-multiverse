
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'system_admin' | 'school_admin' | 'principal' | 'teacher' | 'student' | 'parent';
  school_id?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  principal?: string;
  students_count: number;
  teachers_count: number;
  established: string;
  subscription_plan: 'basic' | 'premium' | 'enterprise';
  subscription_status: 'active' | 'inactive' | 'trial';
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacher_id: string;
  school_id: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  school_id: string;
}
