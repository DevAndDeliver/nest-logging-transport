import { Injectable, LoggerService } from '@nestjs/common';
import { LogEvent, LogEventWithReplacedNulls, Transport } from './interfaces/transport';
import {
    HandleLogMessageInput,
    NestTransportLoggerOptions,
    ParseLogInformationPayload,
    ParseLogsPayload,
} from './logger.interfaces';
import { DefaultTransportConsole } from './transports/defaultTransportConsole';
import { replaceNullsWithEmptyStrings } from './utils/log.utils';

@Injectable()
export class NestTransportLogger implements LoggerService {
    protected transports: Transport[];
    protected enableEventsWithoutNulls: boolean;

    constructor(options: NestTransportLoggerOptions) {
        const { allowEmptyTransports, transports } = options;
        if (transports.length === 0 && !allowEmptyTransports) {
            this.transports = [new DefaultTransportConsole()];
        } else {
            this.transports = transports;
        }

        this.enableEventsWithoutNulls = options.enableEventsWithoutNulls ?? true;
    }

    log(message: any, context?: string): void;
    log(message: any, ...optionalParams: [...any, string?, string?]): void;
    log(message: any, ...optionalParams: any[]) {
        return this.handleLogMessage({ message, args: optionalParams, type: 'log' });
    }

    /**
     * Write an 'error' level log, if the configured level allows for it.
     * Prints to `stderr` with newline.
     */
    error(message: any, stack?: string, context?: string): void;
    error(message: any, ...optionalParams: [...any, string?, string?]): void;
    error(message: any, ...optionalParams: any[]) {
        return this.handleLogMessage({
            message,
            args: optionalParams,
            type: 'log',
            canHaveStacktrace: true,
        });
    }

    /**
     * Write a 'warn' level log, if the configured level allows for it.
     * Prints to `stdout` with newline.
     */
    warn(message: any, context?: string): void;
    warn(message: any, ...optionalParams: [...any, string?]): void;
    warn(message: any, ...optionalParams: any[]) {
        return this.handleLogMessage({ message, args: optionalParams, type: 'warn' });
    }

    /**
     * Write a 'debug' level log, if the configured level allows for it.
     * Prints to `stdout` with newline.
     */
    debug(message: any, context?: string): void;
    debug(message: any, ...optionalParams: [...any, string?]): void;
    debug(message: any, ...optionalParams: any[]) {
        return this.handleLogMessage({ message, args: optionalParams, type: 'debug' });
    }

    /**
     * Write a 'verbose' level log, if the configured level allows for it.
     * Prints to `stdout` with newline.
     */
    verbose(message: any, context?: string): void;
    verbose(message: any, ...optionalParams: [...any, string?]): void;
    verbose(message: any, ...optionalParams: any[]) {
        return this.handleLogMessage({ message, args: optionalParams, type: 'verbose' });
    }

    private handleLogMessage(input: HandleLogMessageInput) {
        const parsedLog = this.parseLog(input);
        const events = this.createEventsFromLog(parsedLog);
        events.forEach((e) => {
            let eventWithoutNulls: LogEventWithReplacedNulls | null = null;
            if (this.enableEventsWithoutNulls) {
                eventWithoutNulls = replaceNullsWithEmptyStrings(e);
            }

            this.transports.forEach((transport) => transport.call(e, eventWithoutNulls));
        });
    }

    private createEventsFromLog(input: Readonly<ParseLogsPayload>): LogEvent[] {
        const eventEntries = Object.entries(input);
        const formattedEventEntries: any[] = eventEntries
            .map(([key, value]) => {
                if (key === 'messages') {
                    return undefined;
                }

                if (value === undefined) {
                    return [key, null];
                }

                return [key, value];
            })
            .filter((v) => v !== undefined);

        const baseEvent = Object.freeze(Object.fromEntries(formattedEventEntries) as Omit<LogEvent, 'message'>);

        return input.messages.map((msg) => {
            const event: LogEvent = { ...baseEvent, message: msg };
            return event;
        });
    }

    private parseLog({ message, args, canHaveStacktrace, type }: HandleLogMessageInput): Readonly<ParseLogsPayload> {
        const logDate = new Date();
        const baseContext = typeof args === 'object' ? args[args.length - 1] : null;
        const argsWithoutBaseContext = args ? args.slice(0, args.length - 1) : [];
        const { messages, additionalContext, stacktrace } = this.parseLogInformation({
            message,
            args: argsWithoutBaseContext,
            canHaveStacktrace,
        });

        return {
            messages,
            additionalContext,
            stacktrace,
            baseContext,
            type,
            timestamp: logDate,
        } as const;
    }

    private parseLogInformation({
        message,
        args,
        canHaveStacktrace,
    }: Omit<HandleLogMessageInput, 'type'>): ParseLogInformationPayload {
        if (!args || args.length === 0) {
            return { messages: [message] };
        }

        if (args.length === 1) {
            if (typeof args[0] === 'string') {
                return { messages: [message], additionalContext: args[0] };
            }

            return { messages: [message, ...args] };
        }

        if (args.length > 1 && canHaveStacktrace) {
            const lastArg = args[args.length - 1];
            const preLastArg = args[args.length - 2];

            if (typeof lastArg === 'string' && typeof preLastArg === 'string') {
                return { messages: [message].concat(args.slice(0, args.length - 2)) };
            }

            if (typeof lastArg === 'string') {
                return { messages: [message].concat(args.slice(0, args.length - 1)) };
            }

            return { messages: [message, ...args] };
        }

        if (typeof args[args.length - 1] === 'string') {
            return { messages: [message].concat(args.slice(0, args.length - 1)) };
        }

        return { messages: [message, ...args] };
    }
}
