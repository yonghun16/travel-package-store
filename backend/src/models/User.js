import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  role: {
    type: Number,
    default: 0,   // 0은 일반유저, 1은 관리자
  },
  image: String,
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
});


// 🛠 비밀번호 해싱 미들웨어
userSchema.pre('save', async function (next) {
  const user = this;

  // 비밀번호가 변경되었을 때만 해시
  if (!user.isModified('password')) return next();

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// 🛠 비밀번호 비교
userSchema.methods.comparePassword = async function (plainPassword) {  // function 키워드를 사용한 이유는 전통적인 함수 문법에서는 this가 호출 시점의 객체를 가리키기 때문
  try {
    return await bcrypt.compare(plainPassword, this.password);  // (사용자가 입력한 비밀번호, 데이터베이스에 저장된 해시된 비밀번호)
  } catch (err) {
    throw err;
  }
}

const User = mongoose.model('User', userSchema);  // User 모델은 몽구스를 통해 몽고DB와 연결됨.

export default User;
