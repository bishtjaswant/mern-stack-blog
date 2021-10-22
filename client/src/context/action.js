import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from './type';




export const loginStart=(userCredential)=>({
    type:LOGIN_START,
    // payload:userCredential
});


export const loginSuccess=(user)=>({
    type:LOGIN_SUCCESS,
    payload:user
});


export const loginFailure=(error)=>({
    type:LOGIN_FAILURE,
    payload:error,
});


export const logout=( )=>({
    type:LOGOUT
});

