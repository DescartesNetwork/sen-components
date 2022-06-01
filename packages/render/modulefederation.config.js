const name = process.env.REACT_APP_ID

module.exports = {
  name,
  filename: 'index.js',
  shared: {
    react: { singleton: true, requiredVersion: '^17.0.2' },
    'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
    'react-router-dom': { singleton: true, requiredVersion: '^5.3.0' },
    'web-vitals': { singleton: true, requiredVersion: '^2.1.4' },
    antd: { singleton: true, requiredVersion: '^4.20.2' },
  },
  exposes: {
    './bootstrap': 'app/bootstrap.app',
  },
}
