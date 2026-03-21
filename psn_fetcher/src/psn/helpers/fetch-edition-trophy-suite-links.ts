import {AuthorizationPayload, UserTrophiesBySpecificTitleResponse} from "psn-api";
import {PlayedEdition} from "../../models/played-edition.js";
import {EditionTrophySuiteLink} from "../../models/edition-trophy-suite-link.js";
import {mapWithConcurrency} from "../.././config/map-with-concurrency.js";

const TITLES_BATCH_SIZE: number = 5;

export async function fetchEditionTrophySuiteLinks(
    auth: AuthorizationPayload,
    accountId: string,
    playedEditions: PlayedEdition[],
    concurrency: number = 10,
): Promise<EditionTrophySuiteLink[]> {
    const {getUserTrophiesForSpecificTitle} = await import("psn-api");

    const startTime = Date.now();
    const safeConcurrency = Math.max(1, concurrency);

    const npTitleIds = playedEditions.map(p => p.edition.id);
    const batchs: string[] = [];
    for (let i = 0; i < npTitleIds.length; i += TITLES_BATCH_SIZE) {
        batchs.push(npTitleIds.slice(i, i + TITLES_BATCH_SIZE).join(','));
    }
    const perBatchLinks: EditionTrophySuiteLink[][] = await mapWithConcurrency(
        batchs,
        safeConcurrency,
        async (batch) => {
            const response: UserTrophiesBySpecificTitleResponse = await getUserTrophiesForSpecificTitle(
                auth,
                accountId,
                {
                    npTitleIds: batch,
                    includeNotEarnedTrophyIds: true
                }
            )

            const currentLinks: EditionTrophySuiteLink[] = []
            response.titles
                .filter(title => title.trophyTitles.length > 0)
                .map(title => {
                    for (const trophyTitle of title.trophyTitles) {
                        if (trophyTitle.lastUpdatedDateTime === null) return;
                        currentLinks.push({
                            editionId: title.npTitleId,
                            trophySuiteId: trophyTitle.npCommunicationId
                        })
                    }
                })

            return currentLinks
        }
    )

    const links = perBatchLinks.flatMap(r => r);

    const duration = (Date.now() - startTime) / 1000;
    console.info(`Fetched ${links.length} edition-trophy suite links in ${duration.toFixed(2)} s`);

    return links;
}