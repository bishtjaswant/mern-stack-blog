import { createContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';

const INITIAL_STATE={
        user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    isError:false,
}

export const ContextApi =  createContext(INITIAL_STATE);

export default function ContextProvider({children}) {
    
  const [state, dispatch]=  useReducer(reducer, INITIAL_STATE);
 

//   console.log('state in context provider :>> ', state);

  useEffect(()=>{
      localStorage.setItem('user', JSON.stringify(state.user))
  },
  [state.user]);

   return(
    <ContextApi.Provider value={{
        user:state.user,
        isFetching:state.isFetching,
        isError:state.isError,
        dispatch,
    }}>

        {children}
    </ContextApi.Provider>
   )

};
