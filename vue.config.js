module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `$publicPath: '${"~@/assets/"}'; @import "~@/assets/styles/_variables.scss"; @import "~@/assets/styles/_fonts.scss";`,
      },
    },
  },
};
