import React from 'react'
import Pages from '../pages/Pages'
import { ToastContainer } from 'react-toastify'

const Routes = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Pages />
        </>
    )
}

export default Routes