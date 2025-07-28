import express from 'express';
import User from '../models/User.js';   // mongoose model
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import Product from '../models/Product.js';
import Payment from '../models/Payment.js';
import crypto from 'crypto';
import async from 'async';


// auth route
const router = express.Router();

router.get('/auth', auth, async (req, res, next) => {
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  })
})

// register route
router.post('/register', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
})

// login route
router.post('/login', async (req, res, next) => {
  // req.body.email, password
  try {
    // 존재하는 유저인지 체크
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Auth failed, email not found');
    }

    // 비밀번호 비교
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send('Auth failed, wrong password');
    }

    /* JWT */
    // 1. paload 생성
    const payload = {
      userId: user._id.toHexString()  // MongoDB의 ObjectId가 문자열(string) 형태로 변환
    }

    // 2. token 생성
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 3. client로 전달
    const userInfo = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image
    };

    return res.json({ user: userInfo, accessToken });
  }
  catch (error) {
    next(error);
  }
})

// logout route
router.post('/logout', auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
})


// add to Cart
router.post('/cart', auth, async (req, res, next) => {
  try {
    // 먼저 User Collection에 해당 유저의 정보를 가져오기 
    const userInfo = await User.findOne({ _id: req.user._id })

    // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    })

    // 상품이 이미 있을 때
    if (duplicate) {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }
      )

      return res.status(201).send(user.cart);
    }
    // 상품이 이미 있지 않을 때
    else {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true }
      )

      return res.status(201).send(user.cart);
    }


  } catch (error) {
    next(error)
  }
})

// delte item
// 장바구니 아이템 삭제
router.delete('/cart', auth, async (req, res, next) => {
  try {
    // 1. 유저의 cart 배열에서 요청된 productId와 일치하는 상품을 제거합니다.
    const userInfo = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        "$pull": { "cart": { "id": req.query.productId } }
      },
      { new: true } // 업데이트된 문서를 반환 받기 위한 옵션
    );

    const cart = userInfo.cart;
    const array = cart.map(item => item.id);

    // 2. 제거 후 남은 상품들의 상세 정보를 다시 가져와서 프론트엔드에 응답으로 보냅니다.
    const productInfo = await Product
      .find({ _id: { $in: array } })
      .populate('writer');

    return res.json({
      productInfo,
      cart
    });

  } catch (error) {
    next(error);
  }
});


router.post('/payment', auth, async (req, res) => {
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: new Date().toISOString(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: crypto.randomUUID()
    })
  })


  transactionData.user = req.user._id;
  transactionData.product = history;

  // user collection 업데이트
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: { $each: history } }, $set: { cart: [] } }
  );

  // payment collection 저장
  const payment = new Payment(transactionData);
  const paymentDocs = await payment.save();

  let products = [];
  paymentDocs.product.forEach(item => {
    products.push({ id: item.id, quantity: item.quantity });
  });

  async.eachSeries(products, async (item) => {
    await Product.updateOne(
      { _id: item.id },
      { $inc: { sold: item.quantity } }
    );
  }, (err) => {
    if (err) return res.status(500).send(err);
    return res.sendStatus(200);
  });
});


export default router
