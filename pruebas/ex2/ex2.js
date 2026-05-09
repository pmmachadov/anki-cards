// Obtenir elements del DOM
const form = document.getElementById('formRegistre');
const usuari = document.getElementById('usuari');
const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');
const error = document.getElementById('errorGeneral');
const mensaje = document.getElementById('missatge');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    error.textContent = '';
    mensaje.textContent = '';
    
    let errores = [];
    
    if (!usuari.value.trim()) {
        errores.push('Usuario no puede estar vacío');
    }
    
    if (pass1.value.length < 8) {
        errores.push('Contraseña debe tener al menos 8 caracteres');
    }

    if (pass1.value !== pass2.value) {
        errores.push('Las contraseñas no coinciden');
    }

    if (errores.length > 0) {
        error.textContent = errores.join('. ');
    } else {
        mensaje.textContent = 'Registro completado correctamente';
    }
});

