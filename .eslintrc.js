module.exports = {
  'extends': 'standard',
  'plugins': [
    'standard',
    'promise'
  ],
  'settings': {
    'react': {
      'createClass': 'createClass', // Regex for Component Factory to use, default to "createClass"
      'pragma': 'React',  // Pragma to use, default to "React"
      'version': '14.0' // React version, default to the latest React stable release
    }
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'rules': {
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2
  }
}
