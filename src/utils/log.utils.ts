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

export const LONGEST_LOG_LEVEL_NAME = 'VERBOSE'.length;

export const addPadding = (string: string, paddingLength: number) => {
    if (paddingLength < 0) {
        throw new RangeError('Invalid paddingLength');
    }

    return `${' '.repeat(paddingLength)}${string}`;
};
