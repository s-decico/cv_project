<div align="center">
  <h1>📄 Resumate</h1>
  <p><strong>A Modern, Fast, and Intuitive CV Builder</strong></p>
  <p>Create professional, beautifully designed resumes in minutes. Resumate provides a seamless experience for inputting your professional details and generating a high-quality PDF ready for your next job application.</p>
</div>

<hr />

## ✨ Features

- **🔐 Secure Authentication:** Full user registration and login system with JWT and cookie-based sessions.
- **🎨 Modern Dark Theme UI:** A stunning, glassmorphism-inspired dark theme built with tailored CSS and Material UI components.
- **⚡ Real-time Form Validation:** Smart input fields with immediate feedback, ensuring your CV is error-free.
- **📄 Dynamic PDF Generation:** Instantly convert your CV data into a perfectly formatted, downloadable PDF using advanced HTML-to-PDF rendering.
- **📱 Responsive Design:** Build your resume on the go. The interface works beautifully on desktop and mobile.
- **💾 Auto-Save & Fetch:** Your details are securely stored in the database, allowing you to edit and update your CV anytime.

## 🛠️ Tech Stack

**Frontend**
- **React.js** (v18)
- **Material UI (MUI)** (for modern interactive components)
- **Recoil** (State management)
- **Axios** (API requests)
- **js-cookie** (Session handling)
- **html2pdf.js** & **@react-pdf/renderer** (PDF export engine)

**Backend / API Environment** *(expected integration)*
- **Node.js** & **Express.js** 
- **MongoDB** & **Mongoose** 
- **Passport.js** & **JWT** (Authentication)
- **Bcrypt** & **MD5** (Password hashing)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v24 or higher recommended) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/s-decico/cv_project.git
   cd cv_project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your backend API URL. For local development, it might look like:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   The application will launch on `http://localhost:3000`.

---

## 📖 Usage Guide

1. **Create an Account:** Start by registering a new account on the `/register` page.
2. **Build Your CV:** Navigate to "Create My CV" (the `/cvinput` route). Follow the interactive, step-by-step form to fill out your:
   - Personal Details & Links (GitHub, LinkedIn)
   - Work Experience
   - Education
   - Skills, Languages & Interests
   - Projects & Achievements
3. **Review & Download:** Proceed to the `/cv` page. The app will fetch your saved data and instantly render a live HTML preview. Click **"Download PDF"** to save your resume!

## 🌐 Deployment (Vercel)

This project is configured for seamless deployment on Vercel. 
A `vercel.json` file is included in the root directory to automatically bypass strict CI linter failures during production builds:

```json
{
  "buildCommand": "CI=false npm run build",
  "framework": "create-react-app",
  "outputDirectory": "build"
}
```
Simply connect your GitHub repository to Vercel and deploy.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/s-decico/cv_project/issues).

## 📝 License
This project is open-source and available under the MIT License.
