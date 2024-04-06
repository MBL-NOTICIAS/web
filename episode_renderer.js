// Importar los datos de las reinas
import { queensData } from './queensData.js';

// Variable para llevar el registro de la etapa actual del episodio
let currentStage = 0;

// Obtener el elemento contenedor de los resultados del episodio
const episodeResultsElement = document.getElementById("episode-results");

// Función para avanzar a la siguiente etapa del episodio
function nextStage() {
    currentStage++;
    renderStage();
}

// Función para mostrar las concursantes en columna
function renderContestants() {
    clearResults();
    const contestantsList = document.createElement('div');
    contestantsList.innerHTML = "<h2>Concursantes</h2>";
    queensData.forEach(queen => {
        const queenParagraph = document.createElement('p');
        queenParagraph.textContent = queen.name;
        contestantsList.appendChild(queenParagraph);
    });
    const proceedButton = createButton('Proceder', nextStage);
    contestantsList.appendChild(proceedButton);
    episodeResultsElement.appendChild(contestantsList);
}

// Función para mostrar el mini-challenge
function renderMiniChallenge() {
    clearResults();
    const miniChallengeDescription = document.createElement('div');
    miniChallengeDescription.innerHTML = `
        <h2>Mini-Challenge</h2>
        <p>Descripción aleatoria del mini-challenge.</p>
        <p>Ganadora: ${queensData[Math.floor(Math.random() * queensData.length)].name}</p>
    `;
    const proceedButton = createButton('Proceder', nextStage);
    miniChallengeDescription.appendChild(proceedButton);
    episodeResultsElement.appendChild(miniChallengeDescription);
}

// Función para mostrar el maxi-challenge
function renderMaxiChallenge() {
    clearResults();
    const maxiChallengeDescription = document.createElement('div');
    maxiChallengeDescription.innerHTML = `
        <h2>Maxi-Challenge</h2>
        <p>Descripción aleatoria del maxi-challenge.</p>
    `;
    const proceedButton = createButton('Proceder', nextStage);
    maxiChallengeDescription.appendChild(proceedButton);
    episodeResultsElement.appendChild(maxiChallengeDescription);
}

// Función para mostrar los resultados finales del episodio
function renderFinalResults() {
    clearResults();
    const finalResultsTable = document.createElement('table');
    finalResultsTable.innerHTML = `
        <caption>Resultados Finales</caption>
        <tr>
            <th>Posición</th>
            <th>Nombre</th>
        </tr>
    `;
    // Reemplaza "Primera" por "WIN"
    queensData.forEach((queen, index) => {
        const position = (index === 0) ? 'WIN' : 'Other Position'; // Reemplaza "Primera" por "WIN"
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${position}</td>
            <td>${queen.name}</td>
        `;
        finalResultsTable.appendChild(row);
    });
    episodeResultsElement.appendChild(finalResultsTable);
}

// Función para limpiar los resultados anteriores
function clearResults() {
    episodeResultsElement.innerHTML = '';
}

// Función para crear un botón
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

// Función para renderizar la etapa actual del episodio
function renderStage() {
    switch (currentStage) {
        case 0:
            renderContestants();
            break;
        case 1:
            renderMiniChallenge();
            break;
        case 2:
            renderMaxiChallenge();
            break;
        case 3:
            renderFinalResults();
            break;
        default:
            break;
    }
}

// Llama a la función para renderizar la primera etapa del episodio cuando se carga el documento
document.addEventListener("DOMContentLoaded", renderStage);

