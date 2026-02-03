package com.commissionw.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {
    @Id
    private String id;

    private String title;
    private String artist;
    private Double price;
    private String description;
    private String category;
    private String imageUrl;

    // Available, Sold, Pending
    private String status;
}
