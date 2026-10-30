const formFields = [
  'physical',
  'mental',
  'activity',
  'mobility',
  'incontinence'
];

const scoreValue = document.getElementById('scoreValue');
const riskLevel = document.getElementById('riskLevel');
const resetBtn = document.getElementById('resetBtn');

function getTotalScore() {
  return formFields.reduce((sum, field) => {
    const selected = document.querySelector(`input[name="${field}"]:checked`);
    return sum + Number(selected?.value || 0);
  }, 0);
}

function getRiskInterpretation(score) {
  if (score >= 18) {
    return { label: 'Bajo', className: 'low' };
  }
  if (score >= 14) {
    return { label: 'Moderado', className: 'moderate' };
  }
  if (score >= 10) {
    return { label: 'Alto', className: 'high' };
  }
  return { label: 'Muy alto', className: 'critical' };
}

function updateAssessment() {
  const total = getTotalScore();
  const risk = getRiskInterpretation(total);

  scoreValue.textContent = total;
  riskLevel.textContent = risk.label;
  riskLevel.className = `risk-level ${risk.className}`;
}

formFields.forEach((field) => {
  document.querySelectorAll(`input[name="${field}"]`).forEach((input) => {
    input.addEventListener('change', updateAssessment);
  });
});

resetBtn.addEventListener('click', () => {
  formFields.forEach((field) => {
    const firstOption = document.querySelector(`input[name="${field}"]`);
    if (firstOption) firstOption.checked = true;
  });
  updateAssessment();
});

updateAssessment();
