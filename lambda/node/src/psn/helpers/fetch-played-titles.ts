import {AuthorizationPayload, UserPlayedGamesResponse} from "psn-api";

const DEFAULT_PLAYED_GAMES_PAGE_SIZE = 100;

interface UserDataOptions {
    limitDate?: Date;
}

export async function fetchUserPlayedTitles(
    auth: AuthorizationPayload,
    accountId: string,
    options?: UserDataOptions,
) {
    const {getUserPlayedGames} = await import("psn-api");

    const result = [];
    let offset = 0;
    const limitDate = options?.limitDate ? new Date(options.limitDate) : new Date(0);

    while (true) {
        const response: UserPlayedGamesResponse = await getUserPlayedGames(auth, accountId, {
            limit: DEFAULT_PLAYED_GAMES_PAGE_SIZE,
            offset: offset,
            categories: 'ps4_game,ps5_native_game,pspc_game'
        });

        if (!response.titles || response.titles.length === 0) break;

        result.push(...response.titles);

        const lastTitle = response.titles[response.titles.length - 1];
        if (new Date(lastTitle.lastPlayedDateTime) < limitDate) break;
        if (response.nextOffset === null || response.nextOffset === offset) break;
        offset = response.nextOffset;
    }

    return result.filter(title => new Date(title.lastPlayedDateTime) > limitDate);
}