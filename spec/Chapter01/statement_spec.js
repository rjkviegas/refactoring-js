const statement = require('../../src/chapter01/statement');

describe('Statement', function () {
    const playsJson = {
        "hamlet": {"name": "Hamlet", "type": "tragedy"},
        "as-like": {"name": "As You Like It", "type": "comedy"},
        "othello": {"name": "Othello", "type": "tragedy"}
    };
    const invoicesJson = [
        {
            "customer": "NoShowCo",
            "performances": [
                {
                    "playID": "hamlet",
                    "audience": 0
                }
            ]
        },
        {
            "customer": "NoShowCo",
            "performances": [
                {
                    "playID": "as-like",
                    "audience": 0
                }
            ]
        },
        {
            "customer": "SmallCo",
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
        },
        {
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
        }
    ]
    it('one tragedy play with no attendees', function () {
        expect(statement(invoicesJson[0], playsJson)).toEqual(
            'Statement for NoShowCo\n' +
            ' Hamlet: $400.00 (0 seats)\n' +
            'Amount owed is $400.00\n' +
            'You earned 0 credits\n'
        )
    })
    it('one comedy play with no attendees', function () {
        expect(statement(invoicesJson[1], playsJson)).toEqual(
            'Statement for NoShowCo\n' +
            ' As You Like It: $300.00 (0 seats)\n' +
            'Amount owed is $300.00\n' +
            'You earned 0 credits\n'
        )
    })
    it('one tragedy, one comedy and no bonus payments', function () {
        expect(statement(invoicesJson[2], playsJson)).toEqual(
            'Statement for SmallCo\n' +
            ' Hamlet: $400.00 (0 seats)\n' +
            ' As You Like It: $300.00 (0 seats)\n' +
            'Amount owed is $700.00\n' +
            'You earned 0 credits\n'
        )
    })
    it("multiple plays and all require bonus payments due to attendance", function () {
        expect(statement(invoicesJson[3], playsJson)).toEqual(
            'Statement for BigCo\n' +
            ' Hamlet: $650.00 (55 seats)\n' +
            ' As You Like It: $580.00 (35 seats)\n' +
            ' Othello: $500.00 (40 seats)\n' +
            'Amount owed is $1,730.00\n' +
            'You earned 47 credits\n'
        )
    })
})
