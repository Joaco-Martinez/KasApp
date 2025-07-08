"use client"
import  { jwtDecode } from "jwt-decode"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IUser } from "../interface/User";
import apiService from "@/services/apiService";


interface AuthContextType {
    user: IUser | null;
    isAuth: boolean;
    loading: boolean;
    SaveUserData: (data: { user: IUser }) => void;
    ResetUserData: () => void;
}

export const decodeUserCookie = (cookieValue: string) => {
    try {
    const decoded = jwtDecode(cookieValue);

    return decoded as IUser;
    } catch (e) {
    console.error("No se pudo decodificar la cookie:", e);
    return null;
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchUser = async () =>{
            try {
                const res = await apiService.get('/auth/me',true);
                setUser(res as IUser);
                setIsAuth(!!res);
                
            } catch {
                console.log("Error al obtener el usuario");
                setUser(null); 
            } finally{
                setLoading(false);
            }
        }
    fetchUser();
    }, []);

    const SaveUserData = (data: { user: IUser }) => {
        setIsAuth(true);
        setUser(data.user );
    };

    const ResetUserData = () => {
        setUser(null);
        setIsAuth(false);
    };

    // const id_Agency = user?.agencyId

    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            SaveUserData,
            ResetUserData,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
    }
    return context;
};