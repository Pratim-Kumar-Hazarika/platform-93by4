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
    GMEET_API_KEY: process.env.GMEET_API_KEY,
    GMEET_CLIENT_ID: process.env.GMEET_CLIENT_ID,
    GMEET_SCOPE: process.env.GMEET_SCOPE,
  },
}
