const not_supported = require('not_supported')

const mockAgent = {
  jar: {
    getCookieStringSync: () => ''
  },
  dispatcher: null
}

module.exports = {
  createAgent:      not_supported,
  createProxyAgent: not_supported,
  getMockAgent:     () => mockAgent,
  setMockAgent:     (options) => {options.agent = mockAgent}
}
