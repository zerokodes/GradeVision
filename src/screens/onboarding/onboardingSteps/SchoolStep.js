import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { COLORS } from "../../../styles/globalStyles";
import { AutoCompleteInput } from "../../../components/autoInput";

// Mock data for schools and courses
const mockSchools = [
  "University of Lagos",
  "University of Ibadan",
  "Federal University of Technology Akure",
  "Covenant University",
  "University of Nigeria Nsukka",
  "Obafemi Awolowo University",
  "Lagos State University",
];

const mockCourses = {
  "University of Lagos": [
    "Computer Science",
    "Electrical Engineering",
    "Business Administration",
    "Medicine",
  ],
  "University of Ibadan": [
    "Computer Engineering",
    "Economics",
    "Linguistics",
    "Law",
  ],
  "Federal University of Technology Akure": [
    "Software Engineering",
    "Mechanical Engineering",
    "Architecture",
  ],
  "Covenant University": [
    "Computer Science",
    "Electrical Engineering",
    "Petroleum Engineering",
  ],
  "University of Nigeria Nsukka": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biochemistry",
  ],
  "Obafemi Awolowo University": [
    "Law",
    "Medicine",
    "Pharmacy",
    "Agricultural Science",
  ],
  "Lagos State University": [
    "Mass Communication",
    "Accounting",
    "Banking and Finance",
  ],
};

// styled components..
const Container = styled(SafeAreaView)`
  width: 100%;
`;
// flex: 1;
//   justify-content: center;

const Title = styled(Text)`
  color: ${COLORS.mainText};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const FormContainer = styled(View)`
  width: 100%;
`;

const SchoolStep = ({ control, errors, setValue }) => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");

  useEffect(() => {
    if (selectedSchool && mockCourses[selectedSchool]) {
      setAvailableCourses(mockCourses[selectedSchool]);
    } else {
      setAvailableCourses([]);
    }
  }, [selectedSchool]);

  const handleSchoolChange = (text, onChange) => {
    onChange(text);
    setSelectedSchool(text);

    setValue("course", "");
    setAvailableCourses(mockCourses[text] || []);
  };

  return (
    <Container>
      <Title style={{ marginTop: 20 }}>Enter your school data</Title>

      <FormContainer>
        <Controller
          control={control}
          name="school"
          rules={{ required: "School name is required" }}
          render={({ field: { onChange, value } }) => (
            <AutoCompleteInput
              placeholder="Name of school"
              value={value}
              onChange={(text) => {
                handleSchoolChange(text, onChange);
              }}
              onSelect={(school) => {
                handleSchoolChange(school, onChange);
              }}
              suggestions={mockSchools}
              error={errors.school?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="course"
          rules={{ required: "Course is required" }}
          render={({ field: { onChange, value } }) => (
            <AutoCompleteInput
              placeholder="Course"
              value={value}
              onChange={onChange}
              onSelect={onChange}
              suggestions={availableCourses}
              error={errors.course?.message}
              disabled={!selectedSchool}
              topSpace
            />
          )}
        />
      </FormContainer>
    </Container>
  );
};

export default SchoolStep;
