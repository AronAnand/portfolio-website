# Portfolio Deployment Guide

Complete guide to hosting your portfolio with a custom domain name.

## Quick Hosting Options

### Option 1: GitHub Pages (Free & Recommended)

**Best for**: Free hosting with custom domain support

#### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon (top right) → "New repository"
3. Name it: `portfolio` or `your-name-portfolio`
4. Keep it **Public**
5. Click "Create repository"

#### Step 2: Upload Your Files

**Method A: Using Git (Recommended)**

```bash
cd /home/aron/Desktop/portfolio

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial portfolio commit"

# Add your GitHub repository as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Method B: Using GitHub Web Interface**

1. On your repository page, click "uploading an existing file"
2. Drag and drop: `index.html`, `styles.css`, `script.js`, `README.md`
3. Click "Commit changes"

#### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (left sidebar)
4. Under "Source", select: **main** branch
5. Click "Save"
6. Wait 2-3 minutes

Your site will be live at: `https://YOUR-USERNAME.github.io/portfolio/`

#### Step 4: Add Custom Domain (Optional)

**Buy a domain** from:
- [Namecheap](https://www.namecheap.com) (~$8-12/year) - Recommended
- [GoDaddy](https://www.godaddy.com)
- [Google Domains](https://domains.google)
- [Cloudflare](https://www.cloudflare.com/products/registrar/)

**Popular domain options for you:**
- `aroncanand.com`
- `aron-anand.com`
- `aroncanand.dev`
- `aronc.dev`

**Configure DNS:**

1. In your domain registrar (Namecheap, etc.), go to DNS settings
2. Add these DNS records:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR-USERNAME.github.io
```

3. On GitHub:
   - Go to Settings → Pages
   - Under "Custom domain", enter: `yourdomain.com`
   - Check "Enforce HTTPS"
   - Click "Save"

4. Wait 24-48 hours for DNS propagation (usually takes 1-2 hours)

---

### Option 2: Netlify (Free, Easiest)

**Best for**: Super simple deployment with automatic HTTPS

#### Step 1: Deploy

**Method A: Drag & Drop**

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Click "Add new site" → "Deploy manually"
4. Drag your entire `/home/aron/Desktop/portfolio` folder
5. Done! Your site is live in seconds

**Method B: GitHub Integration**

1. Push code to GitHub (see Option 1)
2. Go to [netlify.com](https://www.netlify.com)
3. Click "Add new site" → "Import from Git"
4. Connect your GitHub account
5. Select your portfolio repository
6. Click "Deploy site"

Your site will be live at: `https://random-name-12345.netlify.app`

#### Step 2: Custom Domain

1. In Netlify dashboard, click "Domain settings"
2. Click "Add custom domain"
3. Enter your domain: `yourdomain.com`
4. Follow DNS configuration instructions
5. Netlify provides free SSL certificate automatically

---

### Option 3: Vercel (Free, Fast)

**Best for**: Lightning-fast global CDN

#### Deploy Steps

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your portfolio repository
5. Click "Deploy"

Your site will be live at: `https://your-portfolio.vercel.app`

#### Custom Domain

1. Click "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Free SSL included

---

### Option 4: Cloudflare Pages (Free)

**Best for**: Best performance + built-in security

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up / log in
3. Click "Create a project"
4. Connect your GitHub repository
5. Click "Deploy"

Free domain: `https://your-portfolio.pages.dev`

---

## Domain Name Recommendations

### For Your Profile (Aron C Anand)

**Top Choices:**
1. `aroncanand.com` ⭐ Best option
2. `aroncanand.dev` ⭐ Great for developers
3. `aron-anand.com`
4. `aronc.dev`

**Cost**: $8-12/year for `.com`, $12-15/year for `.dev`

### Where to Buy

**Recommended: Namecheap**
- Affordable
- Free privacy protection
- Easy DNS management
- Good support

**Steps:**
1. Go to [namecheap.com](https://www.namecheap.com)
2. Search for `aroncanand.com`
3. Add to cart
4. Create account and pay (~$10/year)
5. Use DNS settings from hosting provider above

---

## Complete Deployment Flow (Recommended Path)

### 🎯 Best Setup for You

**Hosting**: GitHub Pages (Free forever)
**Domain**: `aroncanand.com` from Namecheap ($10/year)

### Step-by-Step

#### Part 1: GitHub Pages (5 minutes)

```bash
cd /home/aron/Desktop/portfolio

# Initialize git
git init
git add .
git commit -m "Initial commit: Professional portfolio"

# Create repository on GitHub (do this first on github.com)
# Then run:
git remote add origin https://github.com/AronAnand/portfolio.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in Settings → Pages → Select 'main' branch

#### Part 2: Buy Domain (10 minutes)

1. Go to [namecheap.com](https://www.namecheap.com)
2. Search: `aroncanand.com`
3. Purchase ($10/year)

#### Part 3: Connect Domain (5 minutes)

**In Namecheap:**
1. Dashboard → Domain List → Manage
2. Advanced DNS tab
3. Add records:

```
Type        Host    Value                   TTL
A Record    @       185.199.108.153         Automatic
A Record    @       185.199.109.153         Automatic
A Record    @       185.199.110.153         Automatic
A Record    @       185.199.111.153         Automatic
CNAME       www     aronAnand.github.io     Automatic
```

**In GitHub:**
1. Repository → Settings → Pages
2. Custom domain: `aroncanand.com`
3. Check "Enforce HTTPS"
4. Save

#### Part 4: Wait & Verify

- Wait 1-2 hours for DNS to propagate
- Visit `aroncanand.com` - your portfolio is live! 🎉

---

## Free Alternatives (No Custom Domain Needed)

If you don't want to buy a domain right now:

### 1. GitHub Pages (Free subdomain)
- URL: `https://aronAnand.github.io/portfolio/`
- Free forever
- Professional enough for resume

### 2. Netlify (Free subdomain)
- URL: `https://aron-anand.netlify.app`
- Can customize subdomain
- Very fast

### 3. Vercel (Free subdomain)
- URL: `https://aron-anand.vercel.app`
- Excellent performance

---

## Updating Your Portfolio

After deploying, to make changes:

### If using GitHub Pages:

```bash
cd /home/aron/Desktop/portfolio

# Make your edits to files
# Then:

git add .
git commit -m "Update portfolio content"
git push
```

Changes will be live in 1-2 minutes!

### If using Netlify/Vercel:

**Method 1**: Push to GitHub (auto-deploys)
**Method 2**: Drag & drop new files to dashboard

---

## Domain Email Setup (Bonus)

Once you have `aroncanand.com`, you can create:
- `contact@aroncanand.com`
- `aron@aroncanand.com`

**Free options:**
1. **Cloudflare Email Routing** (Free) - Forwards to Gmail
2. **Zoho Mail** (Free for 5 accounts)
3. **Google Workspace** ($6/month)

---

## Quick Commands Reference

```bash
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR-REPO-URL
git push -u origin main

# Future updates
git add .
git commit -m "Update description"
git push

# Check status
git status

# View history
git log --oneline
```

---

## Troubleshooting

### GitHub Pages not loading?
- Wait 5 minutes after enabling
- Check Settings → Pages shows green checkmark
- Clear browser cache (Ctrl+Shift+R)

### Custom domain not working?
- Wait 24-48 hours for DNS propagation
- Use [whatsmydns.net](https://www.whatsmydns.net) to check DNS
- Verify DNS records match exactly

### Changes not showing?
- Clear browser cache
- Wait 2-3 minutes for deployment
- Check repository has latest commit

### SSL Certificate error?
- Uncheck "Enforce HTTPS" → Save → Wait 5 minutes
- Check "Enforce HTTPS" again → Save

---

## Cost Summary

### Completely Free Option
- **Hosting**: GitHub Pages (Free)
- **URL**: `aronAnand.github.io/portfolio`
- **SSL**: Free
- **Total**: $0/year

### Professional Option
- **Hosting**: GitHub Pages (Free)
- **Domain**: Namecheap aroncanand.com ($10/year)
- **SSL**: Free (GitHub provides)
- **Total**: $10/year

### Premium Option
- **Hosting**: Netlify/Vercel (Free)
- **Domain**: `.dev` domain ($15/year)
- **Email**: Zoho Mail (Free)
- **SSL**: Free
- **Total**: $15/year

---

## Next Steps

1. **Immediate** (Free): Deploy to GitHub Pages
2. **This week** (Optional): Buy domain name
3. **After domain**: Set up professional email
4. **Ongoing**: Update portfolio with new projects

---

## Need Help?

If you get stuck:
1. Check GitHub Pages documentation: [docs.github.com/pages](https://docs.github.com/pages)
2. Netlify support: [docs.netlify.com](https://docs.netlify.com)
3. Namecheap DNS guide: [namecheap.com/support](https://www.namecheap.com/support)

---

**Ready to deploy?** Start with GitHub Pages - it's free and takes 5 minutes! 🚀
