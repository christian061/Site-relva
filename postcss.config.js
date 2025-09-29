module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'custom-selectors': true,
        'color-mod-function': { unresolved: 'warn' },
      },
    }),
    require('autoprefixer')({
      grid: 'autoplace',
      flexbox: 'no-2009',
    }),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          zindex: false,
          mergeIdents: false,
          reduceIdents: false,
        },
      ],
    }),
  ],
};
