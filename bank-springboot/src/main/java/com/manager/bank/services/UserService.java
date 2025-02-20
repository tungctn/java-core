package com.manager.bank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manager.bank.dto.auth.RegisterRequest;
import com.manager.bank.dto.user.CreateRequest;
import com.manager.bank.dto.user.UserDTO;
import com.manager.bank.entities.User;
import com.manager.bank.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(CreateRequest request) {
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        return userRepository.save(user); 
    }

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

    public void register(RegisterRequest request) {
        String email = request.getEmail().trim();
        String phoneNumber = request.getPhoneNumber().trim();
        String firstName = request.getFirstName().trim();
        String lastName = request.getLastName().trim();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already in use");
        }

        if (userRepository.existsByPhoneNumber(phoneNumber)) {
            throw new RuntimeException("Phone number is already in use");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User newUser = new User();
        newUser.setPhoneNumber(phoneNumber);
        newUser.setEmail(email);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setPassword(hashedPassword);

        userRepository.save(newUser);
    }
}
