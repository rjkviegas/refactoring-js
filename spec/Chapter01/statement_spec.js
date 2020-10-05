const statement = require('../../src/Chapter01/statement');

describe('Statement', function () {
    const playsJson = {
        "hamlet": {"name": "Hamlet", "type": "tragedy"},
        "as-like": {"name": "As You Like It", "type": "comedy"},
        "othello": {"name": "Othello", "type": "tragedy"}
    };
    const invoicesJson = [
        {
            "customer": "SmallCo",
            "performances": [
                {
                    "playID": "hamlet",
                    "audience": 10
                },
                {
                    "playID": "as-like",
                    "audience": 10
                },
                {
                    "playID": "othello",
                    "audience": 10
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
    it('multiple plays and no bonus payments due to attendance', function () {
        expect(statement(invoicesJson[0], playsJson)).toEqual(
            'Statement for SmallCo\n' +
            ' Hamlet: $400.00 (10 seats)\n' +
            ' As You Like It: $330.00 (10 seats)\n' +
            ' Othello: $400.00 (10 seats)\n' +
            'Amount owed is $1,130.00\n' +
            'You earned 2 credits\n'
        )
    })
    it("multiple plays and all require bonus payments due to attendance", function () {
        expect(statement(invoicesJson[1], playsJson)).toEqual(
            'Statement for BigCo\n' +
            ' Hamlet: $650.00 (55 seats)\n' +
            ' As You Like It: $580.00 (35 seats)\n' +
            ' Othello: $500.00 (40 seats)\n' +
            'Amount owed is $1,730.00\n' +
            'You earned 47 credits\n'
        )
    })
})
