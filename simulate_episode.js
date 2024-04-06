<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RuPaul's Drag Race Simulator</title>
    <style>
        /* Estilos CSS para el diseño */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }

        h1 {
            text-align: center;
            margin-top: 20px;
        }

        #episode-results {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <h1>Simulación de Temporada</h1>
    <div id="episode-results"></div>
    <script src="queensData.js"></script>
    <script src="simulate_episode.js"></script>
</body>
</html>
