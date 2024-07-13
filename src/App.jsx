import React, { Suspense } from 'react'
import Router from './components/Router'
import NavBar from './components/Navbar/Navbar'
import Loader from './components/Loader'
import { Home } from './pages'

const App = () => {
    return (
        <main>
            <Home />
            {/* <Router>
                <Suspense fallback={<Loader />}>
                    <NavBar />
                </Suspense>
            </Router> */}
        </main>
    )
}

export default App
