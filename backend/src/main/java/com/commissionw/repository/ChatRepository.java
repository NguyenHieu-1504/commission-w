package com.commissionw.repository;

import com.commissionw.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ChatRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findBySenderIdOrReceiverId(String senderId, String receiverId);
}
