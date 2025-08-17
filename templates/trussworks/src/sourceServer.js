// Middleware to serve source files for the showcase
import fs from 'fs';
import path from 'path';

export function sourceServerPlugin() {
  return {
    name: 'source-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Handle source file requests
        if (req.url && req.url.startsWith('/api/source')) {
          const url = new URL(req.url, `http://localhost:3002`);
          const requestPath = url.searchParams.get('path');
          
          if (!requestPath) {
            res.statusCode = 400;
            res.end('Missing path parameter');
            return;
          }
          
          // Parse the path
          const [_, category, slug] = requestPath.split('/');
          
          if (!category || !slug) {
            res.statusCode = 400;
            res.end('Invalid path');
            return;
          }
          
          // Convert slug to component name
          const componentName = slug.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
          
          // Try to find the file
          const possiblePaths = [
            path.join(process.cwd(), 'src', 'templates', category, `${componentName}.tsx`),
            path.join(process.cwd(), 'src', 'templates', category, `${slug}`, 'index.tsx'),
            path.join(process.cwd(), 'src', 'templates', `${componentName}.tsx`),
          ];
          
          for (const filePath of possiblePaths) {
            if (fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', 'text/plain');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(content);
              return;
            }
          }
          
          res.statusCode = 404;
          res.end('Source file not found');
          return;
        }
        
        next();
      });
    }
  };
}