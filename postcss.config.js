// postcss.config.js

// подключите плагины в файл

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};