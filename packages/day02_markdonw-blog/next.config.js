const removeImports = require('next-remove-imports')({
  experimental: { esmExternals: true },
  options: { },
})
module.exports = removeImports()