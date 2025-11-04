import express from 'express';
import cors from 'cors';  
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resumeRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [
  'http://localhost:5173',                     // local frontend (Vite)                // 🔁 replace with your actual local IP
  'https://resumexpert-sp.netlify.app'   // 🔁 replace with deployed frontend URL
];
app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('❌ Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));
//app.use(express.json());
//connect db
connectDB();
// middlewares
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/resume', resumeRoutes);
app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'),{
        setHeaders: (res, _path) => {
            res.set('Access-Control-Allow-Origin', '*');
        }
    })

)
//routes
app.get('/', (req, res)=> {
    res.send('API is running....')
})
//listen server
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});