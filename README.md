# scrolls
scroll elegantly
# scrolls

 scroll elegantly

scrolls is an AI-powered art discovery platform that combines the "best of Dribbble" frontend aesthetic with a robust backend system for curating and exploring classical art history. Users can browse artworks, view artist biographies, listen to curated music while scrolling, and engage with a community of art lovers.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup](#-setup)
  - [Prerequisites](#-prerequisites)
  - [Backend](#-backend)
  - [Frontend](#-frontend)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## 🎨 Features

### For Art Lovers
- **Beautiful Infinite Scroll**: Browse classical artworks with a stunning, fluid infinite scroll interface.
- **AI-Powered Recommendations**: Discover art based on your preferences and behavior.
- **Social Interaction**:
  - Follow your favorite artists.
  - Like, save, and comment on artworks.
  - View personalized feeds.
- **Immersive Experience**:
  - **Audio Integration**: Listen to curated music (classical, jazz, lo-fi) that matches the artwork's era or mood.
  - **Mood-Based Playlists**: Curated playlists like "Renaissance Serenity," "Baroque Drama," etc.
- **Dark & Light Modes**:
  - Switch between dark and light themes for comfortable viewing.

### For Administrators
- **Admin Dashboard**: Manage artworks, artists, users, and system settings.
- **Content Management**:
  - Add, edit, or delete artworks and artists.
  - Curate audio tracks and playlists.
  - Manage comments and user content.

## 💻 Tech Stack

### Backend
- **Framework**: Django
- **Database**: PostgreSQL
- **Authentication**: Django Rest Framework Simple JWT
- **AI/ML**: TensorFlow.js for recommendation engine
- **Deployment**: Gunicorn + Nginx (recommended)

### Frontend
- **Framework**: React
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Animation**: Framer Motion
- **Audio**: react-h5-audio-player
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Vite

## 🚀 Setup

### Prerequisites
- **Node.js**: v18+
- **Python**: v3.10+
- **PostgreSQL**: v13+
- **npm** or **yarn**

### Backend
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scrolls/backend
   ```

2. **Create a virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure PostgreSQL**
   Create a database named `scrolls`:
   ```sql
   CREATE DATABASE scrolls;
   ```

5. **Set up environment variables**
   Create a `.env` file in the `backend` directory:
   ```ini
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/scrolls
   ALLOWED_HOSTS=*
   ```

6. **Run migrations**
   ```bash
   python manage.py migrate
   ```

7. **Create a superuser** (optional)
   ```bash
   python manage.py createsuperuser
   ```

8. **Start the development server**
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000`.

### Frontend
1. **Navigate to the frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173` (or a random port).

## 🏗️ Project Structure

```
scrolls/
├── backend/                    # Django Backend
│   ├── manage.py
│   ├── settings.py
│   ├── urls.py
│   ├── catalog/                # Artworks and Artists
│   ├── social/                 # Social features
│   ├── accounts/               # User authentication
│   └── ...
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── store/              # State management
│   │   ├── utils/              # Utility functions
│   │   └── App.tsx
│   ├── public/
│   ├── .env.local             # Environment variables
│   └── ...
│
├── README.md
└── .gitignore
```

## 🎨 Backend Details

The backend is built with Django and provides the following features:

### Models
- **Artist**: Artist information including name, nationality, biography, and artwork count.
- **Artwork**: Artworks with title, year, medium, museum, image URL, descriptions, and audio information.
- **Follow**: User-artist following relationships.
- **Like**: User likes on artworks.
- **Save**: User saves (bookmarks) artworks.
- **Comment**: User comments on artworks.

### API Endpoints
- **Authentication**: Register, login, logout, token refresh.
- **Artists**: List, retrieve, search, and filter artists.
- **Artworks**: List, retrieve, search, filter, and increment view count.
- **Social**: Follow/unfollow artists, like/unlike artworks, save/unsave artworks, manage comments.
- **Admin**: Full CRUD operations for all models.

### AI Features
- **Recommendation System**: Basic recommendation engine based on user interactions.
- **Model Training**: You can train the recommendation model using historical data.

## ⚛️ Frontend Details

The frontend is a modern React application with a focus on user experience:

### Key Features
- **Home Page**: Infinite scroll of artworks with curated playlists.
- **Artist Pages**: Detailed artist information with their artworks.
- **Artwork Detail**: Complete artwork details with audio player and social features.
- **User Dashboard**: Personalized feed of liked, saved, and followed content.
- **Search**: Global search across artworks and artists.
- **User Settings**: Profile management and theme preferences.
