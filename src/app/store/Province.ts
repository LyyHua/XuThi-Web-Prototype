import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OptionType {
    value: string;
    text: string;
}

interface ProvinceState {
  selectedCity: OptionType | null;
  selectedDistrict: OptionType | null;
  selectedWard: OptionType | null;
}

const initialState: ProvinceState = {
  selectedCity: null,
  selectedDistrict: null,
  selectedWard: null,
};

export const provinceSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<OptionType | null>) => {
      state.selectedCity = action.payload;
    },
    setSelectedDistrict: (state, action: PayloadAction<OptionType | null>) => {
      state.selectedDistrict = action.payload;
    },
    setSelectedWard: (state, action: PayloadAction<OptionType | null>) => {
      state.selectedWard = action.payload;
    },
    resetProvince: () => initialState,
},
});

export const { setSelectedCity, setSelectedDistrict, setSelectedWard, resetProvince } = provinceSlice.actions;

export default provinceSlice.reducer;