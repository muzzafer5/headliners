import React from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/home/navbar'
import Footer from './components/home/footer'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => (
                <div>
                    <Navbar {...props} /> {/* HEADER ALWAYS VISIBLE */}
                    <Component {...props} />
                    <Footer {...props} /> {/* FOOTER ALWAYS VISIBLE */}
                </div>
            )}
        />
    )
}
