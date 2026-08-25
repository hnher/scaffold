const ci = require('miniprogram-ci')
const path = require('path')

// 获取版本号和描述
console.log("读取版本号为：", process.env.npm_package_version)
const version = process.env.npm_package_version || '1.0.0'
const desc = process.argv[2] || 'auto upload by miniprogram-ci'

const project = new ci.Project({
  appid: 'wxd0cdcca2ca59857c',
  type: 'miniProgram',
  projectPath: path.resolve(__dirname, './dist/build/mp-weixin'),
  privateKeyPath: path.resolve(__dirname, './private.wxd0cdcca2ca59857c.key'),
  ignores: ['node_modules/**/*', 'CHANGELOG.md', 'README.md'],
})

async function upload() {
  console.log('--- 开始上传 ---')
  console.log(`版本号: ${version}`)
  console.log(`描述: ${desc}`)

  try {
    const uploadResult = await ci.upload({
      project,
      version,
      desc,
      setting: {
        es6: true,
        minify: true,
        autoPrefixPX: true,
        autoPrefixPX_RPX: true,
      },
      onProgressUpdate: console.log,
    })
    console.log('--- 上传成功 ---')
    console.log(uploadResult)
  } catch (error) {
    console.error('--- 上传失败 ---')
    console.error(error)
    process.exit(1)
  }
}

upload().catch(err => {
	console.error("上传失败", err)
})
