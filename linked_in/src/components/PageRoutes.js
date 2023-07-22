import React, { useEffect } from 'react'
import HomePage from './HomePage'
import RegistrationPage from './RegistrationPage'
import LoginPage from './LoginPage'
import ProfilePage from './ProfilePage'
import { Route, Routes } from 'react-router-dom'
import LogOut from './LogOut'
import NotificationPage from './NotificationPage'
import CustomPostViewerPage from './CustomPostViewerPage'

const PageRoutes = ({onRouteUsed}) => {

    useEffect(()=> {
        onRouteUsed();
    }, [onRouteUsed]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path='/profile/:uID' element={<ProfilePage />} />
            <Route path='/viewpost/:postID' element={<CustomPostViewerPage />} />
            <Route path="/logout" element={<LogOut />} />
        </Routes>
    )
}

export default PageRoutes