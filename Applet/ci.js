const { existsSync } = require('node:fs')
const path = require('node:path')

/** Resolve local upload credentials before loading the WeChat upload client. */
function resolveProjectOptions(environment = process.env, projectRoot = __dirname) {
  const appid = environment.WECHAT_APP_ID?.trim()

  if (!appid || !/^wx[0-9a-f]{16}$/i.test(appid)) {
    throw new Error('请在环境变量 WECHAT_APP_ID 中配置有效的小程序 AppID')
  }

  const privateKeyPath = path.resolve(
    projectRoot,
    environment.WECHAT_PRIVATE_KEY_PATH || `private.${appid}.key`,
  )

  if (!existsSync(privateKeyPath)) {
    throw new Error('未找到小程序上传私钥，请配置 WECHAT_PRIVATE_KEY_PATH')
  }

  return {
    appid,
    type: 'miniProgram',
    projectPath: path.resolve(projectRoot, 'dist/build/mp-weixin'),
    privateKeyPath,
    ignores: ['node_modules/**/*', 'CHANGELOG.md', 'README.md'],
  }
}

async function upload() {
  const options = resolveProjectOptions()
  const ci = require('miniprogram-ci')
  const version = process.env.npm_package_version || '1.0.0'
  const desc = process.argv[2] || 'auto upload by miniprogram-ci'

  console.log(`开始上传小程序，版本号: ${version}`)

  await ci.upload({
    project: new ci.Project(options),
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

  console.log('小程序上传成功')
}

if (require.main === module) {
  upload().catch(() => {
    console.error('小程序上传失败，请检查 AppID、私钥、IP 白名单及构建产物')
    process.exitCode = 1
  })
}

module.exports = { resolveProjectOptions }
