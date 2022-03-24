import { LogEvent } from '@/interfaces/transport';
import { addPadding, replaceNullsWithEmptyStrings } from './log.utils';

describe('Log utils', () => {
    describe(replaceNullsWithEmptyStrings.name, () => {
        it('does nothing if object has no nulls', () => {
            const objectWithNoNulls: LogEvent = {
                message: 'not null',
                additionalContext: 'indeed',
                timestamp: new Date('1970-01-01'),
                stacktrace: 'staktrejs',
                baseContext: 'not null aslo',
                type: 'error',
            };

            expect(replaceNullsWithEmptyStrings(objectWithNoNulls)).toStrictEqual(objectWithNoNulls);
        });

        it('should replace all nulls with empty strings', () => {
            const objectWithNulls: LogEvent = {
                message: 'not null',
                additionalContext: null,
                timestamp: new Date('1970-01-01'),
                stacktrace: null,
                baseContext: null,
                type: 'error',
            };

            const expectedResult = {
                ...objectWithNulls,
                additionalContext: '',
                stacktrace: '',
                baseContext: '',
            };

            expect(replaceNullsWithEmptyStrings(objectWithNulls)).toStrictEqual(expectedResult);
        });
    });

    describe(addPadding.name, () => {
        it('should not do anything if padding is set to 0', () => {
            expect(addPadding('test', 0)).toBe('test');
        });

        it('should properly add padding', () => {
            expect(addPadding('test', 2)).toStrictEqual('  test');
        });

        it('should throw an error when padding is less than 0', () => {
            expect(() => addPadding('test', -1)).toThrow(RangeError);
        });
    });
});
