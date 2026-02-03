package com.commissionw.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "home_settings")
public class HomeSettings {
    @Id
    private String id;

    private String heroImageUrl;
    private List<String> featuredImageUrls = new ArrayList<>();

    // Default constructor initializes with 4 empty slots
    public HomeSettings() {
        this.featuredImageUrls = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            this.featuredImageUrls.add("");
        }
    }
}
