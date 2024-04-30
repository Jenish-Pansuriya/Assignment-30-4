import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userBeneficiaryAction, userDeleteAction, userEditAction } from '../../redux/actions/userFormAction';
import { useNavigate } from 'react-router-dom';

const Customer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usersData = useSelector((ele) => ele.users_Form)

    const handleBeneficiary = (id) => {
        dispatch(userBeneficiaryAction(id))
        navigate("/manage-beneficiary")
    }

    return (
        <div className="row justify-content-center body_main">
            
        </div>
    )
}

export default Customer