// ===== CONTADOR REGRESIVO =====
const fechaBoda = new Date('February 28, 2026 17:00:00').getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaBoda - ahora;
    
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    
    const elementoDias = document.getElementById('dias');
    const elementoHoras = document.getElementById('horas');
    const elementoMinutos = document.getElementById('minutos');
    const elementoSegundos = document.getElementById('segundos');
    
    if (elementoDias) elementoDias.textContent = dias.toString().padStart(2, '0');
    if (elementoHoras) elementoHoras.textContent = horas.toString().padStart(2, '0');
    if (elementoMinutos) elementoMinutos.textContent = minutos.toString().padStart(2, '0');
    if (elementoSegundos) elementoSegundos.textContent = segundos.toString().padStart(2, '0');
    
    if (diferencia < 0) {
        if (elementoDias) elementoDias.textContent = '00';
        if (elementoHoras) elementoHoras.textContent = '00';
        if (elementoMinutos) elementoMinutos.textContent = '00';
        if (elementoSegundos) elementoSegundos.textContent = '00';
    }
}

// Iniciar el contador inmediatamente
actualizarContador();
setInterval(actualizarContador, 1000);

// ===== ANIMACIÓN DE APARTADOS AL HACER SCROLL =====
const apartados = document.querySelectorAll('.apartado');

function mostrarApartados() {
    apartados.forEach(apartado => {
        const apartadoTop = apartado.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (apartadoTop < windowHeight * 0.8) {
            apartado.classList.add('visible');
        }
    });
}

// ===== FADE DE SECCIÓN CALENDARIO AL HACER SCROLL =====
const seccionCalendario = document.querySelector('.seccion-calendario');

function mostrarSeccionCalendario() {
    if (seccionCalendario) {
        const seccionTop = seccionCalendario.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (seccionTop < windowHeight * 0.7) {
            seccionCalendario.classList.add('visible');
        }
    }
}

// ===== FADE DE SECCIÓN FRASE NOVIOS AL HACER SCROLL =====
const seccionFraseNovios = document.querySelector('.seccion-frase-novios');

function mostrarSeccionFraseNovios() {
    if (seccionFraseNovios) {
        const seccionTop = seccionFraseNovios.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (seccionTop < windowHeight * 0.7) {
            seccionFraseNovios.classList.add('visible');
        }
    }
}

// ===== CONTROL DE MÚSICA =====
const audioBoda = document.getElementById('audio-boda');
const btnMusica = document.getElementById('btn-musica');
let musicaReproduciendo = false;

// Función para intentar reproducir la música
function iniciarMusica() {
    if (audioBoda) {
        audioBoda.play()
            .then(() => {
                musicaReproduciendo = true;
                if (btnMusica) {
                    btnMusica.textContent = '🔊';
                    btnMusica.classList.remove('pausado');
                }
            })
            .catch((error) => {
                console.log('Autoplay bloqueado. El usuario debe interactuar primero.');
                musicaReproduciendo = false;
                if (btnMusica) {
                    btnMusica.textContent = '🔇';
                    btnMusica.classList.add('pausado');
                }
            });
    }
}

// Control del botón de música
if (btnMusica && audioBoda) {
    btnMusica.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (audioBoda.paused) {
            audioBoda.play();
            btnMusica.textContent = '🔊';
            btnMusica.classList.remove('pausado');
            musicaReproduciendo = true;
        } else {
            audioBoda.pause();
            btnMusica.textContent = '🔇';
            btnMusica.classList.add('pausado');
            musicaReproduciendo = false;
        }
    });
}

// ===== EVENTOS DE CARGA Y SCROLL =====
window.addEventListener('load', () => {
    // Mostrar elementos inmediatamente al cargar
    mostrarApartados();
    mostrarSeccionCalendario();
    mostrarSeccionFraseNovios();
    
    // Intentar reproducir música
    iniciarMusica();
});

window.addEventListener('scroll', () => {
    mostrarApartados();
    mostrarSeccionCalendario();
    mostrarSeccionFraseNovios();
});

// También intentar al hacer clic en cualquier parte (por si el autoplay está bloqueado)
document.addEventListener('click', function reproducirPrimeraVez() {
    if (!musicaReproduciendo) {
        iniciarMusica();
        document.removeEventListener('click', reproducirPrimeraVez);
    }
}, { once: true });
});

window.addEventListener('scroll', mostrarSeccionFraseNovios);

window.addEventListener('load', mostrarSeccionFraseNovios);
