import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Endpoint to get source code
app.get('/source', (req, res) => {
  const { framework, category, slug } = req.query;
  
  if (!framework || !category || !slug) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  
  let filePath;
  
  try {
    if (framework === 'trussworks') {
      // Convert slug to component name (kebab-case to PascalCase)
      const componentName = slug.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      
      // Check different possible paths
      const possiblePaths = [
        path.join(__dirname, '..', 'templates', 'trussworks', 'src', 'templates', category, `${componentName}.tsx`),
        path.join(__dirname, '..', 'templates', 'trussworks', 'src', 'templates', category, slug, 'index.tsx'),
        path.join(__dirname, '..', 'templates', 'trussworks', 'src', 'templates', `${componentName}.tsx`)
      ];
      
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          filePath = p;
          break;
        }
      }
      
      if (!filePath) {
        return res.status(404).json({ error: 'Source file not found' });
      }
      
      const content = fs.readFileSync(filePath, 'utf-8');
      res.type('text/plain').send(content);
      
    } else if (framework === 'plain') {
      // For Plain USWDS, serve the HTML file
      filePath = path.join(__dirname, '..', 'templates', 'plain', 'templates', category, slug, 'index.html');
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Template file not found' });
      }
      
      const content = fs.readFileSync(filePath, 'utf-8');
      res.type('text/plain').send(content);
      
    } else {
      res.status(400).json({ error: 'Unsupported framework' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Source server running on port ${PORT}`);
});