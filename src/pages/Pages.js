import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './form/Form'
import Managebeneficiary from './Managebeneficiary'

const Pages = () => {
    return (
        <Routes>
            <Route path='/' element={<Form />} />
            <Route path='/manage-beneficiary' element={<Managebeneficiary />} />
        </Routes>
    )
}

export default Pages