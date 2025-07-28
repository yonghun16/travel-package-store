import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import qs from 'qs'

/* import routes */
import userRouter from './routes/user.js';
import productRouter from './routes/products.js';


/* Express */
const app = express();
const PORT = process.env.PORT || 3000;

/* query parser */
app.set('query parser', str => qs.parse(str))

/* DB Connect */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => console.error('❌ MongoDB 연결 실패', err));


/* Middleware */
app.use(cors());
app.use(express.json());  // req.body를 자바스크립트 객체로 파싱
app.use(express.urlencoded({ extended: true }));    // req.body를 키/값 쌍 객체로 파싱 (중첩 구조도 가능)

/* Routes */
// '/'
app.all('/', (req, res) => {
  if (req.method === 'GET') {
    return res.send('Hello, Express!');
  }

  if (req.method === 'POST') {
    console.log(req.body);
    return res.json(req.body);
  }

  res.sendStatus(405); // Method Not Allowed
});

// '/users'
app.use('/users', userRouter); 
app.use('/products', productRouter); 


/* 정적 파일 서비스 */
// ES 모듈 방식 (__dirname 직접 구현)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../uploads')));

// Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "서버 에러");
})

/* Start server */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
