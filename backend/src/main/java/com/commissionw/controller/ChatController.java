package com.commissionw.controller;

import com.commissionw.model.ChatMessage;
import com.commissionw.service.ChatService;
import com.commissionw.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatService chatService;

    @PostMapping("/send")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ChatMessage sendMessage(@RequestBody ChatMessage message, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        message.setSenderId(userDetails.getId());
        return chatService.sendMessage(message);
    }

    @GetMapping("/conversation/{partnerId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<ChatMessage> getConversation(@PathVariable String partnerId, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return chatService.getConversation(userDetails.getId(), partnerId);
    }
}
