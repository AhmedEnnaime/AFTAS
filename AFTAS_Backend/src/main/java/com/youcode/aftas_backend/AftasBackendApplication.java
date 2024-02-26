package com.youcode.aftas_backend;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.youcode.aftas_backend.models.entities.User;
import com.youcode.aftas_backend.models.enums.IdentityDocumentType;
import com.youcode.aftas_backend.models.enums.ROLE;
import com.youcode.aftas_backend.repositories.UserRepository;

@SpringBootApplication
public class AftasBackendApplication {

    //  private PasswordEncoder passwordEncoder;
    //  private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(AftasBackendApplication.class, args);
    }

    // @Bean
    // public CommandLineRunner myCommandLineRunner() {
    //     return args -> {

    //         User user = User.builder()
    //                 .name("Ahmed")
    //                 .username("AhmedEnnaime")
    //                 .password(passwordEncoder.encode("password"))
    //                 .role(ROLE.MANAGER)
    //                 .accessionDate(LocalDate.now())
    //                 .nationality("Moroccan")
    //                 .familyName("Ennaime")
    //                 .identityDocument(IdentityDocumentType.CIN)
    //                 .isEnabled(true)
    //                 .build();

    //         userRepository.save(user);
    //         System.out.println("Executing code during application startup.");
    //     };
    // }
}
