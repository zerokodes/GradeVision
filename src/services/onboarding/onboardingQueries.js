import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchSchools,
  fetchCourses,
  submitOnboarding,
} from "../api/onboardingApi";

// hook for fectching schools
export const useSchools = () => {
  return useQuery({
    queryKey: ["schools"],
    queryFn: fetchSchools,
  });
};

// hook for fetching courses from selected school
export const useCourses = (schoolId) => {
  return useQuery({
    queryKey: ["courses", schoolId],
    queryFn: () => fetchCourses(schoolId),
    enabled: !!schoolId,
  });
};

// hook for submitting onboarding data
export const useOnboardingMutation = () => {
  return useMutation({
    mutationFn: submitOnboarding,
  });
};
