# PetPlanet_intensive2024

- Интенсив my.methed.ru 16.04.2024.
- макет https://www.figma.com/file/9tZK4tnauRoQC0t4n01qJk/PetPlanet-(Intensive)
- npm i
- npm create vite@latest
- npm i -D sass
- npm install normalize.css

- библиотека оптимизации изображений https://www.npmjs.com/package/vite-plugin-image-optimizer
- npm install vite-plugin-image-optimizer --save-dev
- npm install sharp --save-dev
- npm install svgo --save-dev
  Добавить в vite.config.js import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
  и plugins: [
  ViteImageOptimizer({
  /* pass your config */
  }),
  ],

  - API https://github.com/Quper24/pet-planet-api
