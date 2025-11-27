package com.example.academic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.academic.dto.CourseRequestDTO;
import com.example.academic.dto.CourseResponseDTO;
import com.example.academic.model.Course;

public class CourseMapper {

    public static Course toEntity(CourseRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        Course course = new Course();
        course.setCourseId(dto.getCourseId());
        course.setCourseCode(dto.getCourseCode());
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());
        course.setYear(dto.getYear());
        course.setTerm(dto.getTerm());
        course.setFaculty(dto.getFaculty());
        course.setCredits(dto.getCredits());
        course.setCapacity(dto.getCapacity());

        return course;
    }

    public static CourseResponseDTO toDTO(Course entity) {
        if (entity == null) {
            return null;
        }

        return new CourseResponseDTO(
                entity.getId(),
                entity.getCourseCode(),
                entity.getName(),
                entity.getDescription(),
                entity.getYear(),
                entity.getTerm(),
                entity.getFaculty(),
                entity.getCredits(),
                entity.getCapacity());
    }

    public static List<CourseResponseDTO> toDTOList(List<Course> entities) {
        if (entities == null) {
            return null;
        }

        return entities.stream()
                .map(CourseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static void updateEntity(Course entity, CourseRequestDTO dto) {
        if (entity == null || dto == null) {
            return;
        }

        entity.setCourseCode(dto.getCourseCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setYear(dto.getYear());
        entity.setTerm(dto.getTerm());
        entity.setFaculty(dto.getFaculty());
        entity.setCredits(dto.getCredits());
        entity.setCapacity(dto.getCapacity());
    }
}
