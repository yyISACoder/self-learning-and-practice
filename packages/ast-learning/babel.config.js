module.exports = {
  "presets": [
		// 注意这里我们移除了@babel/preset-env的配置项
    [
      "@babel/preset-env"
    ]
  ],

	/*
		建议使用corejs的v3，因为v2不支持转译新增的实例方法，如'a'.repeat(5)、[].includes(5)，所以需要再单独安装对应的poly-fill

		安装v3命令 npm install @babel/runtime-corejs3 --save
	*/
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3 
      }
    ],
    [
      './myBabelPlugin.js',
      {
        test:'me'
      }
    ]
  ]
}