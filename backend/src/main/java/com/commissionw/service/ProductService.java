package com.commissionw.service;

import com.commissionw.model.Product;
import com.commissionw.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(String id, Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        product.setTitle(productDetails.getTitle());
        product.setArtist(productDetails.getArtist());
        product.setPrice(productDetails.getPrice());
        product.setDescription(productDetails.getDescription());
        product.setCategory(productDetails.getCategory());
        product.setImageUrl(productDetails.getImageUrl());
        product.setStatus(productDetails.getStatus());

        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        // Simple search logic - can be enhanced to search both title and artist
        List<Product> byTitle = productRepository.findByTitleContainingIgnoreCase(keyword);
        if (byTitle.isEmpty()) {
            return productRepository.findByArtistContainingIgnoreCase(keyword);
        }
        return byTitle;
    }

    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }
}
