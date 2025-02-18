package com.manager.bank.services;

import org.springframework.stereotype.Service;

import com.manager.bank.entities.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    // Sử dụng một secret key cố định
    private final String secretKey = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    public Integer getUserIdFromToken(String token) {
        return Integer.parseInt(
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject()
        );
    }
} 