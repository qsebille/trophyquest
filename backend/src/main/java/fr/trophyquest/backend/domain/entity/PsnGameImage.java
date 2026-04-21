package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

import java.util.UUID;

@Entity
@Table(name = "psn_game_image")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PsnGameImage {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "psn_url")
    private String psnUrl;

    @Column(name = "aws_url")
    private String awsUrl;

    @Formula("COALESCE(aws_url, psn_url)")
    private String url;

    @Column(name = "type")
    private String type;

    @Column(name = "format")
    private String format;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "psn_game_id", nullable = false)
    private PsnGame psnGame;
}