import { LogEvent, LogEventWithReplacedNulls } from '@/interfaces/transport';

export const replaceNullsWithEmptyStrings = (input: LogEvent) => {
    return Object.fromEntries(
        Object.entries(input).map(([k, v]) => {
            if (v === null) {
                return [k, ''];
            }

            return [k, v];
        }),
    ) as LogEventWithReplacedNulls;
};
