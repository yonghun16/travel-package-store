import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
} from 'redux-persist';

import userReducer from "./userSlice";


const rootReducer = combineReducers({    // reducers들을 합치는 함수
  user: userReducer,
})


const persistConfig = { 
  key: 'root',      // localStorage의 key
  storage,          // 사용할 저장소 : localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);  // persist 가능한 형태로 변환


export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(   // redux middleware에서 직렬화 데이터인지 체크
    {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST],  // 직렬화 체크를 무시할 액션들
      }
    }
  ),
  devTools: process.env.NODE_ENV !== 'production', // 기본적으로 true
});

export const persistor = persistStore(store);
