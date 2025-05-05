import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LayoutPage from "../Page/LayoutPage";
import ErrorHandler from "../Components/Error/ErrorHandler";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";
import LoginPAge from "../Page/LoginPage";
import HomePage from "../Page/HomePage";
import RegisterPage from "../Page/RegisterPage";
import NotFoundPage from "../Page/NotFoundPage";



const router =createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<LayoutPage/>} errorElement={<ErrorHandler/>} >
        <Route index element={
            <ProtectedRoute isAllowed={false} redirectPath="login" >
                <HomePage/>
            </ProtectedRoute>
        }/>
        <Route path='login' element={
            <ProtectedRoute isAllowed={true} redirectPath="/" >
                <LoginPAge/>
            </ProtectedRoute>
        }/>
        <Route path='register' element={
            <ProtectedRoute isAllowed={true} redirectPath="login" >
                <RegisterPage/>
            </ProtectedRoute>
        }/>

    </Route>
    <Route path={'*'} element={<NotFoundPage/>}/>
    </>
    
))
export default router;