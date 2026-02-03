package com.commissionw.service;

import com.commissionw.model.Order;
import com.commissionw.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        order.setCreatedAt(LocalDateTime.now());

        // Mock Payment Logic
        if ("MOMO".equalsIgnoreCase(order.getPaymentMethod()) || "VNPAY".equalsIgnoreCase(order.getPaymentMethod())) {
            order.setStatus("PAID"); // Auto approve mock payments
        } else {
            order.setStatus("PENDING"); // Bank transfer needs manual verify
        }

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(String orderId, String status) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
