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
    protected readonly enableEventsWithoutNulls = true;

    constructor(options: NestTransportLoggerOptions) {
        const { allowEmptyTransports, transports } = options;
        if (transports.length === 0 && !allowEmptyTransports) {
            this.transports = [new DefaultTransportConsole()];
        } else {
            this.transports = transports;
        }
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
            type: 'error',
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

            // todo: think what to do about this
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.transports.forEach((transport) => transport.call(e, eventWithoutNulls!));
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

    private parseLog({ message, args, type }: HandleLogMessageInput): Readonly<ParseLogsPayload> {
        const logDate = new Date();

        let logInformation: ParseLogInformationPayload;
        if (type === 'error') {
            logInformation = this.parseLogInformation({ message, args });
        } else {
            logInformation = this.parseErrorInformation({ message, args });
        }

        const { messages, additionalContext, stacktrace, baseContext } = logInformation;

        return {
            messages,
            additionalContext,
            stacktrace,
            baseContext,
            type,
            timestamp: logDate,
        } as const;
    }

    private parseErrorInformation({
        message,
        args,
    }: Omit<HandleLogMessageInput, 'type' | 'canHaveStacktrace'>): ParseLogInformationPayload {
        if (this.isError(message)) {
            const err = message;
            const errMessage = err.message || `${err}`;
            const stacktrace = err.stack;

            if (!args || args.length === 0) {
                return {
                    messages: [errMessage],
                    stacktrace,
                };
            }

            if (args.length === 1) {
                return {
                    messages: [errMessage],
                    stacktrace,
                    baseContext: args[0],
                };
            }

            if (args.length === 2) {
                return {
                    messages: [errMessage],
                    stacktrace,
                    baseContext: args[0],
                    additionalContext: args[1],
                };
            }

            return {
                messages: [errMessage].concat(args.slice(1, args.length - 1)),
                stacktrace: args[0],
                baseContext: args[args.length - 1],
            };
        }

        if (!args || args.length === 0) {
            return { messages: [message] };
        }

        if (args.length === 1) {
            // This happens either when anonymous logger has log with stacktrace
            // or when named logger has simple string log. Since we cannot distinguish them,
            // we will treat it as named logger
            return { messages: [message], baseContext: args[0] };
        }

        if (args.length === 2) {
            return { messages: [message], baseContext: args[args.length - 1], stacktrace: args[0] };
        }

        // args.length > 2
        return {
            messages: [message].concat(args.slice(1, args.length - 1)),
            baseContext: args[args.length - 1],
            stacktrace: args[0],
        };
    }

    private parseLogInformation({
        message,
        args: baseArgs = [],
    }: Omit<HandleLogMessageInput, 'type'>): ParseLogInformationPayload {
        const probableContext = typeof baseArgs === 'object' ? baseArgs[baseArgs.length - 1] : null;
        const baseContext = typeof probableContext === 'string' ? probableContext : undefined;
        const args = baseContext ? baseArgs.slice(0, baseArgs.length - 1) : baseArgs;

        if (!args || args.length === 0) {
            return { messages: [message], baseContext };
        }

        if (args.length === 1) {
            if (typeof args[0] === 'string') {
                return { messages: [message], additionalContext: args[0], baseContext };
            }

            return { messages: [message, ...args], baseContext };
        }

        if (typeof args[args.length - 1] === 'string') {
            return { messages: [message].concat(args.slice(0, args.length - 1)), baseContext };
        }

        return { messages: [message, ...args], baseContext };
    }

    private isError(val: unknown | Error): val is Error {
        const errorVal = <Error>val;
        return errorVal && !!(errorVal.stack || errorVal.name || errorVal.message || errorVal instanceof Error);
    }
}
