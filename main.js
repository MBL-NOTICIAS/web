document.getElementById("start-simulation").addEventListener("click", function() {
    // Aquí llamaremos a la función para cargar los datos de las reinas y comenzar la simulación
    loadQueensData();
});

function loadQueensData() {
    // Aquí se cargarán los datos de las reinas desde el archivo queensdata.js
    // Por ahora, simplemente simularemos la carga de datos y comenzaremos la simulación
    console.log("Loading queens data...");
    setTimeout(startSimulation, 2000); // Simulamos una carga de 2 segundos
}

function startSimulation() {
    // Aquí escribiremos la lógica para simular el concurso
    console.log("Simulation started!");
    // Por ahora, simplemente mostraremos un mensaje en la consola
}
