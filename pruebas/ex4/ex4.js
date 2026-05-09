import { esNumero, longitudExacta } from './validador.js';

const form = document.getElementById('formCP');
const cpInput = document.getElementById('cp');
const errorDiv = document.getElementById('errorCP');
const successDiv = document.getElementById('successCP');

function mostrarError(msg) {
	errorDiv.textContent = msg;
}

function mostrarSuccess(msg) {
  successDiv.textContent = msg;
}

function validarCP(value) {
	const val = String(value ?? '').trim();
	if (!esNumero(val)) return 'El código postal debe ser numérico.';
	if (!longitudExacta(val, 5)) return 'El código postal debe tener 5 dígitos.';
	return '';
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const err = validarCP(cpInput.value);
	if (err) {
		mostrarError(err);
		cpInput.focus();
		return;
	}
	mostrarError('');
	mostrarSuccess('Código postal válido: ' + cpInput.value.trim());
});

cpInput.addEventListener('input', () => {
	const err = validarCP(cpInput.value);
	if (err) {
		mostrarError(err);
		mostrarSuccess('');
	} else {
		mostrarError('');
		mostrarSuccess('');
	}
});