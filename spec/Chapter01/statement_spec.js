const statement = require('../../src/Chapter01/statement');

describe("Default data test", function () {
    const playsJson = {
        "hamlet": {"name": "Hamlet", "type": "tragedy"},
        "as-like": {"name": "As You Like It", "type": "comedy"},
        "othello": {"name": "Othello", "type": "tragedy"}
    };
    const invoicesJson = [
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
    it("should print a statement for multiple plays, single customer and multiple seats in plain text'", function () {
        expect(statement(invoicesJson[0], playsJson)).toEqual(
            "Statement for BigCo\n" +
            " Hamlet: $650.00 (55 seats)\n" +
            " As You Like It: $580.00 (35 seats)\n" +
            " Othello: $500.00 (40 seats)\n" +
            "Amount owed is $1,730.00\n" +
            "You earned 47 credits\n"
        )
    })
})
