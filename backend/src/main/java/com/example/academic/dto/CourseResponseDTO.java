package com.example.academic.dto;

public class CourseResponseDTO {

    private Long courseId;
    private String courseCode;
    private String name;
    private String description;
    private Integer year;
    private String term;
    private String faculty;
    private Integer credits;
    private Integer capacity;

    // Constructors
    public CourseResponseDTO() {
    }

    public CourseResponseDTO(Long courseId, String courseCode, String name, String description,
            Integer year, String term, String faculty, Integer credits, Integer capacity) {
        this.courseId = courseId;
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
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
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
