package com.example.academic.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.academic.model.User;
import com.example.academic.service.AuthService;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class AuthFilter extends OncePerRequestFilter {

    private final AuthService authService;

    public AuthFilter(AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("X-Auth-Token");

        if (authHeader != null) {
            Optional<String> usernameOpt = authService.getUsernameFromToken(authHeader);

            if (usernameOpt.isPresent()) {
                String username = usernameOpt.get();
                Optional<User> userOpt = authService.findUserByUsername(username);

                if (userOpt.isPresent()) {
                    User user = userOpt.get();

                    // Create authority based on role
                    // Ensure role is not null, default to "student" if missing (safety check)
                    String role = user.getRole() != null ? user.getRole() : "student";
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);

                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, Collections.singletonList(authority));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        chain.doFilter(request, response);
    }
}
