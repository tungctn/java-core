package com.manager.bank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manager.bank.dto.auth.RegisterRequest;
import com.manager.bank.dto.user.UpdateRequest;
import com.manager.bank.dto.user.UserDTO;
import com.manager.bank.entities.User;
import com.manager.bank.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public UserDTO getUser(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;
        
        return new UserDTO(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getRole()
        );
    }
    
    public void changePassword(Integer userId, String newPassword) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return;
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public User createUser(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        String phoneNumber = request.getPhoneNumber().trim();
        String firstName = request.getFirstName().trim();
        String lastName = request.getLastName().trim();

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User newUser = new User();
        newUser.setPhoneNumber(phoneNumber);
        newUser.setEmail(email);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setPassword(hashedPassword);

        return userRepository.save(newUser);
    }

    public UserDTO UpdateUser(Integer userId, UpdateRequest request) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;
        if (request.getFirstName() != null && !request.getFirstName().isEmpty()) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null && !request.getLastName().isEmpty()) {
            user.setLastName(request.getLastName());
        }
        userRepository.save(user);

        return new UserDTO(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getRole()
        );
    }
}
