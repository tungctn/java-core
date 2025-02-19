package com.manager.bank.dto.user;

import com.manager.bank.entities.ENUM.Role;

public class CreateRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    // private String role
    // role enum [ADMIN, USER]
    private Role role = Role.USER;
    private String phoneNumber;

    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;    
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
