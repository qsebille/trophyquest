package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Entity
@Table(name = "auth_user")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AuthUser {
    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String email;

    private String displayName;

    @Column(unique = true)
    private String cognitoSub;
}
