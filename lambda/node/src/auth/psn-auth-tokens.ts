import {AuthorizationPayload} from "psn-api";


export async function getAuthorizationPayload(npsso: string): Promise<AuthorizationPayload> {
    const {exchangeNpssoForAccessCode, exchangeAccessCodeForAuthTokens} = await import("psn-api");
    const accessCode = await exchangeNpssoForAccessCode(npsso);
    return await exchangeAccessCodeForAuthTokens(accessCode);
}