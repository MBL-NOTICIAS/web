// Importar los datos de las reinas
import { queensData } from './queensData.js';

// Lista de descripciones detalladas para el mini-challenge
const miniChallengeDescriptions = [
    "En el mini-challenge de esta semana, las concursantes deberán realizar una sesión de fotos con temática de los años 80.",
    "El mini-challenge de esta semana consiste en un desfile de moda improvisado usando únicamente materiales reciclados.",
    "Las concursantes competirán en un juego de trivia sobre la cultura pop en el mini-challenge de esta semana."
];

// Lista de descripciones detalladas para el maxi-challenge
const maxiChallengeDescriptions = [
    "El maxi-challenge de esta semana es un reto de diseño en el que las concursantes deberán crear un conjunto inspirado en la realeza.",
    "En el maxi-challenge de esta semana, las concursantes tendrán que escribir y protagonizar un comercial de televisión para un producto ficticio.",
    "Las concursantes se enfrentarán en un desafío de actuación donde deberán interpretar personajes icónicos de la televisión en el maxi-challenge de esta semana."
];

// Función para simular una temporada
export function simulateSeason() {
    const episodes = []; // Almacenar los resultados de cada episodio
    const challenges = ["acting", "comedy", "dance", "design", "improvisation", "runway", "lipsync"];

    // Función para simular un episodio
    function simulateEpisode(challenge) {
        const episodeResult = {
            episode: episodes.length + 1,
            challenge,
            miniChallengeDescription: miniChallengeDescriptions[Math.floor(Math.random() * miniChallengeDescriptions.length)],
            maxiChallengeDescription: maxiChallengeDescriptions[Math.floor(Math.random() * maxiChallengeDescriptions.length)],
            performances: [],
            topQueens: [],
            safeQueens: [],
            bottomQueens: [],
            maxiChallengeWinner: null,
            lipSyncWinner: null
        };

        // Simular el desempeño de cada reina en el episodio
        queensData.forEach(queen => {
            // Calcular el rendimiento de la reina en el desafío
            const totalPoints = queen[challenge];
            let performance;
            if (totalPoints >= 90) performance = "Impecable";
            else if (totalPoints >= 70) performance = "Buena";
            else if (totalPoints >= 50) performance = "Meh";
            else if (totalPoints >= 30) performance = "Mala";
            else performance = "Horrible";

            // Registrar el rendimiento de la reina en el episodio
            episodeResult.performances.push({ queen: queen.name, performance });
        });

        // Determinar las reinas en el top y en el bottom
        episodeResult.performances.forEach(performance => {
            if (performance.performance === "Impecable") {
                episodeResult.topQueens.push(performance.queen);
            } else if (performance.performance !== "Horrible") {
                episodeResult.safeQueens.push(performance.queen);
            } else {
                episodeResult.bottomQueens.push(performance.queen);
            }
        });

        // Determinar la reina ganadora del maxi-reto
        if (episodeResult.topQueens.length > 0) {
            episodeResult.maxiChallengeWinner = episodeResult.topQueens[0];
        }

        // Determinar la reina ganadora del lip sync
        if (episodeResult.bottomQueens.length > 0) {
            episodeResult.lipSyncWinner = episodeResult.bottomQueens[Math.floor(Math.random() * episodeResult.bottomQueens.length)];
        }

        // Reducir la puntuación de la reina con múltiples victorias en el maxi-reto
        if (episodeResult.maxiChallengeWinner) {
            const winner = queensData.find(queen => queen.name === episodeResult.maxiChallengeWinner);
            winner[challenge] -= 10;
        }

        // Reducir la puntuación de la reina en el bottom si ya ha estado allí múltiples veces y no ha ganado el lip sync
        episodeResult.bottomQueens.forEach(queen => {
            const bottomQueen = queensData.find(q => q.name === queen);
            if (bottomQueen.bottomCount >= 2 && bottomQueen.lipSyncWins === 0) {
                bottomQueen[challenge] -= 5;
            }
        });

        // Registrar el resultado del episodio
        episodes.push(episodeResult);
    }

    // Función para mostrar el desempeño de las reinas en el episodio
    function renderQueenPerformances(episodeResult) {
        const performancesElement = document.createElement('div');
        performancesElement.innerHTML = "<h2>Desempeño de las Reinas</h2>";
        episodeResult.performances.forEach(performance => {
            const queenPerformance = document.createElement('p');
            queenPerformance.textContent = `${performance.queen}: ${performance.performance}`;
            performancesElement.appendChild(queenPerformance);
        });
        return performancesElement;
    }

    // Función para mostrar los mensajes específicos para cada grupo de reinas
    function renderResultsMessages(episodeResult) {
        const resultsMessagesElement = document.createElement('div');
        if (episodeResult.safeQueens.length > 0) {
            const safeQueensMessage = document.createElement('p');
            safeQueensMessage.textContent = "Reinas Salvadas:";
            episodeResult.safeQueens.forEach(queen => {
                safeQueensMessage.textContent += ` ${queen}`;
            });
            resultsMessagesElement.appendChild(safeQueensMessage);
        }
        if (episodeResult.maxiChallengeWinner) {
            const winnerMessage = document.createElement('p');
            winnerMessage.textContent = `Felicidragues ${episodeResult.maxiChallengeWinner}, sos la ganadora de la semana!`;
            resultsMessagesElement.appendChild(winnerMessage);
        }
        if (episodeResult.topQueens.length > 0) {
            const topQueensMessage = document.createElement('p');
            topQueensMessage.textContent = "Reinas del Top:";
            episodeResult.topQueens.forEach(queen => {
                topQueensMessage.textContent += ` ${queen}, buen trabajo esta semana, estás a salvo.`;
            });
            resultsMessagesElement.appendChild(topQueensMessage);
        }
        if (episodeResult.bottomQueens.length > 0) {
            const bottomQueensMessage = document.createElement('p');
            bottomQueensMessage.textContent = "Reinas en Low:";
            episodeResult.bottomQueens.forEach(queen => {
                bottomQueensMessage.textContent += ` ${queen}`;
            });
            resultsMessagesElement.appendChild(bottomQueensMessage);
            const eliminationMessage = document.createElement('p');
            eliminationMessage.textContent = "I'm sorry my dears but you're up for elimination.";
            resultsMessagesElement.appendChild(eliminationMessage);
        }
        return resultsMessagesElement;
    }

    // Función para renderizar el episodio
    function renderEpisode(episodeResult) {
        const episodeElement = document.createElement('div');
        episodeElement.appendChild(renderQueenPerformances(episodeResult));
        episodeElement.appendChild(renderResultsMessages(episodeResult));
        return episodeElement;
    }

    // Simular múltiples episodios con diferentes desafíos
    challenges.forEach(challenge => {
        const episodeResult = simulateEpisode(challenge);
        episodes.push(renderEpisode(episodeResult));
    });

    return episodes;
}