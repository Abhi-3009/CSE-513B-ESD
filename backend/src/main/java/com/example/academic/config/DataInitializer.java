package com.example.academic.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Default users are now created via create.sql and insert.sql
        // This initializer is kept for backward compatibility but does nothing
        System.out.println("DataInitializer: Users should be loaded from create.sql and insert.sql");
    }
}
