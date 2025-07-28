import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // User 모델 경로 맞게 조정

const auth = async (req, res, next) => {
  try {

    /* JWT 인증 */
    // 토큰을 request headers에서 가져오기
    const authHeader = req.headers['authorization'];

    // 토큰을 분리(Bearer + 토큰 구조에서 토큰만 추출)
    const token = authHeader && authHeader.split(' ')[1]?.replace(/^"|"$/g, '');;

    // 토큰이 없다면 리턴
    if (!token) {
      return res.status(401).json({ message: 'Access Token이 없습니다.' });
    }

    // 토큰 인증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('디코딩 결과:', decoded);

    /* 유저 인증 */
    const user = await User.findById(decoded.userId);

    // 유저이 없다면 리턴
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    req.user = user;
    next();
  } catch (err) {
    // 서버에만 에러 로그 기록
    console.error('인증 에러:', err.message);

    // 클라이언트에게는 상세 에러를 노출하지 않음
    return res.status(401).json({ message: '인증에 실패했습니다.' });
  }
};

export default auth;
