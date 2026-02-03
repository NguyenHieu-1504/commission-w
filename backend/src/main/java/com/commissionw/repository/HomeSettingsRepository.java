package com.commissionw.repository;

import com.commissionw.model.HomeSettings;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HomeSettingsRepository extends MongoRepository<HomeSettings, String> {
}
