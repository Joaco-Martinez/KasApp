import React from "react"
import FormRegister from "./FormRegister";
import NavbarRegister from "@/components/navbarRegister/navbar";

const Register: React.FC = () => {

    return (
        <>
        <div className="h-screen w-screen bg-no-repeat bg-cover  bg-[url('/RegisterImg.png')]" >
            <NavbarRegister/>
            <div className="flex justify-center items-center h-full">
            <FormRegister/>
            </div>
        </div>
        </>
)};

export default Register

