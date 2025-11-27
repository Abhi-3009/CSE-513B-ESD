package com.example.academic.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.academic.dto.AuthResponseDTO;
import com.example.academic.dto.GoogleLoginRequestDTO;

import com.example.academic.mapper.AuthMapper;
import com.example.academic.model.User;
import com.example.academic.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final GoogleIdTokenVerifier googleVerifier;
    private static final java.util.Map<String, String> TOKENS = new java.util.concurrent.ConcurrentHashMap<>();
    private static final java.util.Map<String, String> TOKEN_USER_ROLE = new java.util.concurrent.ConcurrentHashMap<>();

    // Set this to your admin email to grant admin privileges
    private static final String ADMIN_EMAIL = "raiabhijeet3009@gmail.com";

    public AuthService(UserRepository userRepository, @Value("${google.client.id}") String googleClientId) {
        this.userRepository = userRepository;
        this.googleVerifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance())
                .setAudience(java.util.Collections.singletonList(googleClientId))
                .build();
    }

    /**
     * Authenticate user with Google OAuth
     * 
     * @param googleRequest Google credential
     * @return AuthResponseDTO if successful
     * @throws GeneralSecurityException if token verification fails
     * @throws IOException              if token parsing fails
     */
    public AuthResponseDTO googleLogin(GoogleLoginRequestDTO googleRequest)
            throws GeneralSecurityException, IOException {
        String credential = googleRequest.getCredential();

        GoogleIdToken idToken = GoogleIdToken.parse(googleVerifier.getJsonFactory(), credential);
        GoogleIdToken.Payload payload = idToken.getPayload();

        String googleId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        // Check if user exists
        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;

        if (existingUser.isEmpty()) {
            // Create new user using mapper
            user = AuthMapper.createGoogleUser(email, googleId);

            // Assign admin role if email matches admin email
            if (ADMIN_EMAIL.equals(email)) {
                user.setRole("admin");
            } else {
                user.setRole("student");
            }

            user = userRepository.save(user);
        } else {
            user = existingUser.get();

            // Enforce admin role if email matches
            if (ADMIN_EMAIL.equals(email)) {
                if (!"admin".equals(user.getRole())) {
                    user.setRole("admin");
                    user = userRepository.save(user);
                }
            } else {
                // For non-admin users, set default role if missing
                if (user.getRole() == null || user.getRole().isEmpty()) {
                    user.setRole("student");
                    user = userRepository.save(user);
                }
            }
        }

        String token = generateToken();
        TOKENS.put(token, email);
        TOKEN_USER_ROLE.put(token, user.getRole());

        return AuthMapper.toAuthResponse(user, token, name);
    }

    /**
     * Logout user by removing token
     * 
     * @param token Authentication token
     * @return true if token was removed, false otherwise
     */
    public boolean logout(String token) {
        if (token != null && TOKENS.containsKey(token)) {
            TOKENS.remove(token);
            TOKEN_USER_ROLE.remove(token);
            return true;
        }
        return false;
    }

    /**
     * Validate if a token is valid
     * 
     * @param token Authentication token
     * @return true if valid, false otherwise
     */
    public boolean isTokenValid(String token) {
        return token != null && TOKENS.containsKey(token);
    }

    /**
     * Get username associated with a token
     * 
     * @param token Authentication token
     * @return Optional username
     */
    public Optional<String> getUsernameFromToken(String token) {
        if (token != null && TOKENS.containsKey(token)) {
            return Optional.of(TOKENS.get(token));
        }
        return Optional.empty();
    }

    /**
     * Generate a new authentication token
     * 
     * @return Generated token
     */
    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    /**
     * Find user by email
     * 
     * @param email User email
     * @return Optional User
     */
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByEmail(username); // username parameter contains email
    }

    /**
     * Get user role from token
     * 
     * @param token Authentication token
     * @return Optional role
     */
    public Optional<String> getRoleFromToken(String token) {
        if (token != null && TOKEN_USER_ROLE.containsKey(token)) {
            return Optional.of(TOKEN_USER_ROLE.get(token));
        }
        return Optional.empty();
    }
}
