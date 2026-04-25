# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not installed):
```bash
npm install -g vercel
```

2. **Navigate to project directory**:
```bash
cd field-prospecting-lite
```

3. **Login to Vercel**:
```bash
vercel login
```

4. **Deploy**:
```bash
vercel --prod
```

5. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for new deployment)
   - What's your project's name? **field-prospecting-lite**
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

### Option 2: Using Vercel Dashboard

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Field Prospecting Lite"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Import in Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect the configuration
   - Click "Deploy"

### Option 3: Drag and Drop

1. Go to https://vercel.com/new
2. Drag and drop the `field-prospecting-lite` folder
3. Click "Deploy"

## Post-Deployment

After deployment, you'll receive:
- **Production URL**: `https://field-prospecting-lite.vercel.app` (or custom domain)
- **Preview URLs**: For each git push

## Custom Domain

To add a custom domain:

1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Environment Variables

This project doesn't require environment variables, but if you need to add any:

1. Go to project settings in Vercel
2. Navigate to "Environment Variables"
3. Add your variables

## Monitoring

- **Analytics**: Enable in Vercel dashboard under "Analytics"
- **Logs**: View real-time logs in "Deployments" → Select deployment → "Logs"

## Troubleshooting

### Build Fails
- Check `vercel.json` configuration
- Ensure all files are in the correct directories

### 404 Errors
- Verify routing configuration in `vercel.json`
- Check that `public/index.html` exists

### Assets Not Loading
- Ensure paths in HTML use relative paths (`./assets/...`)
- Check that all files are in the `public` directory

## Rollback

To rollback to a previous deployment:

1. Go to "Deployments" in Vercel dashboard
2. Find the working deployment
3. Click "..." → "Promote to Production"

## Multiple Environments

To create staging/preview environments:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## CI/CD

Vercel automatically sets up CI/CD when connected to GitHub:
- Every push to `main` → Production deployment
- Every PR → Preview deployment

## Performance Optimization

The project is already optimized with:
- Static file serving
- CDN distribution
- Automatic compression
- Edge caching

## Support

For issues:
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
