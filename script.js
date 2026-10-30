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
const diagnosticList = document.getElementById('diagnosticList');
const careList = document.getElementById('careList');
const resultText = document.getElementById('resultText');

const carePlans = {
  low: {
    label: 'Bajo',
    className: 'low',
    summary: 'El paciente presenta riesgo bajo de úlcera por presión; mantener vigilancia continua y medidas preventivas habituales.',
    diagnostics: [
      'Riesgo de integridad cutánea comprometida',
      'Riesgo de movilidad física deteriorada',
      'Riesgo de incontinencia funcional'
    ],
    cares: [
      'Mantener evaluación cutánea cada turno y documentar cambios.',
      'Promover movilización activa y cambios posturales con frecuencia.',
      'Asegurar higiene, secado y protección de la piel ante humedad.',
      'Educar al paciente y familia sobre prevención de úlceras por presión.'
    ]
  },
  moderate: {
    label: 'Moderado',
    className: 'moderate',
    summary: 'El paciente presenta riesgo moderado; requiere vigilancia activa y medidas preventivas más estrictas para evitar lesiones por presión.',
    diagnostics: [
      'Riesgo de integridad cutánea alterada',
      'Movilidad física deteriorada relacionada con limitación de la actividad',
      'Riesgo de incontinencia asociada a dependencia para el cuidado personal'
    ],
    cares: [
      'Revisar puntos de presión, prominencias óseas y signos de hiperemia cada 2-4 horas.',
      'Implementar reposicionamiento cada 2 horas y utilizar superficies protectoras.',
      'Controlar humedad por sudoración, orina o heces con cuidado de piel y protección.',
      'Fomentar la participación del paciente en la movilización con ayuda según su capacidad.'
    ]
  },
  high: {
    label: 'Alto',
    className: 'high',
    summary: 'El paciente tiene riesgo alto de desarrollar úlcera por presión; es necesario reforzar el cuidado de la piel y la prevención activa.',
    diagnostics: [
      'Integridad de la piel alterada',
      'Deterioro de la movilidad',
      'Autocuidado deficitario',
      'Riesgo de infección asociado a lesión cutánea'
    ],
    cares: [
      'Establecer protocolo de cuidado de piel con inspección diaria, limpieza y secado.',
      'Mantener cambios de posición cada 1-2 horas y registrar respuesta cutánea.',
      'Usar colchón o dispositivos de alivio de presión según indicación médica.',
      'Valorar dolor, enrojecimiento, edema o lesión en zonas de apoyo y comunicar hallazgos.'
    ]
  },
  critical: {
    label: 'Muy alto',
    className: 'critical',
    summary: 'El paciente presenta riesgo muy alto de lesión por presión; requiere atención inmediata, prevención intensiva y seguimiento cercano.',
    diagnostics: [
      'Integridad de la piel alterada con riesgo elevado de lesión',
      'Movilidad física deteriorada severa',
      'Autocuidado deficiente',
      'Riesgo de infección y complicaciones asociadas a inmovilidad'
    ],
    cares: [
      'Activar medidas intensivas de prevención: reposicionamiento frecuente, controles de piel y evaluación continua.',
      'Coordinar con médico y equipo de enfermería para soporte de movilidad y prevención de úlceras.',
      'Asegurar higiene íntima, cuidado de incontinencia y protección de la piel.',
      'Reforzar educación a familia y personal de cuidado para evitar fricción, presión y humedad.'
    ]
  }
};

function getTotalScore() {
  return formFields.reduce((sum, field) => {
    const selected = document.querySelector(`input[name="${field}"]:checked`);
    return sum + Number(selected?.value || 0);
  }, 0);
}

function getRiskInterpretation(score) {
  if (score >= 18) {
    return carePlans.low;
  }
  if (score >= 14) {
    return carePlans.moderate;
  }
  if (score >= 10) {
    return carePlans.high;
  }
  return carePlans.critical;
}

function renderCarePlan(plan) {
  diagnosticList.innerHTML = plan.diagnostics
    .map((item) => `<li>${item}</li>`)
    .join('');

  careList.innerHTML = plan.cares
    .map((item) => `<li>${item}</li>`)
    .join('');

  resultText.textContent = plan.summary;
}

function updateAssessment() {
  const total = getTotalScore();
  const risk = getRiskInterpretation(total);

  scoreValue.textContent = total;
  riskLevel.textContent = risk.label;
  riskLevel.className = `risk-pill ${risk.className}`;

  renderCarePlan(risk);
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
