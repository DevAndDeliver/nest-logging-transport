# Nest-logging-transport

Logger for [NestJS](https://nestjs.com/) framework allowing you to
use custom transports (or use predefined ones).

## Installation

yarn:

```sh
yarn add nest-logging-transport
```

npm:

```sh
npm i nest-logging-transport
```

## Usage

Nest-logging-transport allows you to either define your own transport, or use predefined ones.

Example with predefined transport:

```ts
import { NestTransportLogger, DefaultTransportConsole } from 'nest-logging-transport';

const customLogger = new NestTransportLogger({
    transports: [new DefaultTransportConsole()],
});

const bootstrap = async () => {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(ExampleModule, { logger: customLogger });
    logger.log('Application ready');
    [...]
    await app.listen(3334, () => logger.log('Server listening'));
};
```

From this moment all log calls will be redirected to `NestTransportLogger` instance and then
to each transport defined in instance constructor.

### Creating own transport

Creating own transport required implementing all methods from interface `Transport`.
To do it, simply create new object (or class):

```ts
import { Transport, LogEvent, LogEventWithReplacedNulls } from 'nest-logging-transport';

const customTransport = {
    log(event: LogEvent, eventWithoutNulls: LogEventWithReplacedNulls) {
        // [...]
    }
    // [...]
}
```

You can find examples in [src/transports](./src/transports/).

#### Difference between log events

To make operating on logs easier there is event with nulls replaced with empty strings `''`.
Normal log:

```js
{
  additionalContext: null,
  stacktrace: null,
  baseContext: 'Bootstrap',
  type: 'log',
  timestamp: 2022-03-23T19:26:59.295Z,
  message: 'Server listening'
}
```

Log with replaces nulls:

```js
{
  additionalContext: '',
  stacktrace: '',
  baseContext: 'Bootstrap',
  type: 'log',
  timestamp: 2022-03-23T19:26:59.295Z,
  message: 'Server listening'
}
```

Log functions in your logger can take event with nulls as first argument and without
nulls as the second one.
