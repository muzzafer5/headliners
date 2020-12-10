import React from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/home/navbar'
import AdminNavbar from './components/admin/admin_navbar'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => (
                <div>
                    <Navbar {...props} /> {/* HEADER ALWAYS VISIBLE */}
                    <Component {...props} />
                </div>
            )}
        />
    )
}

export const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => (
                <div>
                    <AdminNavbar {...props} /> 
                    <Component {...props} />
                </div>
            )}
        />
    )
}
