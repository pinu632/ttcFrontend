import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'
import notificationSlice from './Slices/NotificationSlie'
import blogSlice from './Slices/blogOpenSlice'
// ...

export const store = configureStore({
    reducer: {
       auth:authSlice,
       notification:notificationSlice,
       blog:blogSlice
    }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']