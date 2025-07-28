import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,    // Schema.Types.ObjectId -> MongoDB의 ObjectId를 이용한 자료형
    ref: 'User'                     // product.writer를 User 모델과 연결, console.log(product.writer.name); 하면 유저 이름이 나옴. 즉! product.writer의 ObjectId === User의 ObjectId
  },
  title: {
    type: String,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
  continents: {    // 상품 구분 [대륙]
    type: Number,
    default: 1,
  },
  views: {
    type: Number,
    default: 0,
  },
});

productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
})

const Product = mongoose.model('Product', productSchema);

export default Product;
