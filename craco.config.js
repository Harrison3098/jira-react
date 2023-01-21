/**
 * @Description	：craco.config.js
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 13:55:09
 * @FilePath	: jira//craco.config.js
 */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0,82,24)",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
