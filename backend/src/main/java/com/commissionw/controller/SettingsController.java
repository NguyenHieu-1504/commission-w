package com.commissionw.controller;

import com.commissionw.model.HomeSettings;
import com.commissionw.repository.HomeSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    @Autowired
    HomeSettingsRepository homeSettingsRepository;

    @GetMapping("/home")
    public ResponseEntity<?> getHomeSettings() {
        // Always return the first (and only) settings document
        List<HomeSettings> allSettings = homeSettingsRepository.findAll();

        if (allSettings.isEmpty()) {
            // Return default settings if none exist
            HomeSettings defaultSettings = new HomeSettings();
            defaultSettings.setHeroImageUrl("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000");

            List<String> defaultFeatured = new ArrayList<>();
            defaultFeatured.add("https://images.unsplash.com/photo-1516905041604-7935af78f572?w=800");
            defaultFeatured.add("https://images.unsplash.com/photo-1549490349-8643362247b5?w=800");
            defaultFeatured.add("https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800");
            defaultFeatured.add("https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800");
            defaultSettings.setFeaturedImageUrls(defaultFeatured);

            return ResponseEntity.ok(defaultSettings);
        }

        return ResponseEntity.ok(allSettings.get(0));
    }

    @PutMapping("/home")
    public ResponseEntity<?> updateHomeSettings(@RequestBody HomeSettings newSettings) {
        List<HomeSettings> allSettings = homeSettingsRepository.findAll();

        HomeSettings settings;
        if (allSettings.isEmpty()) {
            // Create new if doesn't exist
            settings = new HomeSettings();
        } else {
            // Update existing
            settings = allSettings.get(0);
        }

        settings.setHeroImageUrl(newSettings.getHeroImageUrl());
        settings.setFeaturedImageUrls(newSettings.getFeaturedImageUrls());

        homeSettingsRepository.save(settings);

        return ResponseEntity.ok(settings);
    }
}
