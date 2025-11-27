package com.example.academic.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CourseRequestDTO {

    @NotNull(message = "Course ID is required")
    private Integer courseId;

    @NotBlank(message = "Course code is required")
    private String courseCode;

    @NotBlank(message = "Course name is required")
    private String name;

    private String description;

    @NotNull(message = "Year is required")
    private Integer year;

    @NotBlank(message = "Term is required")
    private String term;

    @NotBlank(message = "Faculty is required")
    private String faculty;

    @Min(value = 1, message = "Credits must be at least 1")
    @Max(value = 6, message = "Credits cannot exceed 6")
    private Integer credits;

    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    // Constructors
    public CourseRequestDTO() {
    }

    public CourseRequestDTO(String courseCode, String name, String description,
            Integer year, String term, String faculty, Integer credits, Integer capacity) {
        this.courseCode = courseCode;
        this.name = name;
        this.description = description;
        this.year = year;
        this.term = term;
        this.faculty = faculty;
        this.credits = credits;
        this.capacity = capacity;
    }

    // Getters and Setters
    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}
