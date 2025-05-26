const vitePreprocessor = require('cypress-vite')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    on('file:preprocessor', vitePreprocessor())
}