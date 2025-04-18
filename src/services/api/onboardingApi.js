import { apiClient } from "./apiClient";

// Fetch schools
export const fetchSchools = async () => {
  const response = apiClient.get("/schools");
  return response.data;
};

// Fetch courses offered by a school
export const fetchCourses = async (schoolId) => {
  const response = apiClient.get(`/courses?school=${schoolId}`);
  return response.data;
};

// Submit onboarding data
export const submitOnboarding = async (userData) => {
  const response = apiClient.post("/login", userData);
  return response.data;
};
