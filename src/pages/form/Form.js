import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userBeneficiaryAction, userDeleteAction, userEditAction, userFormsAction, userUpdateAction } from '../../redux/actions/userFormAction';
import { toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert';
import Customer from '../../helper/common/Customer';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const dispatch = useDispatch();
    const usersData = useSelector((ele) => ele.users_Form)

    const [reject, setReject] = useState(false)

    const navigate = useNavigate();


    const handleBeneficiary = (id) => {
        dispatch(userBeneficiaryAction(id))
        navigate("/manage-beneficiary")
    }

    useEffect(() => {
        if (usersData?.editId) {
            let tempData = usersData.users.find((el) => el.id == usersData?.editId)
            if (tempData) {
                setValue('fullName', tempData.fullName);
                setValue('address', tempData.address);
                setValue('country', tempData.country);
                setValue('pincode', tempData.pincode);
            }
        } else if (usersData?.deleteId) {
            setReject(true)
        }
    }, [usersData])

    const validation = (data) => {
        let err = false
        if (!data.fullName) {
            setError('fullName', { type: 'manual', message: 'Please enter fullname.' });
            err = true
        }
        if (!data.address) {
            setError('address', { type: 'manual', message: 'Please enter address.' });
            err = true
        }
        if (!data.country) {
            setError('country', { type: 'manual', message: 'Please select country.' });
            err = true
        }
        if (!data.pincode) {
            setError('pincode', { type: 'manual', message: 'Please enter pincode.' });
            err = true
        } else if (data.pincode.length < 6) {
            setError('pincode', { type: 'manual', message: 'Please enter atleast 6 digit.' });
            err = true
        }
        return err
    }

    const submit = (data) => {
        if (validation(data)) {
            return;
        }
        if (usersData?.editId) {
            let newArr = usersData.users.map((ele) => {
                if (usersData?.editId == ele.id) {
                    return {
                        ...ele,
                        fullName: data?.fullName,
                        address: data?.address,
                        country: data?.country,
                        pincode: data?.pincode,
                    }
                } return ele
            })
            dispatch(userUpdateAction(newArr))
            dispatch(userEditAction(""))
            toast.success('Customer Updated Successfully');
        } else {
            dispatch(userFormsAction({ ...data, id: usersData.users.length + 1 }))
            toast.success('Customer Added Successfully');
        }
        reset()
        handleAddDismiss()
    }

    const onDelete = () => {
        let tempData = usersData.users.filter((el) => el.id != usersData?.deleteId)
        dispatch(userUpdateAction(tempData))
        dispatch(userDeleteAction(""))
        toast.success('Customer Deleted Successfully');
        setReject(false)
    }

    const handleAddDismiss = () => {
        const btn = document.getElementById('submitButton')
        btn.setAttribute('data-dismiss', 'modal')
        btn.click()
    }

    const handleClose = () => {
        reset()
    }

    return (
        <div className="container mt-5">
            <div className='header_main'>
                <h2 className="title">Customers</h2>
                <button type="button" data-toggle="modal" data-target="#exampleModalCenter" className='containt_button'>Add Customer</button>
            </div>
            <div className="col-md-12 body_main">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Country</th>
                                <th scope="col">Pincode</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.users.length > 0 ? usersData.users.map((ele) =>
                                <tr>
                                    <td>{ele?.fullName}</td>
                                    <td>{ele?.address}</td>
                                    <td>{ele?.country}</td>
                                    <td>{ele?.pincode}</td>
                                    <td>
                                        <div className=" action_main">
                                            <button className="btn btn-sm btn-primary mb-1" type="button" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => dispatch(userEditAction(ele?.id))}>Edit</button>
                                            <button className="btn btn-sm btn-danger mb-1" onClick={() => dispatch(userDeleteAction(ele?.id))}>Delete</button>
                                            <button className="btn btn-sm btn-info mb-1" onClick={() => handleBeneficiary(ele?.id)}>Manage Beneficiary</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                                : <tr>
                                    <td colSpan="5" className="text-center">No Data Found</td>
                                </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            {reject &&
                <SweetAlert
                    danger
                    showCancel
                    confirmBtnText="Delete"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={() => onDelete()}
                    onCancel={() => { setReject(false); dispatch(userDeleteAction("")) }}
                    focusCancelBtn
                    style={{ width: "350px" }}
                >
                    You want to Delete it
                </SweetAlert>
            }
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">{usersData?.editId ? 'Edit' : 'Add'} Customer</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit(submit)}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input type="text" placeholder="Please enter fullname" className="form-control" {...register('fullName')} />
                                    {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" placeholder="Please enter address" className="form-control" {...register('address')} />
                                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select className="form-select" {...register("country")}>
                                        <option value="">Select...</option>
                                        <option value="india">India</option>
                                        <option value="usa">USA</option>
                                        <option value="australia">Australia</option>
                                        <option value="canada">Canada</option>
                                        <option value="germany">Germany</option>
                                    </select>
                                    {errors.country && <p className="text-danger">{errors.country.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pincode" className="form-label">Pincode</label>
                                    <input type="number" placeholder="Please enter pincode" className="form-control" {...register('pincode')} />
                                    {errors.pincode && <p className="text-danger">{errors.pincode.message}</p>}
                                </div>
                                <div className="text-end mb-3">
                                    <button id='submitButton' hidden />
                                    <button type='submit' className="btn btn-primary" >{usersData?.editId ? "Update" : "Submit"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form