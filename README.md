# note: pls change branch to cv 

# Visual Story - Interactive Storytelling Web Application

A modern, interactive storytelling web application built with React, TypeScript, and Tailwind CSS. Create and experience dynamic stories with branching narratives and beautiful visual elements.

## 🌟 Features

- **Interactive Storytelling**: Create and play through branching story narratives
- **Google OAuth Integration**: Secure authentication with Google accounts
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **Sound Effects**: Immersive audio experience with background music and sound effects
- **Dark/Light Theme**: Toggle between dark and light themes
- **Session Management**: Save and resume story sessions
- **Drag & Drop Interface**: Interactive elements with drag functionality
- **Animated UI**: Smooth animations and transitions using Framer Motion

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Authentication**: Google OAuth
- **HTTP Client**: TanStack React Query
- **Build Tool**: Vite
- **Deployment**: Docker, Nginx

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vucongchien/visual-story
   cd visual-story
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add your configuration:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 Usage

### Getting Started

1. **Welcome Screen**: Click anywhere on the welcome screen to begin
2. **Authentication**: Sign in with your Google account
3. **Dashboard**: View your story sessions or create a new one
4. **Story Creation**: Choose genre and setting for your story
5. **Interactive Play**: Make choices to progress through the story

### Features Overview

- **Session Management**: Create, view, and delete story sessions
- **Story Progression**: Make choices that affect the story's direction
- **Visual Elements**: Enjoy beautiful backgrounds and animated elements
- **Sound Controls**: Toggle sound effects and background music
- **Theme Toggle**: Switch between dark and light themes

## 🏗️ Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── pages/            # Page components
├── routes/           # Routing configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## 🐳 Docker Deployment

### Build and Run with Docker

1. **Build the Docker image**
   ```bash
   docker build -t visual-story .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 visual-story
   ```

3. **Access the application**
   Navigate to `http://localhost:80`

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  visual-story:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and building. Configuration can be found in `vite.config.ts`.

### ESLint Configuration
ESLint is configured for code quality. Configuration can be found in `eslint.config.js`.

### TypeScript Configuration
TypeScript configuration is split between `tsconfig.json` (base), `tsconfig.app.json` (app-specific), and `tsconfig.node.json` (Node.js specific).

## 🌐 Deployment

### Fly.io Deployment
The project includes `fly.toml` for easy deployment to Fly.io:

```bash
fly deploy
```

### Other Platforms
The application can be deployed to any static hosting platform:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Story sharing features
- [ ] Advanced story editor
- [ ] Community story marketplace
- [ ] Mobile app version
- [ ] Voice narration
- [ ] Story templates

---

**Happy Storytelling! 📚✨**
