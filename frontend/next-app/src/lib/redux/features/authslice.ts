import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    accessToken : string | null;
}

const initialState: AuthState = {
    accessToken : null,

}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken : (state, action: PayloadAction<string>) => { // PayloadAction : 함수에 매개변수로 들어오는 자료형 지정정
            state.accessToken = action.payload;
        },
        clearAccessToken : (state) => {
            state.accessToken = null;
        }

    }
    

})

export const {setAccessToken, clearAccessToken} = authSlice.actions;
export default authSlice