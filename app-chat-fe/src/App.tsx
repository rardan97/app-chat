
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'
import AppLayout from './layouts/AppLayouts'
import ChatPage from './page/ChatPage'
import ProfilPage from './page/ProfilPage'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import SettingPage from './page/SettingPage'
import NonMemberPage from './page/NonMemberPage'
import MemberPage from './page/MemberPage'
import TestWs from './page/TestWs'

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path='/' element={
                        <PrivateRoute>
                            <AppLayout />
                        </PrivateRoute>
                    }>
                    <Route index element={<ChatPage />} />
                    <Route path="/profile" element={<ProfilPage />} />
                    <Route path="/setting" element={<SettingPage />} />
                    <Route path="/member" element={<MemberPage />} />
                    <Route path="/nonmember" element={<NonMemberPage />} />
                    </Route>
                    <Route path='/testws' element={<TestWs />}></Route> 
                </Routes>
            </AuthProvider>
        </>
    )
}

export default App
