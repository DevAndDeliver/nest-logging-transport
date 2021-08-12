import { LogLevel } from '@nestjs/common';

export interface LogEvent {
    message: string;
    additionalContext: string | null;
    stacktrace: string | null;
    baseContext: any;
    logSource: LogLevel;
    timestamp: Date;
}

export type LogEventWithReplacedNulls = {
    [K in keyof LogEvent]: null extends LogEvent[K] ? Exclude<LogEvent[K], null> | '' : LogEvent[K];
};

export interface Transport {
    call: TransportCallFunction;
}

export type TransportCallFunction = (
    _event: LogEvent,
    eventWithoutNulls: LogEventWithReplacedNulls | null,
) => unknown | Promise<unknown>;
