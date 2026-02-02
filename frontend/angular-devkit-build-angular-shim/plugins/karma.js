/**
 * Minimal Karma plugin shim to satisfy legacy Angular CLI integrations.
 * The @angular/build:karma builder handles bundling, so this plugin only
 * registers an empty framework placeholder.
 */
module.exports = {
  'framework:@angular-devkit/build-angular': ['factory', () => () => {}],
};
