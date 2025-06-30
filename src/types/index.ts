
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'system_admin' | 'school_admin' | 'teacher' | 'student' | 'parent';
  school_id?: string;
  avatar?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  principal: string;
  active: boolean;
  created_at: string;
}

export interface Student {
  id: string;
  name: string;
  email?: string;
  class: string;
  roll_number: string;
  parent_name: string;
  parent_phone: string;
  admission_date: string;
  status: 'active' | 'inactive';
  school_id: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  classes: string[];
  phone: string;
  hire_date: string;
  school_id: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  school_id: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacher_id: string;
  students_count: number;
  school_id: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  due_date: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  teacher_id: string;
  school_id: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'event';
  target_audience: 'all' | 'teachers' | 'students' | 'parents';
  created_at: string;
  author: string;
  school_id: string;
}
