import React from 'react'
import HomePage from './HomePage'
import RegistrationPage from './RegistrationPage'
import LoginPage from './LoginPage'
import ProfilePage from './ProfilePage'
import { Route, Routes } from 'react-router-dom'

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/profile/:uID' element={<ProfilePage />} />
        </Routes>
    )
}

export default PageRoutes