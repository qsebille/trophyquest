export interface PlayerAddResponse {
    status: 'OK' | 'ERROR';
    lambdaStatus: number;
    functionError: boolean;
}
