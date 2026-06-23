javascript
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-contacto');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // evita que recargue la página

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validación básica
        if (!nombre || !email || !mensaje) {
            mostrarMensaje('Por favor completa todos los campos.', 'error');
            return;
        }

        if (!validarEmail(email)) {
            mostrarMensaje('Escribe un correo electrónico válido.', 'error');
            return;
        }

        guardarEnStorage({ nombre, email, mensaje });

        mostrarMensaje('¡Mensaje enviado correctamente! ✅', 'exito');

        form.reset();
    });

});

// ===============================
// VALIDACIÓN DE EMAIL
// ===============================
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ===============================
// MENSAJES DE RESPUESTA
// ===============================
function mostrarMensaje(texto, tipo) {
    const el = document.getElementById('msg-respuesta');
    el.textContent = texto;
    el.className = tipo === 'error' ? 'msg-error' : 'msg-exito';
}

// ===============================
// GUARDAR EN LOCALSTORAGE
// ===============================
function guardarEnStorage(datos) {

    const mensajes =
        JSON.parse(localStorage.getItem('mensajes-contacto')) || [];

    datos.fecha = new Date().toLocaleString('es-MX');

    mensajes.push(datos);

    localStorage.setItem(
        'mensajes-contacto',
        JSON.stringify(mensajes)
    );
}


