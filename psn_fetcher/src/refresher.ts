async function runRefresher(): Promise<void> {
    const startTime = Date.now();
    // TODO
}

export const handler = async (
    _event: any = {},
    _context: any = {}
): Promise<void> => {
    await runRefresher();
};

if (!process.env.LAMBDA_TASK_ROOT) {
    runRefresher().catch((e) => {
        console.error(e);
        process.exitCode = 1;
    });
}