package com.example.academic.mapper;

import com.example.academic.dto.AuthResponseDTO;
import com.example.academic.model.User;

public class AuthMapper {

    /**
     * Maps a User entity to AuthResponseDTO with token
     * 
     * @param user  The user entity
     * @param token The authentication token
     * @return AuthResponseDTO with user information
     */
    public static AuthResponseDTO toAuthResponse(User user, String token) {
        if (user == null || token == null) {
            return null;
        }

        String displayName = user.getEmail() != null ? user.getEmail() : user.getUsername();

        return new AuthResponseDTO(
                token,
                user.getUsername(),
                displayName,
                user.getRole());
    }

    /**
     * Maps a User entity to AuthResponseDTO with token and custom name
     * 
     * @param user  The user entity
     * @param token The authentication token
     * @param name  The display name
     * @return AuthResponseDTO with user information
     */
    public static AuthResponseDTO toAuthResponse(User user, String token, String name) {
        if (user == null || token == null) {
            return null;
        }

        return new AuthResponseDTO(
                token,
                user.getUsername(),
                name != null ? name : user.getUsername(),
                user.getRole());
    }

    /**
     * Creates a new User entity from Google OAuth payload
     * 
     * @param email    User's email from Google
     * @param googleId User's Google ID
     * @return New User entity configured for Google authentication
     */
    public static User createGoogleUser(String email, String googleId) {
        if (email == null || googleId == null) {
            return null;
        }

        User user = new User();
        user.setUsername(email);
        user.setEmail(email);
        user.setGoogleId(googleId);
        user.setAuthProvider("google");
        // Role will be set by AuthService

        return user;
    }

}
