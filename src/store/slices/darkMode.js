import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
    name: 'darkMode', // Utilizamos camelCase para el nombre del slice.
    initialState: false,
    reducers: {
        toggleDarkMode: (state, ) => {

            return !state// Cambiamos el nombre a algo más descriptivo.
    }
}
})

// Exportamos la acción.
export const { toggleDarkMode } = darkModeSlice.actions;

// Exportamos el selector.
// export const selectDarkMode = state => state.darkMode;

// Exportamos el reducer.
export default darkModeSlice.reducer;
