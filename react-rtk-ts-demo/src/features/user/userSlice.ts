import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type User = {
    id: number,
    name: string
}
type InitialState = {
    loading: boolean,
    user: User[],
    error: string
}

const initialState: InitialState = {
    loading: false,
    user: [],
    error: ''
}

export const fetchUser = createAsyncThunk('user/fetchUsers', () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false,
            state.user = action.payload,
            state.error = ''
        }),
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false,
            state.user = [],
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default userSlice.reducer;
