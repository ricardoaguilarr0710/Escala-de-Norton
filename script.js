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

const patientNameInput = document.getElementById('patientName');
const patientAgeInput = document.getElementById('patientAge');
const patientDobInput = document.getElementById('patientDob');
const wardInput = document.getElementById('ward');
const dateInput = document.getElementById('date');

const printPatientName = document.getElementById('printPatientName');
const printPatientAge = document.getElementById('printPatientAge');
const printPatientDob = document.getElementById('printPatientDob');
const printWard = document.getElementById('printWard');
const printDate = document.getElementById('printDate');
const printRiskResult = document.getElementById('printRiskResult');

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

function calculateAgeFromDob(dateString) {
  if (!dateString) return '—';

  const dob = new Date(dateString);
  if (Number.isNaN(dob.getTime())) return '—';

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }

  return `${age} años`;
}

function formatDate(dateString) {
  if (!dateString) return '—';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

function updatePrintSummary() {
  const total = getTotalScore();
  const risk = getRiskInterpretation(total);

  printPatientName.textContent = patientNameInput.value.trim() || '—';
  printPatientAge.textContent = patientAgeInput.value.trim() || calculateAgeFromDob(patientDobInput.value);
  printPatientDob.textContent = formatDate(patientDobInput.value) || '—';
  printWard.textContent = wardInput.value.trim() || '—';
  printDate.textContent = formatDate(dateInput.value) || '—';
  printRiskResult.textContent = `${risk.label} (${total} pts)`;
}

function updateAssessment() {
  const total = getTotalScore();
  const risk = getRiskInterpretation(total);

  scoreValue.textContent = total;
  riskLevel.textContent = risk.label;
  riskLevel.className = `risk-pill ${risk.className}`;

  updatePrintSummary();
}

formFields.forEach((field) => {
  document.querySelectorAll(`input[name="${field}"]`).forEach((input) => {
    input.addEventListener('change', updateAssessment);
  });
});

[patientNameInput, patientAgeInput, patientDobInput, wardInput, dateInput].forEach((input) => {
  if (input) {
    input.addEventListener('input', updatePrintSummary);
    input.addEventListener('change', updatePrintSummary);
  }
});

resetBtn.addEventListener('click', () => {
  formFields.forEach((field) => {
    const firstOption = document.querySelector(`input[name="${field}"]`);
    if (firstOption) firstOption.checked = true;
  });
  updateAssessment();
});

updateAssessment();
