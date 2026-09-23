package fr.trophyquest.backend.domain.repository;

import fr.trophyquest.backend.domain.entity.IgdbCandidate;
import fr.trophyquest.backend.domain.entity.embedded.IgdbCandidateId;
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
            UPDATE IgdbCandidate ic
            SET ic.status = CASE
                        WHEN ic.id.candidateId = :gameId THEN 'VALIDATED'
                        ELSE 'REJECTED' END
            WHERE ic.id.suiteId = :suiteId
            """)
    void validateMatching(UUID suiteId, long gameId);

    @Modifying
    @Transactional
    @Query("""
            UPDATE IgdbCandidate ic
            SET ic.status = 'REJECTED'
            WHERE ic.id.suiteId = :suiteId
            """)
    void rejectMatching(UUID suiteId);
}
