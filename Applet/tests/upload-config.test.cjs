const assert = require('node:assert/strict')
const { mkdtempSync, rmSync, writeFileSync } = require('node:fs')
const { tmpdir } = require('node:os')
const path = require('node:path')
const { test } = require('node:test')
const { resolveProjectOptions } = require('../ci.js')

test('upload requires an explicit valid WeChat app identity', () => {
  for (const appid of [undefined, '', 'invalid-app-id']) {
    assert.throws(() => resolveProjectOptions({ WECHAT_APP_ID: appid }), /WECHAT_APP_ID/)
  }
})

test('upload refuses to proceed without a private key file', (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'scaffold-upload-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))

  assert.throws(
    () => resolveProjectOptions({ WECHAT_APP_ID: 'wx0000000000000000' }, root),
    /WECHAT_PRIVATE_KEY_PATH/,
  )
})

test('upload supports a private key stored outside the public project', (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'scaffold-upload-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const keyPath = path.join(root, 'upload.key')
  writeFileSync(keyPath, 'test fixture only')

  const options = resolveProjectOptions({
    WECHAT_APP_ID: 'wx0000000000000000',
    WECHAT_PRIVATE_KEY_PATH: keyPath,
  }, path.join(root, 'project'))

  assert.equal(options.appid, 'wx0000000000000000')
  assert.equal(options.privateKeyPath, keyPath)
  assert.equal(options.projectPath, path.join(root, 'project/dist/build/mp-weixin'))
})
