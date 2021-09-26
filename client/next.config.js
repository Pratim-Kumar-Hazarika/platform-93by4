module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    API_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://neog-admissions.azurewebsites.net', // ternary check for development vs production
    CLIENT_ID: process.env.CLIENT_ID,
    API_KEY: process.env.API_KEY,
    DISCOVERY_DOCS: process.env.DISCOVERY_DOCS,
    SCOPES: process.env.SCOPES,
  },
}
