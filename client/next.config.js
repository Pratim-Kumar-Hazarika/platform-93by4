module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    API_URL: 'http://localhost:5000', // for local development
  },
  // env: {
  //   API_URL: 'https://neog-admissions.azurewebsites.net', // for production
  // },
}