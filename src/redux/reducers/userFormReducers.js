import { ADD_BENEFICIARY, ADD_USER, BENEFICIARY_USER, DELETE_USER, EDIT_USER, UPDATE_USER } from "../type";

const userFormData = {
    loading: false,
    users: [],
    editId: "",
    deleteId: "",
    userBeneficiaryId: "",
    beneficiaryList: [],
    error: '',
}

export const userFormReducer = (state = userFormData, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case EDIT_USER:
            return {
                ...state,
                editId: action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                users: action.payload,
            };
        case DELETE_USER:
            return {
                ...state,
                deleteId: action.payload,
            };
        case BENEFICIARY_USER:
            return {
                ...state,
                userBeneficiaryId: action.payload,
            };
        case ADD_BENEFICIARY:
            return {
                ...state,
                beneficiaryList: action.payload,
            };
        default:
            return state;
    }
}