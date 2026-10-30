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

const nursingPlans = {
  low: {
    diagnostics: [
      'Riesgo mínimo de integridad de la piel alterada',
      'Riesgo de movilización ineficaz del paciente'
    ],
    interventions: [
      'Valorar la piel y prominencias óseas cada turno.',
      'Mantener higiene y sequedad cutánea.',
      'Promover cambios de posición y movilidad activa.',
      'Educar a paciente y familia sobre prevención de úlceras.'
    ]
  },
  moderate: {
    diagnostics: [
      'Riesgo de integridad de la piel alterada',
      'Movilidad física deteriorada',
      'Autocuidado deficiente para la higiene y la movilización'
    ],
    interventions: [
      'Revisar la piel en zonas de presión cada 8 horas.',
      'Reposicionar al paciente cada 2 horas y evitar fricción.',
      'Asegurar colchón o superficie antiescaras según indicación.',
      'Fomentar movilización y cambios posturales con ayuda.',
      'Registrar evolución de la piel y la tolerancia al tratamiento.'
    ]
  },
  high: {
    diagnostics: [
      'Riesgo de integridad de la piel alterada',
      'Deficit de autocuidado: movilidad',
      'Riesgo de lesión por presión'
    ],
    interventions: [
      'Establecer protocolo de reposicionamiento cada 2 horas.',
      'Evaluar piel, edema, enrojecimiento y tejidos blandos.',
      'Utilizar soporte de alivio de presión y almohadillas.',
      'Colaborar con fisioterapia para conservar movilidad.',
      'Documentar riesgo, medidas aplicadas y respuesta del paciente.'
    ]
  },
  critical: {
    diagnostics: [
      'Riesgo de integridad de la piel alterada',
      'Lesión por presión en riesgo de progresión',
      'Movilidad física deteriorada',
      'Autocuidado deficiente para la higiene y la movilización'
    ],
    interventions: [
      'Activar medidas preventivas inmediatas por riesgo alto.',
      'Reposición frecuente con supervisión directa y registro.',
      'Inspección cutánea cada turno con valoración de zonas de presión.',
      'Aplicar cuidados locales y protección de la piel.',
      'Coordinar con médico y equipo multidisciplinario para tratamiento urgente.',
      'Educar a la familia y al paciente sobre prevención y signos de alarma.'
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
    return { label: 'Bajo', className: 'low', key: 'low' };
  }
  if (score >= 14) {
    return { label: 'Moderado', className: 'moderate', key: 'moderate' };
  }
  if (score >= 10) {
    return { label: 'Alto', className: 'high', key: 'high' };
  }
  return { label: 'Muy alto', className: 'critical', key: 'critical' };
}

function renderCarePlan(riskKey) {
  const plan = nursingPlans[riskKey] || nursingPlans.moderate;

  diagnosticList.innerHTML = plan.diagnostics
    .map((diagnostic) => `<li>${diagnostic}</li>`)
    .join('');

  careList.innerHTML = plan.interventions
    .map((intervention) => `<li>${intervention}</li>`)
    .join('');
}

function updateAssessment() {
  const total = getTotalScore();
  const risk = getRiskInterpretation(total);

  scoreValue.textContent = total;
  riskLevel.textContent = risk.label;
  riskLevel.className = `risk-pill ${risk.className}`;
  renderCarePlan(risk.key);
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
