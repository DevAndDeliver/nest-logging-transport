import { NestTransportLogger } from '../src/logger';
import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DefaultTransportConsole } from '@/transports/defaultTransportConsole';

@Module({})
class ExampleModule {}

const customLogger = new NestTransportLogger({
    transports: [new DefaultTransportConsole()],
    enableEventsWithoutNulls: true,
});

const bootstrap = async () => {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(ExampleModule, { logger: customLogger, bufferLogs: true });
    logger.log('Application ready');
    logger.verbose('Just a test log with context', 'thisIsContext');
    await app.listen(3334, () => logger.log('Server listening'));
};

bootstrap();
