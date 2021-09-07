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

    beforeAll(async () => {
        mockedApp = await NestFactory.create(ApplicationModule, {
            logger: new NestTransportLogger({ transports: [mockedTransport] }),
            bufferLogs: true,
        });
        await mockedApp.init();
        mockedService = mockedApp.get<MockedService>(MockedService);
    });

    afterAll(async () => {
        mockedApp && (await mockedApp.close());
    });

    afterEach(jest.resetAllMocks);

    it('should add context to logs created using anonymous logger', () => {
        const logString = 'simpleLog';
        for (const method of logMethods) {
            jest.resetAllMocks();
            mockedService.loggerWithoutContext[method](logString);
            expect(eventListener).toBeCalledTimes(1);
            expect(eventListener).toBeCalledWith({});
        }
    });
});

const eventListener = jest.fn();
const mockedTransport: Transport = {
    call(event) {
        console.log('*************\n***********');
        eventListener(event);
    },
};

const logMethods = ['log', 'debug', 'verbose', 'warn', 'error'] as const;
