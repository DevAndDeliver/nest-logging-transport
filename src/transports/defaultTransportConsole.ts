import { LogEvent, LogEventWithReplacedNulls, Transport } from '@/interfaces/transport';

export class DefaultTransportConsole implements Transport {
    call(_e: LogEvent, eventWithoutNulls: LogEventWithReplacedNulls | null) {
        if (!eventWithoutNulls) {
            throw new Error('enableEventsWithoutNulls to use this logger');
        }
        const { message, additionalContext, stacktrace, baseContext, logSource, timestamp } = eventWithoutNulls;
        let context = `[${baseContext || 'Application'}]`;
        if (additionalContext) {
            context = `${context}[${additionalContext}]`;
        }
        const logLevel = logSource.toUpperCase();
        const logString = `${+timestamp} ${logLevel} ${context} ${message}\n${stacktrace}`;
        process.stdout.write(logString);
    }
}
