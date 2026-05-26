# 🚀 Cyberpunk Developer Portfolio — Navneet Kesarwani

A dark-themed, terminal-aesthetic personal portfolio command center for **Navneet Kesarwani** — Full Stack Developer & DevOps Enthusiast (SDE Intern @ Codeinbound, ACM Web Co-Head).

Inspired by the high-tech precision of cybernetic monitors and recruiter-optimized layout flows. Designed for lightning-fast speeds and fully responsive visual interfaces.

---

## 📁 File Structure

```text
Navneet_Portfolio/
├── index.html            # Main semantic HTML5 structure with SEO metadata
├── README.md             # Setup guide and documentation
└── assets/
    ├── css/
    │   ├── main.css      # Core styles, glass layouts, variables, HUD styling
    │   ├── animations.css# Neon pulses, vertical scanlines, observer transitions
    │   └── responsive.css# Collapsible drawer nav, mobile scaling, timeline formats
    ├── js/
    │   ├── main.js       # Simulated terminal boot, crosshair tracking, active highlights
    │   ├── particles.js  # Dynamic connecting 2D HTML5 canvas nodes network
    │   ├── counters.js   # Telemetry count-ups triggered on screen entry
    │   └── form.js       # Handshake contact form interception with visual alerts
    └── img/
        ├── profile.png   # Premium cybernetic developer avatar illustration
        └── og-image.png  # Widescreen high-tech Open Graph share preview banner
```

---

## ⚡ Key Highlights & Cyber Animations

1. **Simulated Boot Sequence:** The hero panel simulates a server booting up, listing tech assets line-by-line using micro-interval pauses.
2. **Interactive Node Grid Backdrop:** Custom 2D HTML5 canvas mesh that draws kinetic nodes and connects links dynamically. Features active attraction lines linking directly to the visitor's cursor coordinates.
3. **Telemetry Counter Rollouts:** Numbers (LeetCode solved, internship duration, mentored counts) increment dynamically using quadratic frames on screen scroll.
4. **Smart Crosshair Cursor:** Custom indicator following mouse moves, changing size and swapping to indicator status colors on clickable links/cards.
5. **Responsive Journey Timeline:** Spans alternating left-right center node formats on desktops and scales down to a simplified left-aligned single stream on mobile screens.
6. **Form Interceptor:** Form submissions validate vectors, simulate data packet compression pipelines in real-time, and trigger animated overlay HUD notifications.

---

## 🛠️ Personalization & Customization Guide

### 1. Update LeetCode and Telemetry Statistics
To adjust metrics, modify the `data-target` values inside the `#metrics` section in [index.html](file:///C:/Users/anike.000/Desktop/Navneet_Portfolio/index.html):
```html
<div class="metric-number" data-target="600" data-suffix="+">0</div> <!-- Change 600 to your current solve count -->
```

### 2. Substitute Your Resume (CV)
Replace the template resume at [assets/resume.pdf](file:///C:/Users/anike.000/Desktop/Navneet_Portfolio/assets/resume.pdf) with your actual PDF CV. Keep the filename exactly as `resume.pdf` to avoid breaking links.

### 3. Connect the Contact Form (Formspree)
1. Register a free account at [Formspree](https://formspree.io).
2. Create a new form project and copy the resulting Form ID (e.g. `xpzoqarg`).
3. Update the action attribute inside the contact form in [index.html](file:///C:/Users/anike.000/Desktop/Navneet_Portfolio/index.html):
```html
<form id="cyber-contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### 4. Swap Social Channel Coordinates
Modify the links in [index.html](file:///C:/Users/anike.000/Desktop/Navneet_Portfolio/index.html) to link your active LinkedIn, GitHub, and professional email:
```html
<a href="https://github.com/YourGitHub" target="_blank" class="social-link-item">...</a>
```

---

## 💻 Running & Testing Locally

Since this is built using blazing-fast, vanilla HTML5, CSS3, and JavaScript, you can open and run it instantly:

1. Double-click [index.html](file:///C:/Users/anike.000/Desktop/Navneet_Portfolio/index.html) to load it in any browser.
2. For testing responsiveness and interactive form callbacks locally, run a lightweight local server:
   ```bash
   npx http-server ./
   ```
   Or open the folder in VS Code and hit **"Go Live"** using the Live Server extension.

---

## 🚀 Cloud Deployment

### Vercel (Recommended)
1. Push this folder to a GitHub repository (e.g. `navneet-portfolio`).
2. Log into [Vercel](https://vercel.com).
3. Click **"Add New"** → **"Project"** → **Import** your repository.
4. Leave all build configurations as default.
5. Click **"Deploy"**. Done!

---

*Handled and styled by Antigravity — Pair Programming Complete.*
