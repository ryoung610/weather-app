module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Disable @svgr for SVGs
        const svgRuleIndex = webpackConfig.module.rules.findIndex((rule) => rule.oneOf && rule.oneOf.some((r) => r.test && r.test.toString().includes('svg')));
        
        if (svgRuleIndex !== -1) {
          webpackConfig.module.rules[svgRuleIndex].oneOf = webpackConfig.module.rules[svgRuleIndex].oneOf.map((rule) => {
            if (rule.test && rule.test.toString().includes('svg')) {
              return {
                test: /\.svg$/,
                use: ['file-loader'], // Use file-loader instead of @svgr
              };
            }
            return rule;
          });
        }
        return webpackConfig;
      },
    },
  };
  