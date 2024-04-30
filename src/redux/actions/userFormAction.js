import { ADD_BENEFICIARY, ADD_USER, BENEFICIARY_USER, DELETE_USER, EDIT_USER, IS_LOADING, UPDATE_USER } from "../type"

export const userFormsAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: ADD_USER,
            payload: data
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}

export const userEditAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: EDIT_USER,
            payload: data
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}

export const userUpdateAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: UPDATE_USER,
            payload: data
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}

export const userDeleteAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: DELETE_USER,
            payload: data
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}

export const userBeneficiaryAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: BENEFICIARY_USER,
            payload: data
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}

export const addBeneficiaryAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: ADD_BENEFICIARY,
            payload: data
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}