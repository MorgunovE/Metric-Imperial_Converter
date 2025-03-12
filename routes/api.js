'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

    let convertHandler = new ConvertHandler();

    app.get('/api/convert', (req, res) => {
        const input = req.query.input;
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.getUnit(input);

        if (initNum === 'invalid number' && initUnit === 'invalid unit') {
            return res.send('invalid number and unit');
        }
        if (initNum === 'invalid number') {
            return res.send('invalid number');
        }
        if (initUnit === 'invalid unit') {
            return res.send('invalid unit');
        }

        const returnNum = convertHandler.convert(initNum, initUnit);
        const returnUnit = convertHandler.getReturnUnit(initUnit);
        const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        const response = {
            initNum,
            initUnit,
            returnNum,
            returnUnit,
            string
        };

        // Log both the string and full JSON response to console
        console.log(string);
        console.log(JSON.stringify(response));

        res.json(response);
    });

};
