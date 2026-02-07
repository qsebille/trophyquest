package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.igdb.IgdbCandidate;
import fr.trophyquest.backend.domain.entity.igdb.embedded.IgdbCandidateId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface IgdbCandidateRepository extends JpaRepository<IgdbCandidate, IgdbCandidateId> {

    @Modifying
    @Transactional
    @Query("""
            UPDATE IgdbCandidate c
            SET c.status = CASE
                WHEN c.id.candidateId = :gameId THEN 'ACCEPTED'
                ELSE 'REJECTED'
            END
            WHERE c.id.psnGameId = :psnGameId
            """)
    void updateStatusAfterValidation(UUID psnGameId, long gameId);

    @Modifying
    @Transactional
    @Query("UPDATE IgdbCandidate c SET c.status = 'REJECTED' WHERE c.id.psnGameId = :psnGameId")
    void updateStatusToRejected(UUID psnGameId);
}
