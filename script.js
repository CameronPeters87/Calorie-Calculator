function calculateCalories() {
  const gender = document.getElementById('gender').value;
  const age = parseInt(document.getElementById('age').value);
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const activity = parseFloat(document.getElementById('activity').value);
  const goal = document.getElementById('goal').value;

  // BMR (Mifflin-St Jeor)
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // TDEE
  const tdee = bmr * activity;

  let targetCalories;
  if (goal === 'fatloss') targetCalories = tdee * 0.8;
  else if (goal === 'gain') targetCalories = tdee * 1.15;
  else targetCalories = tdee;

  // Macros (P 30%, C 40%, F 30%)
  const protein = (targetCalories * 0.3) / 4;
  const carbs = (targetCalories * 0.4) / 4;
  const fats = (targetCalories * 0.3) / 9;

  // Deficit table
  const deficit10 = tdee * 0.9;
  const deficit15 = tdee * 0.85;
  const deficit20 = tdee * 0.8;
  const deficit25 = tdee * 0.75;

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <h2>Results</h2>
    <p><strong>BMR:</strong> ${bmr.toFixed(0)} kcal/day</p>
    <p><strong>TDEE (Maintenance):</strong> ${tdee.toFixed(0)} kcal/day</p>
    <p><strong>Target Calories (${goal.toUpperCase()}):</strong> ${targetCalories.toFixed(0)} kcal/day</p>
    <h3>Macronutrients</h3>
    <ul>
      <li>Protein: ${protein.toFixed(0)} g</li>
      <li>Carbohydrates: ${carbs.toFixed(0)} g</li>
      <li>Fats: ${fats.toFixed(0)} g</li>
    </ul>

    <h3>Calorie Deficit Guide</h3>
    <table>
      <tr><th>Deficit</th><th>Calories/day</th><th>Approx. Weekly Loss</th></tr>
      <tr><td>10%</td><td>${deficit10.toFixed(0)} kcal</td><td>≈0.25 kg</td></tr>
      <tr><td>15%</td><td>${deficit15.toFixed(0)} kcal</td><td>≈0.4 kg</td></tr>
      <tr><td><strong>20%</strong></td><td><strong>${deficit20.toFixed(0)} kcal</strong></td><td><strong>≈0.5–0.75 kg</strong></td></tr>
      <tr><td>25%</td><td>${deficit25.toFixed(0)} kcal</td><td>≈1 kg</td></tr>
    </table>
  `;
}
