/**
 * Custom Tailwind CSS v4 Vite Plugin — Windows Fix
 *
 * Workaround for @tailwindcss/oxide Scanner bug on Windows where
 * recursive glob patterns (**\/*) fail to find files.
 *
 * This plugin replaces @tailwindcss/vite by:
 * 1. Using @tailwindcss/node to compile CSS
 * 2. Using @tailwindcss/oxide Scanner with leaf-directory patterns
 * 3. Manually scanning source files and building CSS with all detected candidates
 */
import { compile, Features } from '@tailwindcss/node';
import { Scanner } from '@tailwindcss/oxide';
import path from 'path';
import fs from 'fs';

/**
 * Recursively find all directories containing files matching the given extensions.
 */
function findSourceDirs(baseDir, extensions) {
  const dirs = new Set();

  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    let hasMatchingFile = false;
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (['node_modules', '.git', 'dist', '.astro', '.vite', 'public'].includes(entry.name)) continue;
        walk(path.join(dir, entry.name));
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          hasMatchingFile = true;
        }
      }
    }

    if (hasMatchingFile) {
      dirs.add(dir);
    }
  }

  walk(baseDir);
  return [...dirs];
}

export default function tailwindCSSFix() {
  let root = '';
  let cachedResult = null;
  let cachedCode = '';

  return [
    {
      name: 'tailwindcss-windows-fix:scan',
      enforce: 'pre',

      configResolved(config) {
        root = config.root;
      },

      async transform(code, id) {
        // Only process CSS files
        const cleanId = id.split('?')[0];
        if (!cleanId.endsWith('.css')) return null;

        // Only process files that contain @import "tailwindcss" or Tailwind markers
        const hasTailwindImport = code.includes('@import "tailwindcss"') || code.includes("@import 'tailwindcss'");
        if (!hasTailwindImport) return null;

        // Cache check — avoid recompiling same input
        if (code === cachedCode && cachedResult) {
          return { code: cachedResult, map: null };
        }

        const cssDir = path.dirname(path.resolve(cleanId));

        try {
          // Compile the CSS
          const compiler = await compile(code, {
            base: cssDir,
            onDependency: (dep) => {
              // Watch dependencies for HMR
              if (typeof this?.addWatchFile === 'function') {
                this.addWatchFile(dep);
              }
            },
          });

          // Check if we need utilities
          if (!(compiler.features & Features.Utilities)) {
            const result = compiler.build([]);
            cachedCode = code;
            cachedResult = result;
            return { code: result, map: null };
          }

          // Find all source directories with template files
          const srcDir = path.resolve(root, 'src');
          const extensions = ['.astro', '.tsx', '.ts', '.jsx', '.js', '.html', '.vue', '.svelte'];
          const sourceDirs = findSourceDirs(srcDir, extensions);

          // Create Scanner sources for each directory
          const extPattern = '*.{astro,tsx,ts,jsx,js,html,vue,svelte}';
          const sources = sourceDirs.map(dir => ({
            base: dir,
            pattern: extPattern,
            negated: false,
          }));

          // Scan for candidates
          const scanner = new Scanner({ sources });
          const candidates = scanner.scan();

          // Build the final CSS with all candidates
          const result = compiler.build([...candidates]);

          // Cache the result
          cachedCode = code;
          cachedResult = result;

          return { code: result, map: null };
        } catch (err) {
          console.error('[tailwindcss-windows-fix] Error:', err.message);
          return null;
        }
      },
    },
  ];
}
