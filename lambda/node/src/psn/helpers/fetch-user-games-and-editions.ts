import {fetchUserPlayedTitles} from "./fetch-played-titles.js";
import {AuthorizationPayload} from "psn-api";
import {PlayedGame} from "../../models/played-game.js";
import {PlayedEdition} from "../../models/played-edition.js";

export type UserGamesEditionsData = {
    games: PlayedGame[];
    editions: PlayedEdition[];
}

export async function fetchUserGamesAndEditions(
    auth: AuthorizationPayload,
    accountId: string,
    limitDate?: Date,
): Promise<UserGamesEditionsData> {
    const startTime = Date.now();
    const playedTitles = await fetchUserPlayedTitles(auth, accountId, {limitDate});

    const gameMap = new Map<number, PlayedGame>();
    const editions: PlayedEdition[] = [];
    playedTitles
        .forEach(playedTitle => {
            // Games
            const gameId = playedTitle.concept.id;
            if (gameMap.has(gameId)) {
                const existingGame = gameMap.get(gameId)!;
                const firstPlayedAt = new Date(existingGame.firstPlayedAt) < new Date(playedTitle.firstPlayedDateTime) ? existingGame.firstPlayedAt : playedTitle.firstPlayedDateTime;
                const lastPlayedAt = new Date(existingGame.lastPlayedAt) > new Date(playedTitle.lastPlayedDateTime) ? existingGame.lastPlayedAt : playedTitle.lastPlayedDateTime;
                gameMap.set(gameId, {
                    ...existingGame,
                    firstPlayedAt,
                    lastPlayedAt,
                });
            } else {
                // @ts-ignore
                const defaultLanguage = playedTitle.concept.localizedName.defaultLanguage;
                // @ts-ignore
                const gameName = playedTitle.concept.localizedName.metadata[defaultLanguage];
                gameMap.set(gameId, {
                    game: {
                        id: gameId,
                        name: gameName,
                        images: playedTitle.concept.media.images,
                        psnTitleIds: playedTitle.concept.titleIds
                    },
                    playerId: accountId,
                    firstPlayedAt: playedTitle.firstPlayedDateTime,
                    lastPlayedAt: playedTitle.lastPlayedDateTime,
                });
            }

            // Edition (= title)
            editions.push({
                edition: {
                    gameId: playedTitle.concept.id,
                    id: playedTitle.titleId,
                    name: playedTitle.name,
                    imageUrl: playedTitle.imageUrl,
                    category: playedTitle.category,
                    service: playedTitle.service,
                },
                playerId: accountId,
                lastPlayedAt: playedTitle.lastPlayedDateTime,
            });
        });

    const duration = (Date.now() - startTime) / 1000;
    console.info(`Fetched ${gameMap.size} games and ${editions.length} editions in ${duration.toFixed(2)} s`);

    return {
        games: [...gameMap.values()],
        editions: editions,
    };
}