import { LogEvent, LogEventWithReplacedNulls, Transport } from '@/interfaces/transport';
import { addPadding, LONGEST_LOG_LEVEL_NAME } from '@/utils/log.utils';
import 'colors';

const defaultColorSchema = {
    verbose: 'cyan',
    warn: 'yellow',
    log: 'green',
    debug: 'magenta',
    error: 'red',
    mainContext: 'yellow',
    additionalContext: 'yellow',
} as const;

export class DefaultTransportConsole implements Transport {
    private readonly colorSchema = defaultColorSchema;

    public call(_e: LogEvent, eventWithoutNulls: LogEventWithReplacedNulls | null): void {
        if (!eventWithoutNulls) {
            throw new Error('set enableEventsWithoutNulls to true in order to use this logger');
        }
        const { message, additionalContext, stacktrace, baseContext, type, timestamp } = eventWithoutNulls;
        let context = this.colorize(`[${baseContext || 'Application'}]`, 'mainContext');
        if (additionalContext) {
            context += this.colorize(`[${additionalContext}]`, 'additionalContext');
        }

        const logLevel = type.toUpperCase();
        const colorizedLogLevel = this.colorize(logLevel, type);
        const formattedLogLevel = addPadding(colorizedLogLevel, LONGEST_LOG_LEVEL_NAME - logLevel.length);
        const colorizedMessage = this.colorize(message, type);

        const logString = `${+timestamp} ${formattedLogLevel} ${context} ${colorizedMessage}\n${stacktrace}`;
        process.stdout.write(logString);
    }

    private colorize(text: string, type: keyof typeof defaultColorSchema): string {
        const color = this.colorSchema[type];
        return text[color];
    }
}
