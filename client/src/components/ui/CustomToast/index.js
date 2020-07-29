import React from 'react'
import Toast from 'react-bootstrap/Toast'
import Logo from './images/Logo.PNG'

const CustomToast = ({ visible, text, handleToast }) => {
    return (
        <Toast style={{ position: 'fixed', right: '10px', bottom: '10px', width: '300px' }} show={visible} onClose={() => handleToast(false)} delay={3000} autohide>
            <Toast.Header> <img src={Logo} className='icons mr-3'/><strong className="mr-auto">Code_Carry</strong></Toast.Header>
            <Toast.Body>{text}</Toast.Body>
        </Toast>
    )
}

export default CustomToast