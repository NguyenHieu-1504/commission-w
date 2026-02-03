package com.commissionw.controller;

import com.commissionw.model.Product;
import com.commissionw.model.Role;
import com.commissionw.model.User;
import com.commissionw.payload.response.MessageResponse;
import com.commissionw.repository.ProductRepository;
import com.commissionw.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class InitController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/init")
    public ResponseEntity<?> initializeData() {
        // Check if admin already exists
        if (userRepository.existsByUsername("admin")) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Admin user already exists! Database already initialized."));
        }

        // Create Admin User
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@artspace.com");
        admin.setPassword(encoder.encode("admin123"));
        admin.setPhone("0000000000");

        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(Role.ROLE_ADMIN);
        adminRoles.add(Role.ROLE_USER);
        admin.setRoles(adminRoles);

        userRepository.save(admin);

        // Create Sample Products
        Product p1 = new Product();
        p1.setTitle("Sunset over Lake");
        p1.setArtist("Huy Arthur");
        p1.setPrice(2500000.0);
        p1.setDescription(
                "A breathtaking sunset view over a serene lake, capturing the warm golden hues reflecting on the water.");
        p1.setCategory("Landscape");
        p1.setImageUrl("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800");
        p1.setStatus("available");
        productRepository.save(p1);

        Product p2 = new Product();
        p2.setTitle("Abstract Dreams");
        p2.setArtist("Mai Lan");
        p2.setPrice(5000000.0);
        p2.setDescription("An explosion of colors and shapes that evoke emotion and imagination.");
        p2.setCategory("Abstract");
        p2.setImageUrl("https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800");
        p2.setStatus("available");
        productRepository.save(p2);

        Product p3 = new Product();
        p3.setTitle("Urban Solitude");
        p3.setArtist("Tuan Kiet");
        p3.setPrice(3200000.0);
        p3.setDescription("A portrayal of loneliness in the bustling cityscape.");
        p3.setCategory("Modern");
        p3.setImageUrl("https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800");
        p3.setStatus("available");
        productRepository.save(p3);

        Product p4 = new Product();
        p4.setTitle("Spring Blossoms");
        p4.setArtist("Linh Nguyen");
        p4.setPrice(1800000.0);
        p4.setDescription("Delicate cherry blossoms in full bloom, celebrating the beauty of spring.");
        p4.setCategory("Landscape");
        p4.setImageUrl("https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800");
        p4.setStatus("available");
        productRepository.save(p4);

        Product p5 = new Product();
        p5.setTitle("Ocean Depths");
        p5.setArtist("Huy Arthur");
        p5.setPrice(4500000.0);
        p5.setDescription("A mesmerizing underwater scene showcasing the mystery of the deep ocean.");
        p5.setCategory("Landscape");
        p5.setImageUrl("https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800");
        p5.setStatus("available");
        productRepository.save(p5);

        Product p6 = new Product();
        p6.setTitle("Gentle Portrait");
        p6.setArtist("Mai Lan");
        p6.setPrice(3800000.0);
        p6.setDescription("A soft and contemplative portrait capturing human emotion.");
        p6.setCategory("Portrait");
        p6.setImageUrl("https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800");
        p6.setStatus("sold");
        productRepository.save(p6);

        return ResponseEntity.ok(new MessageResponse(
                "Database initialized successfully!\n" +
                        "Admin Account: username='admin', password='admin123'\n" +
                        "6 sample products created."));
    }
}
