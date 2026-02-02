export function getMandatoryParam(configParam: string): string {
    if (process.env[configParam] === undefined) {
        console.error(`${configParam} params must be provided`)
        process.exit(1);
    } else {
        return process.env[configParam];
    }
}