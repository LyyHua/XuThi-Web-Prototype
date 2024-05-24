import { createSlice } from "@reduxjs/toolkit"

type State = {
    open: boolean,
    type: string | null,
    data: any,
}

const initialState: State = {
    open: false,
    type: null,
    data: null,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeModal: (state) => {
            state.open = false
            state.type = null
            state.data = null
        }
    }
})

export const { closeModal } = modalSlice.actions