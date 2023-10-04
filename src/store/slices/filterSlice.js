import { createSlice } from '@reduxjs/toolkit';

const dataCountry = createSlice({
    name: 'textCountryes',
    initialState: null,
    reducers: {
      dataCountrytext: (state, action) => {
         
        return action.payload
      }
    }
})

export const { dataCountrytext } = dataCountry.actions

export default dataCountry.reducer;
