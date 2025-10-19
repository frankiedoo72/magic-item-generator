# ⚔️ Magic Item Generator

A full-stack D&D magic item generator with AI-powered artwork generation. Roll for treasure and get beautifully illustrated magic items with detailed descriptions!

## 🎮 Features

- **Interactive Frontend**: React-based UI with roll input and dropdown menus
- **Beautiful Item Display**: Book-style modal with parchment background and ornate borders
- **AI Image Generation**: Integrated DALL·E API for custom item artwork
- **Comprehensive Item Tables**: Multiple treasure types (weapons, armor, potions, etc.) and rarities
- **Export Functionality**: Open generated items in a new window for easy sharing
- **RESTful API**: Node.js/Express backend with magic item generation logic

## 📦 Project Structure

```
magic-item-generator/
├── frontend/          # React application
│   ├── src/
│   │   ├── App.js           # Main application component
│   │   ├── ItemModal.js     # Item display modal component
│   │   ├── App.css          # Main styles
│   │   └── ItemModal.css    # Modal styles
│   └── package.json
├── backend/           # Node.js API
│   ├── server.js        # Express server with magic item logic
│   └── package.json
└── README.md
```

## 🚀 One-Click Deployment

### Frontend Deployment (Vercel)

#### Step 1: Deploy Frontend to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import this repository: `magic-item-generator`

2. **Configure Build Settings**:
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

3. **Add Environment Variable**:
   ```
   REACT_APP_BACKEND_URL=<your-backend-url>
   ```
   (You'll add the backend URL after deploying the backend)

4. **Deploy**: Click "Deploy" and wait for the build to complete

5. **Get Your Frontend URL**: Copy the deployment URL (e.g., `https://magic-item-generator.vercel.app`)

### Backend Deployment (Render)

#### Step 2: Deploy Backend to Render

1. **Connect to Render**:
   - Go to [render.com](https://render.com) and sign in with GitHub
   - Click "New +" → "Web Service"
   - Connect this repository: `magic-item-generator`

2. **Configure Service**:
   ```
   Name: magic-item-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Add Environment Variables**:
   ```
   PORT=5000
   OPENAI_API_KEY=<your-openai-api-key>  (Optional - for AI image generation)
   ```

4. **Deploy**: Click "Create Web Service" and wait for deployment

5. **Get Your Backend URL**: Copy the service URL (e.g., `https://magic-item-backend.onrender.com`)

#### Step 3: Update Frontend with Backend URL

1. Go back to Vercel dashboard
2. Select your frontend project → Settings → Environment Variables
3. Add/Update:
   ```
   REACT_APP_BACKEND_URL=https://magic-item-backend.onrender.com
   ```
4. Redeploy the frontend (Deployments → click ••• → Redeploy)

### Alternative: Deploy Backend to Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create Heroku App**:
   ```bash
   heroku create magic-item-backend
   ```

3. **Set Config Variables**:
   ```bash
   heroku config:set OPENAI_API_KEY=your_api_key_here
   ```

4. **Deploy** (from the backend directory):
   ```bash
   git subtree push --prefix backend heroku main
   ```

## 🛠️ Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (optional, for AI image generation)

### Step 1: Clone the Repository

```bash
git clone https://github.com/frankiedoo72/magic-item-generator.git
cd magic-item-generator
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:

```bash
npm start
# Server will run on http://localhost:5000
```

### Step 3: Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
# App will open on http://localhost:3000
```

## 📝 API Documentation

### Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://your-backend-url.onrender.com`

### Endpoints

#### Generate Magic Item

```http
POST /api/generate
Content-Type: application/json

{
  "roll": 42,
  "treasureType": "weapon",
  "rarity": "rare"
}
```

**Response:**

```json
{
  "name": "Flametongue Sword",
  "description": "You can command this sword to burst into flames, dealing an extra 2d6 fire damage.",
  "rarity": "rare",
  "type": "weapon",
  "roll": 42,
  "treasureType": "weapon",
  "imageUrl": "https://..."
}
```

#### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "OK",
  "message": "Magic Item Generator API is running"
}
```

## 🎨 Treasure Types & Rarities

### Treasure Types

- **Weapon**: Swords, axes, bows, daggers, etc.
- **Armor**: Plate, leather, shields, cloaks
- **Potion**: Healing, invisibility, flying, etc.
- **Wondrous**: Magical items with unique properties
- **Ring**: Magical rings with various powers
- **Scroll**: Spell scrolls

### Rarity Levels

- **Common**: Basic magical items
- **Uncommon**: More powerful enchantments
- **Rare**: Highly sought-after items
- **Very Rare**: Legendary power
- **Legendary**: The stuff of legends

## 🔑 Environment Variables

### Frontend (.env)

```env
REACT_APP_BACKEND_URL=<backend-api-url>
```

### Backend (.env)

```env
PORT=5000
OPENAI_API_KEY=<your-openai-key>  # Optional for AI images
```

## 📊 Deployment URLs

After deployment, your app will be available at:

- **Frontend**: `https://<your-app>.vercel.app`
- **Backend**: `https://<your-service>.onrender.com` or `https://<your-app>.herokuapp.com`

## 👨‍💻 Tech Stack

### Frontend

- React 18.2
- Axios for API calls
- CSS3 for styling

### Backend

- Node.js
- Express.js
- OpenAI API (DALL·E 3)
- CORS middleware

## 📝 Features Breakdown

### Frontend Features

✅ Roll input field (1-100)
✅ Dropdown for treasure type selection
✅ Dropdown for rarity selection
✅ Book-style modal with parchment design
✅ AI-generated item images
✅ "Open in New Window" functionality
✅ Responsive design
✅ Loading states

### Backend Features

✅ Magic item generation based on roll and tables
✅ 6 treasure types with multiple items each
✅ AI image generation via OpenAI DALL·E 3
✅ RESTful API design
✅ Error handling
✅ Health check endpoint
✅ CORS enabled

## 🔧 Troubleshooting

### Frontend Issues

**Issue**: "Failed to fetch" or CORS errors
- **Solution**: Ensure `REACT_APP_BACKEND_URL` is set correctly
- Check that backend is running and accessible

**Issue**: Images not loading
- **Solution**: Verify OpenAI API key is configured in backend
- Check browser console for errors

### Backend Issues

**Issue**: Server not starting
- **Solution**: Check that all dependencies are installed (`npm install`)
- Verify PORT environment variable

**Issue**: AI images not generating
- **Solution**: Ensure valid OpenAI API key is set
- Check OpenAI account has credits/access to DALL·E

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Render Deployment Docs](https://render.com/docs)
- [Heroku Deployment Docs](https://devcenter.heroku.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Documentation](https://react.dev/)

## 🎉 Quick Start Summary

1. **Fork/Clone** this repository
2. **Deploy Backend** to Render or Heroku
3. **Deploy Frontend** to Vercel (with backend URL)
4. **Add OpenAI API Key** (optional) to backend environment variables
5. **Access your app** at the Vercel URL
6. **Roll for treasure!** 🎲

## 📧 Support

For issues or questions, please open an issue on GitHub.

## 📜 License

MIT License - feel free to use this project for your campaigns!

---

**Happy adventuring! May your rolls be high and your loot be legendary!** ⚔️🛡️✨
