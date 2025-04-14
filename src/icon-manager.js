export function resolveLionIcon(iconset, name) {
    switch (iconset) {
      case 'icons':
        return import('./icons/iconset-icons.js').then(module => {
            return module[name]
        });
      default:
        throw new Error(`Unknown iconset ${iconset}`);
    }
  }