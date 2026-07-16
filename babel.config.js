module.exports = function (api) {
  api.cache(true);
  const isTest = api.env('test');
  return {
    presets: [isTest ? ['@babel/preset-env', { targets: { node: 'current' } }] : 'babel-preset-expo', '@babel/preset-typescript', '@babel/preset-react'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@services': './src/services',
            '@utils': './src/utils',
            '@types': './src/types',
            '@hooks': './src/hooks',
            '@constants': './src/constants',
          },
        },
      ],
    ],
  };
};
