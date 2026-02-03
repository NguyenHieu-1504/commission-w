package com.commissionw.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    private String userId;
    private String username;
    private String email;
    private String phone;

    private List<OrderItem> items = new ArrayList<>();

    private Double totalAmount;

    private String status; // pending, confirmed, shipping, delivered, cancelled

    private ShippingAddress shippingAddress;

    private String paymentMethod; // cod, bank_transfer, vnpay, etc.
    private String paymentStatus; // pending, paid, failed

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    public static class OrderItem {
        private String productId;
        private String productTitle;
        private String productImageUrl;
        private Double price;
        private Integer quantity;
    }

    @Data
    public static class ShippingAddress {
        private String fullName;
        private String phone;
        private String address;
        private String city;
        private String district;
        private String note;
    }
}
