function generateBalanceSheet(revenueData, expenseData) {
    const balanceSheet = {};
    
    revenueData.forEach(revenueEntry => {
      const monthKey = revenueEntry.startDate.slice(0, 7);
      balanceSheet[monthKey] = (balanceSheet[monthKey] || 0) + revenueEntry.amount;
    });
    
    expenseData.forEach(expenseEntry => {
      const monthKey = expenseEntry.startDate.slice(0, 7);
      balanceSheet[monthKey] = (balanceSheet[monthKey] || 0) - expenseEntry.amount;
    });
    ``
    // Fill in missing months with zero amount
    const startDate = revenueData.concat(expenseData).reduce((min, entry) => {
      return entry.startDate < min ? entry.startDate : min;
    }, "9999-12-31T00:00:00.000Z");
    const endDate = revenueData.concat(expenseData).reduce((max, entry) => {
      return entry.startDate > max ? entry.startDate : max;
    }, "0000-01-01T00:00:00.000Z");
    
    const sortedBalanceSheet = [];
    const currentDate = new Date(startDate);
  
    while (currentDate.toISOString().slice(0, 7) <= endDate.slice(0, 7)) {
      const monthKey = currentDate.toISOString().slice(0, 7);
      sortedBalanceSheet.push({
        startDate: monthKey + "-01T00:00:00.000Z",
        amount: balanceSheet[monthKey] || 0
      });
      currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
    }
  
    return sortedBalanceSheet;
}
  
function main() {
try {
    // Sample input data
    const inputData = require('./input.json');

    const { revenueData, expenseData } = inputData;
    const balanceSheet = generateBalanceSheet(revenueData, expenseData);
    const outputData = { balance: balanceSheet };

    // Output the result
    console.log(JSON.stringify(outputData, null, 2));
} catch (error) {
    console.error("An error occurred:", error.message);
}
}

if (require.main === module) {
main();
}
