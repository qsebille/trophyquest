package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.Player;
import fr.trophyquest.backend.domain.projection.RecentPlayerRow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerRepository extends JpaRepository<Player, UUID> {

    @Query(value = """
            with active as (select et.player_id, count(*) as trophy_count
                            from app.psn_earned_trophy et
                            where et.earned_at >= :limitDate
                            group by et.player_id
                            order by trophy_count desc
                            limit :playerLimit),
                 ranked as (select et.*,
                                   row_number() over (partition by et.player_id order by et.earned_at desc, t.rank) as rn
                            from app.psn_earned_trophy et
                                 join app.psn_trophy t on t.id = et.trophy_id
                                 join active a on a.player_id = et.player_id
                            where et.earned_at >= :limitDate)
            select p.id                                         as player_id,
                   p.pseudo                                     as pseudo,
                   coalesce(p.aws_avatar_url, p.psn_avatar_url) as avatar,
                   a.trophy_count                               as recent_trophy_count,
                   t.id                                         as trophy_id,
                   t.title                                      as trophy_title,
                   t.trophy_type                                as trophy_type,
                   coalesce(t.aws_icon_url, t.psn_icon_url)     as trophy_icon,
                   t.description                                as trophy_description,
                   ts.id                                        as trophy_suite_id,
                   ts.name                                      as trophy_suite_name,
                   r.earned_at                                  as earned_at
            from ranked r
                     join active a on a.player_id = r.player_id
                     join app.psn_player p on p.id = r.player_id
                     join app.psn_trophy t on t.id = r.trophy_id
                     join app.psn_trophy_suite ts on ts.id = t.trophy_suite_id
            where r.rn <= :trophyLimit
            order by a.trophy_count desc, p.id, r.earned_at desc
            """, nativeQuery = true)
    List<RecentPlayerRow> searchRecentPlayerTrophies(
            int playerLimit,
            int trophyLimit,
            Instant limitDate
    );

    Optional<Player> findByPseudo(String pseudo);
}
