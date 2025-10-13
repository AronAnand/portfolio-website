# Aron C Anand - Portfolio Website

A modern, responsive portfolio website showcasing AI/ML and software engineering expertise.

## Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Interactive Elements**: Smooth scrolling, animated counters, hover effects, and more
- **Performance Optimized**: Lazy loading, debounced scroll events, and efficient animations
- **Accessible**: Semantic HTML and ARIA labels for better accessibility
- **SEO Friendly**: Proper meta tags and semantic structure

## Sections

1. **Hero Section**: Eye-catching introduction with social links
2. **About**: Professional summary with key statistics
3. **Experience**: Timeline of work experience and achievements
4. **Projects**: Showcase of featured projects with technology tags
5. **Skills**: Categorized technical skills display
6. **Education**: Academic background
7. **Contact**: Multiple ways to get in touch

## Quick Start

### Option 1: Open Directly in Browser

Simply double-click on `index.html` or right-click and select "Open with Browser"

### Option 2: Use Live Server (Recommended for Development)

If you have Python installed:

```bash
# Navigate to the portfolio directory
cd /home/aron/Desktop/portfolio

# Start a local server (Python 3)
python3 -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 3: Use VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Customization Guide

### Updating Personal Information

#### Contact Information
Edit the contact links in `index.html`:
- Email: Search for `aronc.anand3@gmail.com` and replace
- Phone: Search for `+91 759 728 2893` and replace
- LinkedIn: Update the URL `https://linkedin.com/in/aroncanand`
- GitHub: Update the URL `https://github.com/AronAnand`
- LeetCode: Update the URL `https://leetcode.com/u/Aron-droid/`

#### Resume Content
All text content is in `index.html`. Search for the section you want to update:
- Summary: Look for `<section id="about">`
- Experience: Look for `<section id="experience">`
- Projects: Look for `<section id="projects">`
- Skills: Look for `<section id="skills">`
- Education: Look for `<section id="education">`

### Customizing Colors

Edit the CSS variables in `styles.css` (lines 5-20):

```css
:root {
    --primary-color: #6366f1;     /* Main brand color */
    --secondary-color: #8b5cf6;   /* Secondary brand color */
    --accent-color: #ec4899;      /* Accent highlights */
    /* ... other colors ... */
}
```

### Adding New Projects

In `index.html`, find the `<section id="projects">` and add a new project card:

```html
<div class="project-card">
    <div class="project-header">
        <h3>Your Project Name</h3>
        <span class="project-company">Company/Client Name</span>
    </div>
    <p class="project-description">
        Your project description here...
    </p>
    <div class="project-tags">
        <span class="tag">Technology 1</span>
        <span class="tag">Technology 2</span>
        <!-- Add more tags as needed -->
    </div>
</div>
```

### Adding New Skills

In `index.html`, find the skill category you want to update and add:

```html
<span class="skill-tag">New Skill</span>
```

### Modifying Animations

In `script.js`, you can:
- Enable typing effect (line 88-92)
- Enable cursor trail effect (line 291-335)
- Adjust animation speeds and delays

## File Structure

```
portfolio/
│
├── index.html          # Main HTML file with content
├── styles.css          # All styling and responsive design
├── script.js           # Interactive features and animations
└── README.md          # This file
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Intersection Observer API for scroll animations
- Debounced scroll events
- Lazy loading for images
- CSS animations using GPU acceleration
- Optimized CSS with custom properties

## Interactive Features

1. **Smooth Scrolling**: Click navigation links for smooth transitions
2. **Mobile Navigation**: Responsive hamburger menu for mobile devices
3. **Animated Counters**: Statistics animate when scrolled into view
4. **Hover Effects**: Interactive elements respond to user interaction
5. **Back to Top Button**: Appears when scrolling down
6. **Copy Email**: Click email link to copy to clipboard
7. **Parallax Effect**: Hero section has subtle parallax scrolling

## Deployment Options

### GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select branch and save
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Free)
1. Sign up at netlify.com
2. Drag and drop the portfolio folder
3. Your site will be live instantly

### Vercel (Free)
1. Sign up at vercel.com
2. Import your GitHub repository or upload files
3. Deploy with one click

### Traditional Hosting
Upload all three files (index.html, styles.css, script.js) to your web host's public_html or www directory

## Tips for Customization

1. **Keep it Updated**: Regularly update your projects and experience
2. **Optimize Images**: If you add images, compress them for faster loading
3. **Test Responsive Design**: Use browser dev tools to test on different screen sizes
4. **Validate HTML**: Use W3C Validator to ensure clean code
5. **Check Performance**: Use Lighthouse in Chrome DevTools

## Adding Your Photo (Optional)

To add a profile picture:

1. Add an `images` folder to your portfolio directory
2. Save your photo as `profile.jpg` in the images folder
3. Add this code in the About section of `index.html`:

```html
<div class="about-content">
    <div class="about-image">
        <img src="images/profile.jpg" alt="Aron C Anand">
    </div>
    <div class="about-text">
        <!-- existing text -->
    </div>
</div>
```

4. Add this CSS to `styles.css`:

```css
.about-content {
    display: flex;
    gap: 3rem;
    align-items: center;
}

.about-image img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--primary-color);
    box-shadow: var(--shadow-xl);
}
```

## Support & Issues

If you encounter any issues or need help customizing:
1. Check the browser console for errors (F12 > Console)
2. Ensure all three files are in the same directory
3. Verify your changes didn't break HTML/CSS syntax

## License

Feel free to use this template for your personal portfolio. No attribution required.

---

**Built with ❤️ using HTML, CSS, and JavaScript**

Last Updated: October 2025
