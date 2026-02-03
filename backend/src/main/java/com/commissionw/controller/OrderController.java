package com.commissionw.controller;

import com.commissionw.model.Order;
import com.commissionw.payload.response.MessageResponse;
import com.commissionw.repository.OrderRepository;
import com.commissionw.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    // Create new order
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order, Authentication authentication) {
        try {
            // Get authenticated user info
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            order.setUserId(userDetails.getId());
            order.setUsername(userDetails.getUsername());
            order.setStatus("pending");
            order.setPaymentStatus("pending");
            order.setCreatedAt(LocalDateTime.now());
            order.setUpdatedAt(LocalDateTime.now());

            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error creating order: " + e.getMessage()));
        }
    }

    // Get all orders (Admin only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    // Get orders by authenticated user
    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<Order> orders = orderRepository.findByUserId(userDetails.getId());
        return ResponseEntity.ok(orders);
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id, Authentication authentication) {
        return orderRepository.findById(id)
                .map(order -> {
                    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

                    // Check if user owns this order or is admin
                    boolean isOwner = order.getUserId().equals(userDetails.getId());
                    boolean isAdmin = userDetails.getAuthorities().stream()
                            .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

                    if (isOwner || isAdmin) {
                        return ResponseEntity.ok(order);
                    } else {
                        return ResponseEntity.status(403)
                                .body(new MessageResponse("Access denied"));
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Update order status (Admin only)
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(payload.get("status"));
                    order.setUpdatedAt(LocalDateTime.now());
                    orderRepository.save(order);
                    return ResponseEntity.ok(order);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Update payment status (Admin only or payment gateway callback)
    @PutMapping("/{id}/payment")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setPaymentStatus(payload.get("paymentStatus"));
                    order.setUpdatedAt(LocalDateTime.now());
                    orderRepository.save(order);
                    return ResponseEntity.ok(order);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Cancel order
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable String id, Authentication authentication) {
        return orderRepository.findById(id)
                .map(order -> {
                    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

                    // Check if user owns this order
                    if (!order.getUserId().equals(userDetails.getId())) {
                        return ResponseEntity.status(403)
                                .body(new MessageResponse("Access denied"));
                    }

                    // Only allow cancelling pending orders
                    if (!order.getStatus().equals("pending")) {
                        return ResponseEntity.badRequest()
                                .body(new MessageResponse("Cannot cancel order with status: " + order.getStatus()));
                    }

                    order.setStatus("cancelled");
                    order.setUpdatedAt(LocalDateTime.now());
                    orderRepository.save(order);
                    return ResponseEntity.ok(order);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
