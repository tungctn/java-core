package com.manager.bank.entities;

import com.manager.bank.entities.ENUM.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.persistence.Enumerated;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(name = "email_unique", columnNames = "email"),
    @UniqueConstraint(name = "phoneNumber_unique", columnNames = "phoneNumber")
}, indexes = {
    @Index(name = "idx_phoneNumber", columnList = "phoneNumber")
})
public class User extends Base {
    @Id
    @SequenceGenerator(name = "user_seq", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    private int id;

    @NotBlank(message = "First name is required")
    private String firstName = "";

    @NotBlank(message = "Last name is required")
    private String lastName = "";

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    @Column(unique = true)
    private String email = "";

    @NotBlank(message = "Phone number is required")
    @Column(unique = true)
    @Pattern(regexp = "^[0-9]{10}$", message = "Invalid phone number")
    private String phoneNumber = "";

    @NotBlank(message = "Password is required")
    private String password = "";
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    public User() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

