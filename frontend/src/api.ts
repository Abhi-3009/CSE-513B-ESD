// Type definitions for API responses
export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export interface Course {
  courseId: number;
  courseCode: string;
  name: string;
  description: string;
  year: number;
  term: string;
  faculty: string;
  credits: number;
  capacity: number;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
  fullName?: string;
}

export interface ErrorResponse {
  error: string;
}

export interface MessageResponse {
  message: string;
}

export interface CourseRequest {
  courseId: number;
  courseCode: string;
  name: string;
  description: string;
  year: number;
  term: string;
  faculty: string;
  credits: number;
  capacity: number;
}

export interface Specialisation {
  specialisationId: number;
  code: string;
  name: string;
  description: string;
  year: number;
  creditsRequired: number;
}

export interface SpecialisationRequest {
  specialisationId: number;
  code: string;
  name: string;
  description: string;
  year: number;
  creditsRequired: number;
}

const API = {


  googleLogin: (credential: string): Promise<AuthResponse | ErrorResponse> =>
    fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential })
    }).then(r => r.json()),

  logout: (token: string): Promise<MessageResponse> =>
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json()),

  listCourses: (token: string): Promise<Course[]> =>
    fetch('/api/courses', {
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json()),

  createCourse: (token: string, course: CourseRequest): Promise<Course | ErrorResponse> =>
    fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token
      },
      body: JSON.stringify(course)
    }).then(r => r.json()),

  updateCourse: (token: string, id: number, course: CourseRequest): Promise<Course | ErrorResponse> =>
    fetch(`/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token
      },
      body: JSON.stringify(course)
    }).then(r => r.json()),

  deleteCourse: (token: string, id: number): Promise<MessageResponse | ErrorResponse> =>
    fetch(`/api/courses/${id}`, {
      method: 'DELETE',
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json()),

  listSpecialisations: (token: string): Promise<Specialisation[]> =>
    fetch('/api/specialisations', {
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json()),

  createSpecialisation: (token: string, specialisation: SpecialisationRequest): Promise<Specialisation | ErrorResponse> =>
    fetch('/api/specialisations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token
      },
      body: JSON.stringify(specialisation)
    }).then(r => r.json()),

  updateSpecialisation: (token: string, id: number, specialisation: SpecialisationRequest): Promise<Specialisation | ErrorResponse> =>
    fetch(`/api/specialisations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token
      },
      body: JSON.stringify(specialisation)
    }).then(r => r.json()),

  getSpecialisationCourses: (token: string, id: number): Promise<Course[]> =>
    fetch(`/api/specialisations/${id}/courses`, {
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json()),

  deleteSpecialisation: (token: string, id: number): Promise<MessageResponse | ErrorResponse> =>
    fetch(`/api/specialisations/${id}`, {
      method: 'DELETE',
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json())
};

export default API;
