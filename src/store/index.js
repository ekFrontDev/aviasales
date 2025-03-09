import { configureStore } from "@reduxjs/toolkit";
import aviasalesReducer from './aviasalesSlice'

export const store = configureStore({
	reducer: {
		aviasales: aviasalesReducer,
	}
})