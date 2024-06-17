document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const contraseña = document.getElementById('contraseña').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje');

    // Validar el correo electrónico
    if (!validateEmail(correo)) {
        mensaje.textContent = 'Por favor, ingrese un correo electrónico válido.';
        mensaje.style.color = 'red';
        return;
    }

    // Validar el número de teléfono
    if (!validatePhone(telefono)) {
        mensaje.textContent = 'Por favor, ingrese un número de teléfono válido (exactamente 10 dígitos numéricos).';
        mensaje.style.color = 'red';
        return;
    }

    // Crear objeto con los datos del usuario
    const user = {
        nombre: nombre,
        apellido: apellido,
        contraseña: contraseña,
        correo: correo,
        telefono: telefono
    };

    const url = 'https://veraxapi.stackcode.io/api/createuser/';

    // Enviar datos mediante fetch
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        mensaje.textContent = 'Usuario registrado con éxito!';
        mensaje.style.color = 'green';
        // Puedes agregar aquí otras acciones después de registrar correctamente el usuario
    })
    .catch((error) => {
        console.error('Error:', error);
        mensaje.textContent = 'Hubo un error al registrar el usuario. Por favor, intente nuevamente más tarde.';
        mensaje.style.color = 'red';
    });
});

function validateEmail(email) {
    // Utilizamos una expresión regular para validar el formato del correo electrónico
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(telefono) {
    // Validamos que el número de teléfono tenga exactamente 10 dígitos numéricos
    return /^\d{10}$/.test(telefono);
}
