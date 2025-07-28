import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios'

/* Thunk Functions 생성 */
// register
export const registerUser = createAsyncThunk(
  'user/registerUser',    // thunk action 이름 , 내부적으로는 user/loginUser/pending, fulfilled, rejected로 자동 생성되어 상태 추적이 가능
  async (signUpData, thunkAPI) => {  // signUpData는 회원가입 폼에서 받은 데이터, thunkAPI는 dispatch, getState, rejectWithValue 등을 제공하는 객체
    try {
      const response = await axiosInstance.post(
        `/users/register`,
        signUpData
      )

      return response.data;  // 요청이 성공하면 response.data를 반환, 이 값은 extraReducers에서 action.payload로 받을 수 있습니다.
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/login`,
        userData
      )

      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// auth
export const authUser = createAsyncThunk(
  'user/authUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/users/auth`
      )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// logout
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/logout`
      )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// add cart
export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/cart`,
        body
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
)


// get cartItems
export const getCartItems = createAsyncThunk(
  "user/getCartItems",
  async ({ cartItemIds, userCart }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/products/${cartItemIds.join(',')}?type=array`
      );

      // CartIteme들에 해당하는 정보들을
      // Product Collection에서 가져온 후에
      // Quantity 정보를 넣어준다.
      userCart.forEach(cartItem => {
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity
          }
        })
      })

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
)


// remove cartItems
export const removeCartItem = createAsyncThunk(
  "user/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/users/cart?productId=${productId}`
      );

      response.data.cart.forEach(cartItem => {
        response.data.productInfo.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data.productInfo[index].quantity = cartItem.quantity
          }
        })
      })

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
)


// payment
export const payProducts = createAsyncThunk(
  "user/payProducts",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/payment`,
        body
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
)
