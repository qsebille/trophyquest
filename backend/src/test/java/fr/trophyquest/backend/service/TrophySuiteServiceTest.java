package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.exception.TrophySuiteNotFoundException;
import fr.trophyquest.backend.api.mapper.TrophyMapper;
import fr.trophyquest.backend.api.mapper.TrophySuiteMapper;
import fr.trophyquest.backend.domain.repository.views.dim.TrophyRepository;
import fr.trophyquest.backend.domain.repository.views.dim.TrophySuiteRepository;
import fr.trophyquest.backend.domain.repository.views.fact.EarnedTrophyRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TrophySuiteServiceTest {

    @Mock
    private TrophyRepository trophyRepository;

    @Mock
    private TrophySuiteRepository trophySuiteRepository;

    @Mock
    private EarnedTrophyRepository earnedTrophyRepository;

    @Mock
    private TrophyMapper trophyMapper;

    @Mock
    private TrophySuiteMapper trophySuiteMapper;

    @InjectMocks
    private TrophySuiteService trophySuiteService;

    @Test
    void should_throw_when_fetching_trophies_for_unknown_trophy_suite() {
        UUID trophySuiteId = UUID.randomUUID();
        when(trophySuiteRepository.existsById(trophySuiteId)).thenReturn(false);

        assertThrows(
                TrophySuiteNotFoundException.class,
                () -> trophySuiteService.fetchEarnedTrophies(trophySuiteId, Optional.empty())
        );

        verify(trophySuiteRepository).existsById(trophySuiteId);
        verifyNoInteractions(trophyRepository, earnedTrophyRepository, trophyMapper, trophySuiteMapper);
    }
}
