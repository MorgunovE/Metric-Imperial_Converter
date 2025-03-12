function ConvertHandler() {
  
  this.getNum = function(input) {
    if (!input) return 1;
    
    // Find where the unit starts (first letter)
    const letterIndex = input.search(/[a-zA-Z]/);
    
    // If no number or unit starts at beginning, return 1
    if (letterIndex === 0 || letterIndex === -1) return 1;
    
    // Extract the number part
    const numStr = input.substring(0, letterIndex);
    
    // Check for double fraction (invalid)
    if ((numStr.match(/\//g) || []).length > 1) {
      return "invalid number";
    }
    
    // Process fraction or decimal
    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/');
      
      if (denominator === '0' || parseFloat(denominator) === 0) {
        return "invalid number"; // Division by zero
      }
      
      return parseFloat(numerator) / parseFloat(denominator);
    } else {
      const num = parseFloat(numStr);
      return isNaN(num) ? "invalid number" : num;
    }
  };
  
  this.getUnit = function(input) {
    if (!input) return 'invalid unit';
    
    // Find where the unit starts
    const letterIndex = input.search(/[a-zA-Z]/);
    
    // If no letters, return invalid unit
    if (letterIndex === -1) return 'invalid unit';
    
    // Extract the unit
    let unit = input.substring(letterIndex);
    
    // Normalize to lowercase for validation
    const normalizedUnit = unit.toLowerCase();
    
    // Check if unit is valid
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(normalizedUnit)) {
      return 'invalid unit';
    }
    
    // Return unit with proper case (L for liter, others lowercase)
    return normalizedUnit === 'l' ? 'L' : normalizedUnit;
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
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return unitNames[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'invalid unit';
    }
    
    // Round to 5 decimal places
    return Math.round(result * 100000) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;