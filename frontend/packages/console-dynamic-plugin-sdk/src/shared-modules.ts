import { RemoteEntryModule } from './types';

/**
 * Vendor modules shared between Console application and its dynamic plugins.
 * https://github.com/webpack/webpack.js.org/issues/3757
 */
export const sharedVendorModules = {
  react: {
    requiredVersion: '^17',
    singleton: true,
    strictVersion: true,
  },
  'react-dom': {
    requiredVersion: '^17',
    singleton: true,
    strictVersion: true,
  },
};

/**
 * At runtime, Console will override (i.e. enforce Console-bundled implementation of) shared
 * modules for each dynamic plugin, before loading any of the modules exposed by that plugin.
 *
 * This way, a single version of React etc. is used by the Console application.
 */
export const overrideSharedModules = (entryModule: RemoteEntryModule) => {
  entryModule.init({
    // eslint-disable-next-line
    react: async () => () => require('react'),
    // eslint-disable-next-line
    "react-dom": async () => () => require('react-dom'),
  });
};
