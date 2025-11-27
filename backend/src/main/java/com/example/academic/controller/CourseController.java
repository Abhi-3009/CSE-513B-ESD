package com.example.academic.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.academic.dto.CourseRequestDTO;
import com.example.academic.dto.CourseResponseDTO;
import com.example.academic.dto.ErrorResponseDTO;
import com.example.academic.dto.MessageResponseDTO;
import com.example.academic.service.AuthService;
import com.example.academic.service.CourseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final AuthService authService;

    public CourseController(CourseService courseService, AuthService authService) {
        this.courseService = courseService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<CourseResponseDTO>> list() {
        List<CourseResponseDTO> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestHeader(value = "X-Auth-Token", required = false) String token,
            @Valid @RequestBody CourseRequestDTO courseDTO) {
        // Check if user is admin
        if (!isAdmin(token)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponseDTO("Only admins can create courses"));
        }
        CourseResponseDTO created = courseService.createCourse(courseDTO);
        return ResponseEntity.ok(created);
    }

    @org.springframework.web.bind.annotation.PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestHeader(value = "X-Auth-Token", required = false) String token,
            @PathVariable Integer id,
            @Valid @RequestBody CourseRequestDTO courseDTO) {
        // Check if user is admin
        if (!isAdmin(token)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponseDTO("Only admins can update courses"));
        }
        return courseService.updateCourse(id, courseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@RequestHeader(value = "X-Auth-Token", required = false) String token,
            @PathVariable Integer id) {
        // Check if user is admin
        if (!isAdmin(token)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponseDTO("Only admins can delete courses"));
        }
        boolean deleted = courseService.deleteCourse(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new MessageResponseDTO("Deleted"));
    }

    /**
     * Check if the token belongs to an admin user
     */
    private boolean isAdmin(String token) {
        if (token == null) {
            return false;
        }
        return authService.getRoleFromToken(token)
                .map(role -> "admin".equalsIgnoreCase(role))
                .orElse(false);
    }
}
