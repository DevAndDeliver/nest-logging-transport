import { LogEvent, Transport } from '../interfaces/transport';

export class TransportJson implements Transport {
    public call(event: LogEvent): void {
        const stringifiedEvent = this.stringify(event);
        process.stdout.write(`${stringifiedEvent}\n`);
    }

    private stringify(event: LogEvent) {
        try {
            return JSON.stringify(event);
        } catch (_e) {
            return `${event}`;
        }
    }
}
