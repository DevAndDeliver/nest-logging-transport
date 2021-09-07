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
    timestamp: 'white',
    stacktrace: 'white',
} as const;

export class DefaultTransportConsole implements Transport {
    private readonly colorSchema = defaultColorSchema;

    public call(_e: LogEvent, eventWithoutNulls: LogEventWithReplacedNulls): void {
        const { message, additionalContext, stacktrace, baseContext, type, timestamp } = eventWithoutNulls;
        let context = this.colorize(`[${baseContext || 'Application'}]`, 'mainContext');
        if (additionalContext) {
            context += this.colorize(`[${additionalContext}]`, 'additionalContext');
        }

        const formattedStacktrace = stacktrace ? this.colorize(`${stacktrace}\n`, 'stacktrace') : stacktrace;
        const logLevel = type.toUpperCase();
        const formattedLogLevel = this.colorize(addPadding(logLevel, LONGEST_LOG_LEVEL_NAME - logLevel.length), type);
        const formattedTimestamp = this.colorize(timestamp.toLocaleString(), 'timestamp');
        const formattedMessage = this.colorize(message, type);

        const logString = `[Nest] ${process.pid} - ${formattedTimestamp} ${formattedLogLevel} ${context} ${formattedMessage}\n${formattedStacktrace}`;
        const colorizedLogString = this.colorize(logString, type);
        process.stdout.write(colorizedLogString);
    }

    private colorize(text: string, type: keyof typeof defaultColorSchema): string {
        const color = this.colorSchema[type];
        return text[color];
    }
}
