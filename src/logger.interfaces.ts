import { LogLevel } from '@nestjs/common';
import { Transport } from './interfaces/transport';

export interface NestTransportLoggerOptions {
    transports: Transport[];
    allowEmptyTransports?: boolean;
}

export interface HandleLogMessageInput {
    message: any;
    args?: any[];
    canHaveStacktrace?: boolean;
    type: LogLevel;
}

export interface ParseLogInformationPayload {
    messages: any[];
    stacktrace?: string;
    additionalContext?: string;
    baseContext?: string;
}

export interface ParseLogsPayload {
    messages: any[];
    additionalContext?: string;
    stacktrace?: string;
    baseContext: any;
    type: LogLevel;
    timestamp: Date;
}
