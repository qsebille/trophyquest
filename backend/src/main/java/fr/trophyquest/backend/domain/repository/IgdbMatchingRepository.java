package fr.trophyquest.backend.domain.repository;

import fr.trophyquest.backend.domain.entity.IgdbMatching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface IgdbMatchingRepository extends JpaRepository<IgdbMatching, UUID> {

    @Modifying
    @Transactional
    @Query("""
            UPDATE IgdbMatching im
            SET im.status = 'MANUAL_MATCH',
                im.matchedGameId = :gameId
            WHERE im.suiteId = :suiteId
            """)
    void validateMatching(UUID suiteId, long gameId);

    @Modifying
    @Transactional
    @Query("""
                    UPDATE IgdbMatching im
                    SET im.status = 'NO_MATCH_FOUND',
                        im.matchedGameId = null
                    WHERE im.suiteId = :suiteId
            """)
    void rejectMatching(UUID suiteId);

}
