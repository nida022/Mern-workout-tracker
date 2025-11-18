module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ensure minimizers exist
      if (webpackConfig.optimization && webpackConfig.optimization.minimizer) {
        webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
          (minimizer) => minimizer.constructor.name !== 'CssMinimizerPlugin'
        );
      }
      return webpackConfig;
    },
  },
};