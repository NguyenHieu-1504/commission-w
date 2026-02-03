package com.commissionw.service;

import com.commissionw.model.ChatMessage;
import com.commissionw.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    public ChatMessage sendMessage(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        return chatRepository.save(message);
    }

    public List<ChatMessage> getConversation(String userId1, String userId2) {
        // This is a simplified fetch. In real app, you might need complex querying
        // to get messages where (sender=u1 AND receiver=u2) OR (sender=u2 AND
        // receiver=u1)
        // For MVP, we will rely on repository method if defined, or simple logic.
        // Actually, let's use a repository method that finds by sender OR receiver to
        // get all related.
        // Better yet, let's filter in memory for MVP or assume the repo does it right.

        // Correct implementation requires a custom query, but let's stick to the repo
        // method we defined:
        // findBySenderIdOrReceiverId - this gets ALL messages for a user.
        // We'll filter for the specific partner in stream.

        List<ChatMessage> allMessages = chatRepository.findBySenderIdOrReceiverId(userId1, userId1);

        return allMessages.stream()
                .filter(m -> (m.getSenderId().equals(userId2) && m.getReceiverId().equals(userId1)) ||
                        (m.getSenderId().equals(userId1) && m.getReceiverId().equals(userId2)))
                .sorted((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()))
                .toList();
    }
}
