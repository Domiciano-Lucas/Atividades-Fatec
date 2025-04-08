// GIFs
const errorGif = { url: "./images/cena_criancas_botao_removido.gif", duration: 4000 };
const ieErrorGif = { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjE2bDZlcnNwNXVqbmJxbGNsZHVzZWRxZGxvNnRnNzRlZmRxOXBnZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dxbPGFv7tSK3e/giphy.gif", duration: 3000 };

// Array de piadas
const piadas = [
    "Falaram que o português de portugal é muito literal. Se voce for almoçar, e sua esposa pedir uma coca, e você dizer duas, o garçom trará uma para sua esposa e duas para você.",
    "No restaurante português, pedi para sentar na mesa mais próxima da janela, o garçom disse que não podia, só era permitido sentar nas cadeiras.",
    "Quando estive em portugal, entrei em um restaurante, me sentei, e falei pro garçom: 'Oi, tudo bem? Tem cardápio?' Ele disse: Sim! Saiu andando e não voltou mais",
    "Quando perguntei para uma pessoa na estrada se aquela rodovia ia para a Espanha. Ela disse que não sabia, mas, se fosse, que ela faria muita falta."
];

// Elementos do DOM
const meme = document.querySelector('.meme');

const newJokeButton = document.getElementById('new-joke');
const jokeText = document.getElementById('joke-text');
const surpriseImg = document.querySelector('.surprise-element img');
const modal = document.getElementById('gifModal');
const errorButton = document.getElementById('error-button');

// Função para mostrar o modal com GIF
function showModal(gifConfig = errorGif) {
    // Configura e mostra o GIF no modal
    const modalImg = document.querySelector('.modal-gif');
    modalImg.onload = () => {
        modal.classList.add('show');
    };
    modalImg.src = gifConfig.url;
    
    // Remove o modal após a duração especificada do GIF
    setTimeout(() => {
        modal.classList.remove('show');
    }, gifConfig.duration);
}

// Evento de clique no meme
meme.addEventListener('click', () => {
    meme.classList.add('rotate');
    showModal(); // Mostra o GIF
    
    setTimeout(() => {
        meme.classList.remove('rotate');
    }, errorGif.duration);
});


// Gerador de piadas aleatórias
newJokeButton.addEventListener('click', () => {
    const randomJoke = piadas[Math.floor(Math.random() * piadas.length)];
    jokeText.textContent = randomJoke;
    showModal(); // Mostra o GIF
    newJokeButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        newJokeButton.style.transform = 'scale(1)';
    }, 100);
});

// Surpresa no scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const surprisePosition = surpriseImg.getBoundingClientRect().top;

    if (surprisePosition < windowHeight) {
        surpriseImg.classList.add('visible');
    }
});

// Easter egg: Clique duplo no título
document.querySelector('.title').addEventListener('dblclick', () => {
    document.body.style.animation = 'spin 1s linear';
    showModal();
    setTimeout(() => {
        document.body.style.animation = '';
    }, 1000);
});

// Função para simular erro do Internet Explorer
function simulateError() {
    // Mostrar o GIF de erro
    document.querySelector('.modal-gif').src = errorGif.url;
    document.querySelector('.game-over-text').style.display = 'none';
    modal.classList.add('show');

    // Simular abertura de várias janelas
    let popups = [];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const width = 300;
            const height = 200;
            const left = Math.random() * (window.screen.width - width);
            const top = Math.random() * (window.screen.height - height);
            const popup = window.open('about:blank', '_blank', 
                `width=${width},height=${height},left=${left},top=${top}`);
            if (popup) {
                popup.document.write(`
                    <style>
                        body { 
                            background-color: #000080; 
                            color: white; 
                            font-family: 'MS Sans Serif', sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
                        .error { 
                            text-align: center;
                            padding: 20px;
                        }
                    </style>
                    <div class="error">
                        <h3>Internet Explorer parou de funcionar</h3>
                        <p>Um erro fatal ocorreu 😱</p>
                    </div>
                `);
                popups.push(popup);
            }
        }, i * 200);
    }

    // Fechar as janelas após alguns segundos
    setTimeout(() => {
        popups.forEach(popup => {
            if (!popup.closed) popup.close();
        });
        modal.classList.remove('show');
    }, errorGif.duration);
}

// Adicionar evento de clique ao botão de erro
errorButton.addEventListener('click', () => {
    showModal(ieErrorGif);
});
