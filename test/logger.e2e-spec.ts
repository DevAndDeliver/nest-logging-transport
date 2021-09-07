import { NestTransportLogger, Transport } from '@/main';
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

        jest.useFakeTimers('modern');
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

    it('should properly parse errors when error method is called', () => {
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
});

const eventListener = jest.fn();
const mockedTransport: Transport = {
    call(event) {
        eventListener(event);
    },
};

const logMethods = ['log', 'debug', 'verbose', 'warn', 'error'] as const;
