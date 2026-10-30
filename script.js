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
const printBtn = document.getElementById('printBtn');

function getTotalScore() {
  return formFields.reduce((sum, field) => {
    const selected = document.querySelector(`input[name="${field}"]:checked`);
    return sum + Number(selected?.value || 0);
  }, 0);
}

function getRiskInterpretation(score) {
  const safeScore = Math.max(0, Math.min(20, Number(score) || 0));

  if (safeScore >= 18) {
    return { label: 'Bajo', className: 'low', key: 'low' };
  }
  if (safeScore >= 14) {
    return { label: 'Moderado', className: 'moderate', key: 'moderate' };
  }
  if (safeScore >= 10) {
    return { label: 'Alto', className: 'high', key: 'high' };
  }

  return { label: 'Muy alto', className: 'critical', key: 'critical' };
}

function updateAssessment() {
  const total = getTotalScore();
  const risk = getRiskInterpretation(total);

  scoreValue.textContent = total;
  riskLevel.textContent = risk.label;
  riskLevel.className = `risk-pill ${risk.className}`;
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

printBtn.addEventListener('click', () => {
  window.print();
});

updateAssessment();
