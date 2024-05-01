import React, { useEffect, useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdateAction } from '../redux/actions/userFormAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Managebeneficiary = () => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPopup, setShowPopup] = useState(false);
    const [editId, setEditId] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [viewId, setViewId] = useState("");
    const [viewData, setViewData] = useState("");
    const [reject, setReject] = useState(false);

    const usersData = useSelector((ele) => ele.users_Form)

    useEffect(() => {
        if (!usersData.userBeneficiaryId) {
            navigate('/')
        }
    }, [usersData])

    useEffect(() => {
        if (editId) {
            let temp = usersData.users[usersData?.userBeneficiaryId - 1].beneficiaryList.find((ele, i) => i == editId)
            setShowPopup(true);
            setValue('name', temp.name);
            setValue('accountNo', temp.accountNo);
            setValue('bankName', temp.bankName);
            setValue('typeOfAccount', temp.typeOfAccount);
        }
    }, [editId])

    useEffect(() => {
        if (deleteId) {
            setReject(true)
        }
    }, [deleteId])

    useEffect(() => {
        if (viewId) {
            let tempView = usersData.users[usersData?.userBeneficiaryId - 1].beneficiaryList.find((ele, i) => i == viewId)
            setViewData(tempView)
        }
    }, [viewId])

    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const validation = (data) => {
        let regex = /^[0-9,.]+$/
        let onlyAlphanumeric = /^[A-Za-z0-9\s'-]+$/
        let err = false
        if (!data.name) {
            setError('name', { type: 'manual', message: 'Please enter name.' });
            err = true
        } else if (data.name && !onlyAlphanumeric.test(data.name)) {
            setError('name', { type: 'manual', message: 'Please enter a valid name without special characters' });
            err = true
        }
        if (!data.accountNo || data.accountNo < 1) {
            setError('accountNo', { type: 'manual', message: 'Please enter valid account number.' });
            err = true
        } else if (!regex.test(data.accountNo)) {
            setError('accountNo', { type: 'manual', message: 'Please enter a valid account number without special characters.' });
            err = true
        }
        if (!data.bankName) {
            setError('bankName', { type: 'manual', message: 'Please enter bank name.' });
            err = true
        }
        if (!data.typeOfAccount) {
            setError('typeOfAccount', { type: 'manual', message: 'Please select type of account.' });
            err = true
        }
        return err
    }

    const submit = (data) => {
        if (validation(data)) {
            return;
        }
        let newArr = usersData.users.map((ele) => {
            if (ele.id == usersData.userBeneficiaryId) {
                return {
                    ...ele,
                    beneficiaryList: ele?.beneficiaryList?.length > 0 ? (
                        editId ?
                            [...ele.beneficiaryList.map((newele, i) => {
                                if (i == editId) {
                                    return data
                                }
                                return newele
                            })]
                            : [...ele.beneficiaryList, data]
                    ) : [data]
                }
            } return ele
        })
        setEditId("")
        dispatch(userUpdateAction(newArr))
        reset()
        setShowPopup(false);
        handleAddDismiss()
    }

    const handleClose = () => {
        setEditId("")
        setViewId("")
        setViewData("")
        reset()
        setShowPopup(false)
    }

    const handleAddDismiss = () => {
        const btn = document.getElementById('submitButton')
        btn.setAttribute('data-dismiss', 'modal')
        btn.click()
    }

    const onDelete = () => {
        let tempData = usersData.users.map((el1) => {
            if (el1.id == usersData?.userBeneficiaryId) {
                let temp1 = el1.beneficiaryList.filter((_, i) => i != deleteId)
                return {
                    ...el1,
                    beneficiaryList: temp1
                }
            } return el1
        })
        dispatch(userUpdateAction(tempData))
        toast.success('Beneficiary Deleted Successfully');
        setReject(false)
        setDeleteId("")
    }

    return (
        <>
            <div className="container mt-5">
                <div className='header_main'>
                    <h2 className="title">Manage Beneficiary</h2>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button className="outline_button" onClick={() => navigate("/")}>Back to List</button>
                        <button type="button" data-toggle="modal" data-target="#exampleModalCenter" className='containt_button' onClick={() => handlePopupOpen()}>Add New Beneficiary</button>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12 body_main">
                        <h2 className="card_title">{usersData.users[usersData.userBeneficiaryId - 1]?.fullName} - Beneficiary List</h2>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Account No</th>
                                        <th scope="col">Bank Name</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData.users[usersData.userBeneficiaryId - 1]?.beneficiaryList?.length > 0 ? usersData.users[usersData.userBeneficiaryId - 1]?.beneficiaryList?.map((ele, i) =>
                                        <tr>
                                            <td>{ele?.name}</td>
                                            <td>{ele?.accountNo}</td>
                                            <td>{ele?.bankName}</td>
                                            <td>{ele?.typeOfAccount}</td>
                                            <td>
                                                <div className="action_main">
                                                    <button className="btn btn-sm btn-primary mb-1" type="button" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => setEditId(i.toString())}>Edit</button>
                                                    <button className="btn btn-sm btn-danger mb-1" onClick={() => setDeleteId(i.toString())}>Delete</button>
                                                    <button className="btn btn-sm btn-info mb-1" type="button" data-toggle="modal" data-target="#exampleModalCenter1" onClick={() => setViewId(i.toString())}>View</button>
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
                </div>
                {reject &&
                    <SweetAlert
                        danger
                        showCancel
                        confirmBtnText="Delete"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        onConfirm={() => onDelete()}
                        onCancel={() => { setReject(false); setDeleteId("") }}
                        focusCancelBtn
                        style={{ width: "350px" }}
                    >
                        You want to Delete it
                    </SweetAlert>
                }

                {/* Add and Edit Beneficiary Modal */}
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">{editId ? "Edit" : "Add New"} Beneficiary</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={handleSubmit(submit)} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" placeholder="Please enter name" className="form-control" {...register('name')} />
                                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="accountNo" className="form-label">Account Number</label>
                                        <input type="number" placeholder="Please enter account no" className="form-control" {...register('accountNo')} />
                                        {errors.accountNo && <p className="text-danger">{errors.accountNo.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="bankName" className="form-label">Bank Name</label>
                                        <input type="text" placeholder="Please enter bank name" className="form-control" {...register('bankName')} />
                                        {errors.bankName && <p className="text-danger">{errors.bankName.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="typeOfAccount" className="form-label">Type Of Account</label>
                                        <select className="form-select" {...register("typeOfAccount")}>
                                            <option value="">Select...</option>
                                            <option value="Saving">Saving</option>
                                            <option value="Current">Current</option>
                                        </select>
                                        {errors.typeOfAccount && <p className="text-danger">{errors.typeOfAccount.message}</p>}
                                    </div>
                                    <div className="text-end mb-3">
                                        <button id='submitButton' hidden />
                                        <button type="submit" className="btn btn-primary btn-sm ms-2">{editId ? "Update" : "Submit"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Beneficiary Modal */}
                <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">View Beneficiary</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="name" class="form-label">Name :</label>
                                        <p><strong>{viewData?.name}</strong></p>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="accountNo" class="form-label">Account Number :</label>
                                        <p><strong>{viewData?.accountNo}</strong></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="bankName" class="form-label">Bank Name :</label>
                                        <p><strong>{viewData?.bankName}</strong></p>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="typeOfAccount" class="form-label">Type Of Account :</label>
                                        <p><strong>{viewData?.typeOfAccount}</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Managebeneficiary