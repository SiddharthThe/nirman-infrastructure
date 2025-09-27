# Deployment Guide for Nirman Infrastructure Website

## Building the Project
1. Run the production build:
   ```bash
   npm run build
   ```
   This will create a `dist` folder with the production-ready files.

## Deploying to cPanel
1. **Upload Files**:
   - Log in to your cPanel account
   - Navigate to File Manager
   - Go to `public_html` directory
   - Upload all contents of the `dist` folder here

2. **Configure .htaccess**:
   Create or edit the `.htaccess` file in `public_html` with the following content:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

3. **Verify Paths**:
   - All static assets (images, etc.) should be in the `public_html` directory
   - The main `index.html` file should be directly in `public_html`
   - All other build files (JS/CSS) will be in their respective folders

## Testing
1. **Local Testing**:
   ```bash
   # Install serve globally
   npm install -g serve
   
   # Build and serve the production build
   npm run build
   serve -s dist
   ```
   Visit `http://localhost:3000` to test.

2. **Production Testing**:
   - After deployment, visit your domain
   - Test all routes (Home, About, Projects, etc.)
   - Verify all images load correctly
   - Check responsive behavior
   - Test contact forms and other interactive elements

## Troubleshooting
1. **404 Errors on Page Refresh**:
   - Verify the `.htaccess` file is properly configured
   - Make sure mod_rewrite is enabled on the server

2. **Missing Assets**:
   - Check file permissions (should be 644 for files, 755 for directories)
   - Verify all files were uploaded correctly
   - Check network tab in browser dev tools for specific errors

3. **Blank Pages**:
   - Check browser console for JavaScript errors
   - Verify index.html was not corrupted during upload

## Notes
- The site uses relative paths (configured in `vite.config.ts` with `base: './'`)
- All static assets are served from the public directory
- React Router handles client-side routing
- The site is configured to work in both root and subdirectory deployments