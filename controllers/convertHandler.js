function ConvertHandler() {

  this.getNum = function(input) {
    if (!input) return 1;

    // Strip URL prefix if users accidentally paste the full URL
    if (input.includes('/api/convert?input=')) {
      input = input.substring(input.indexOf('=') + 1);
    }

    // If input only contains unit with no number
    if (/^[a-zA-Z]+$/.test(input)) return 1;

    // Find where the unit begins
    const unitIndex = input.search(/[a-zA-Z]/);

    // No number provided
    if (unitIndex === 0) return 1;

    // No unit found - try to parse the whole string as a number
    if (unitIndex === -1) {
      return this.parseNumber(input);
    }

    // Extract the numeric part
    const numStr = input.substring(0, unitIndex);
    return this.parseNumber(numStr);
  };

  this.parseNumber = function(str) {
    // Handle fractions
    if (str.includes('/')) {
      const parts = str.split('/');
      if (parts.length !== 2) return 'invalid number';

      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);

      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }

      return numerator / denominator;
    }

    // Handle regular numbers
    const num = parseFloat(str);
    return isNaN(num) ? 'invalid number' : num;
  };

  this.getUnit = function(input) {
    if (!input) return 'invalid unit';

    // Strip URL prefix if users accidentally paste the full URL
    if (input.includes('/api/convert?input=')) {
      input = input.substring(input.indexOf('=') + 1);
    }

    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);

    if (!match) return 'invalid unit';

    const unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) return 'invalid unit';

    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversionRates = {
      'gal': galToL,
      'L': 1 / galToL,
      'mi': miToKm,
      'km': 1 / miToKm,
      'lbs': lbsToKg,
      'kg': 1 / lbsToKg
    };

    return parseFloat((initNum * conversionRates[initUnit]).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };


}

module.exports = ConvertHandler;
