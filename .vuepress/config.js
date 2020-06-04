module.exports = {
  title: 'naxmefy',
  description: 'just a dev',
  baseUrl: 'https://nax.me/',
  extraWatchFiles: ['**/*.md', '**/*.vue'],
  plugins: {
    sitemap: {
      hostname: 'https://nax.me'
    },
    robots: {
      host: 'https://nax.me'
    },
    '@vuepress/google-analytics': {
      ga: 'UA-27498828-5'
    }
  }
}
