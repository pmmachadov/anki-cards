document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contacteForm');
    const respostaDiv = document.getElementById('resposta');

    function mostrarRespuesta(text, ok = true) {
        respostaDiv.textContent = text;
        respostaDiv.className = ok ? 'success' : 'error';
        respostaDiv.style.display = 'block';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        respostaDiv.style.display = 'none';
        const nom = document.getElementById('nom').value.trim();
        const missatge = document.getElementById('missatge').value.trim();

        try {
            const res = await fetch('http://localhost:3000/enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom, missatge })
            });

            const data = await res.json();
            if (!res.ok) {
                mostrarRespuesta(data.error || 'Error del servidor', false);
                return;
            }
            mostrarRespuesta(data.message || 'Operación completada.');
            form.reset();
        } catch (err) {
            mostrarRespuesta('No se pudo conectar con el servidor.', false);
        }
    });
});
