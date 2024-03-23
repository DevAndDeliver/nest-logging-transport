import { NestTransportLogger, Transport } from '../src/main';
import { INestApplication, Injectable, Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Injectable()
class MockedService {
    public readonly loggerWithoutContext = new Logger();
    public readonly loggerWithContext = new Logger(MockedService.name);
}

@Module({ providers: [MockedService] })
class ApplicationModule {}

describe('Logger (e2e)', () => {
    let mockedApp: INestApplication;
    let mockedService: MockedService;

    const mockedDate = new Date('1970');

    beforeAll(async () => {
        mockedApp = await NestFactory.create(ApplicationModule, {
            logger: new NestTransportLogger({ transports: [mockedTransport] }),
        });
        await mockedApp.init();
        mockedService = mockedApp.get<MockedService>(MockedService);

        jest.useFakeTimers();
        jest.setSystemTime(mockedDate);
    });

    afterAll(async () => {
        mockedApp && (await mockedApp.close());
        jest.useRealTimers();
    });

    afterEach(jest.resetAllMocks);

    it('should properly handle simple logs from anonymous logger', () => {
        const logString = 'simpleLog';

        for (const method of logMethods) {
            jest.resetAllMocks();
            mockedService.loggerWithoutContext[method](logString);
            expect(eventListener).toBeCalledTimes(1);
            expect(eventListener).toBeCalledWith({
                baseContext: null,
                additionalContext: null,
                message: logString,
                timestamp: mockedDate,
                type: method,
                stacktrace: null,
            });
        }
    });

    it('should properly handle logs from logger with context', () => {
        const logString = 'simpleLog';

        for (const method of logMethods) {
            jest.resetAllMocks();
            mockedService.loggerWithContext[method](logString);
            expect(eventListener).toBeCalledTimes(1);
            expect(eventListener).toBeCalledWith({
                baseContext: MockedService.name,
                additionalContext: null,
                message: logString,
                timestamp: mockedDate,
                type: method,
                stacktrace: null,
            });
        }
    });

    it('should properly parse errors when error method is called with error', () => {
        const testError = new Error();
        mockedService.loggerWithContext.error(testError);

        expect(eventListener).toBeCalledWith({
            additionalContext: null,
            baseContext: MockedService.name,
            message: `${testError}`,
            stacktrace: testError.stack,
            timestamp: mockedDate,
            type: 'error',
        });
    });

    it('should properly create log when stacktrace is passed manually', () => {
        const testError = new Error();
        const errorMessage = 'e';
        mockedService.loggerWithContext.error(errorMessage, testError.stack);

        expect(eventListener).toBeCalledWith({
            additionalContext: null,
            baseContext: MockedService.name,
            message: errorMessage,
            stacktrace: testError.stack,
            timestamp: mockedDate,
            type: 'error',
        });
    });

    it('should properly parse error with additional context', () => {
        const testError = new Error();
        const additionalContext = 'ctx';
        mockedService.loggerWithContext.error(testError, additionalContext);

        expect(eventListener).toBeCalledWith({
            additionalContext,
            message: `${testError}`,
            baseContext: MockedService.name,
            stacktrace: testError.stack,
            timestamp: mockedDate,
            type: 'error',
        });
    });

    it('should properly parse error reported using anonymous logger', () => {
        const testError = new Error();
        mockedService.loggerWithoutContext.error(testError);

        expect(eventListener).toBeCalledWith({
            additionalContext: null,
            message: `${testError}`,
            baseContext: null,
            stacktrace: testError.stack,
            timestamp: mockedDate,
            type: 'error',
        });
    });

    it('should distinguish stacktrace from context when using anonymous logger', () => {
        const ctx = 'baseCtx';
        const errorName = 'errro';
        mockedService.loggerWithoutContext.error(errorName, ctx);

        expect(eventListener).toBeCalledWith({
            additionalContext: null,
            message: errorName,
            baseContext: ctx,
            stacktrace: null,
            timestamp: mockedDate,
            type: 'error',
        });
    });

    it('should properly parse error with custom message, stacktrace and context', () => {
        const err = new Error();
        const additionalCtx = 'additionalContext';
        mockedService.loggerWithContext.error(err.name, err.stack, additionalCtx);

        expect(eventListener).toBeCalledWith({
            additionalContext: additionalCtx,
            message: err.name,
            baseContext: MockedService.name,
            stacktrace: err.stack,
            timestamp: mockedDate,
            type: 'error',
        });
    });
});

const eventListener = jest.fn();
const mockedTransport: Transport = {
    call(event) {
        eventListener(event);
    },
};

const logMethods = ['log', 'debug', 'verbose', 'warn', 'error'] as const;
