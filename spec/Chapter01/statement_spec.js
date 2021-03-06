const statement = require('../../src/chapter01/statement');

describe('Statement', function () {
    const playsJson = {
        "hamlet": {"name": "Hamlet", "type": "tragedy"},
        "as-like": {"name": "As You Like It", "type": "comedy"},
        "othello": {"name": "Othello", "type": "tragedy"}
    };
    describe('one tragedy play with no attendees', function () {
        it('returns base value and 0 credits', function () {
            let invoiceJson = {
                "customer": "NoShowCo",
                "performances": [
                    {
                        "playID": "hamlet",
                        "audience": 0
                    }
                ]
            };
            expect(statement(invoiceJson, playsJson)).toEqual(
                'Statement for NoShowCo\n' +
                ' Hamlet: $400.00 (0 seats)\n' +
                'Amount owed is $400.00\n' +
                'You earned 0 credits\n'
            )
        });
    });
    describe('one comedy play with no attendees', function () {
        it('returns base value and 0 credits', function () {
            let invoiceJson = {
                "customer": "NoShowCo",
                "performances": [
                    {
                        "playID": "as-like",
                        "audience": 0
                    }
                ]
            };
            expect(statement(invoiceJson, playsJson)).toEqual(
                'Statement for NoShowCo\n' +
                ' As You Like It: $300.00 (0 seats)\n' +
                'Amount owed is $300.00\n' +
                'You earned 0 credits\n'
            )
        });
    });
    describe('one tragedy, one comedy with no attendees', function () {
        it('returns sum of base values and 0 credits', function () {
            let invoiceJson = {
                "customer": "NoShowCo",
                "performances": [
                    {
                        "playID": "hamlet",
                        "audience": 0
                    },
                    {
                        "playID": "as-like",
                        "audience": 0
                    }
                ]
            };
            expect(statement(invoiceJson, playsJson)).toEqual(
                'Statement for NoShowCo\n' +
                ' Hamlet: $400.00 (0 seats)\n' +
                ' As You Like It: $300.00 (0 seats)\n' +
                'Amount owed is $700.00\n' +
                'You earned 0 credits\n'
            )
        });
    });
    describe('one tragedy play with base + 1 attendees', function () {
        it('returns bonus for 1 extra attendee and 1 credit', function () {
            let invoiceJson = {
                "customer": "PlentyShowCo",
                "performances": [
                    {
                        "playID": "hamlet",
                        "audience": 31
                    }
                ]
            };
            expect(statement(invoiceJson, playsJson)).toEqual(
                'Statement for PlentyShowCo\n' +
                ' Hamlet: $410.00 (31 seats)\n' +
                'Amount owed is $410.00\n' +
                'You earned 1 credits\n'
            )
        });
    });
    describe('one comedy play with 5 attendees', function () {
        it('returns base value and bonus and 1 credit', function () {
            let invoiceJson = {
                "customer": "SomeShowCo",
                "performances": [
                    {
                        "playID": "as-like",
                        "audience": 5
                    }
                ]
            };
            expect(statement(invoiceJson, playsJson)).toEqual(
                'Statement for SomeShowCo\n' +
                ' As You Like It: $315.00 (5 seats)\n' +
                'Amount owed is $315.00\n' +
                'You earned 1 credits\n'
            )
        });
    });
    describe('one comedy play with 21 attendees', function () {
        it('returns base value and bonus and 4 credits', function () {
            let invoiceJson = {
                "customer": "SomeShowCo",
                "performances": [
                    {
                        "playID": "as-like",
                        "audience": 21
                    }
                ]
            };
            expect(statement(invoiceJson, playsJson)).toEqual(
                'Statement for SomeShowCo\n' +
                ' As You Like It: $468.00 (21 seats)\n' +
                'Amount owed is $468.00\n' +
                'You earned 4 credits\n'
            )
        });
    });
    describe("multiple plays with attendances greater than bases", function () {
        it('returns bonus values and credits', function() {
            let invoiceJson = {
                "customer": "BigCo",
                "performances": [
                    {
                        "playID": "hamlet",
                        "audience": 55
                    },
                    {
                        "playID": "as-like",
                        "audience": 35
                    },
                    {
                        "playID": "othello",
                        "audience": 40
                    }
                ]
            };
            expect(statement(invoiceJson, playsJson)).toEqual(
                'Statement for BigCo\n' +
                ' Hamlet: $650.00 (55 seats)\n' +
                ' As You Like It: $580.00 (35 seats)\n' +
                ' Othello: $500.00 (40 seats)\n' +
                'Amount owed is $1,730.00\n' +
                'You earned 47 credits\n'
            )
        });
    });
});
