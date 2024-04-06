// Importar los datos de las reinas
import { queensData } from './queensData.js';

// Función para simular una temporada
export function simulateSeason() {
    const episodes = []; // Almacenar los resultados de cada episodio
    const lipSyncSongs = ["I Will Survive", "Stronger", "Bang Bang", "Vogue", "Toxic"]; // Lista de canciones para lip sync

    // Función para simular un episodio
    function simulateEpisode(challenge) {
        const episodeResult = {
            episode: episodes.length + 1,
            challenge,
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

    // Simular múltiples episodios con diferentes desafíos
    simulateEpisode("acting");
    simulateEpisode("comedy");
    simulateEpisode("dance");
    simulateEpisode("design");
    simulateEpisode("improvisation");
    simulateEpisode("runway");
    simulateEpisode("lipsync");

    return episodes;
}

// Ejemplo de uso
const seasonResults = simulateSeason();
console.log(seasonResults);
