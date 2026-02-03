package com.commissionw.payload.request;

import lombok.Data;
import java.util.Set;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String phone;
    private Set<String> roles;
}
