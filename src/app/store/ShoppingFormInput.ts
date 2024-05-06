import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  username: string;
  useremail: string;
  userphonenumber: string;
  useraddress: string;
  usernote: string;
}

const initialState: FormState = {
  username: '',
  useremail: '',
  userphonenumber: '',
  useraddress: '',
  usernote: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.useremail = action.payload;
    },
    setUserPhoneNumber: (state, action: PayloadAction<string>) => {
      state.userphonenumber = action.payload;
    },
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.useraddress = action.payload;
    },
    setUserNote: (state, action: PayloadAction<string>) => {
      state.usernote = action.payload;
    },
  },
});

export const { setUsername, setUserEmail, setUserPhoneNumber, setUserAddress, setUserNote } = formSlice.actions;

export default formSlice.reducer;