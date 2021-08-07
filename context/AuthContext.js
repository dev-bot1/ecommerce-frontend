import { createContext,useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
import { MAGIC_PUBLIC_KEY } from '../utils/urls'

const AuthContext =createContext()
//Magic Uses Window Property
let magic

export const AuthProvider =(props) =>{

    const[user,setUser] = useState(null)
    const router=useRouter()

    /**
     * Add Email Address of User
     * @param {string} email 
     */


    const loginUser =async(email) =>{
        try{
            await magic.auth.loginWithMagicLink({email})
            setUser({email})
            router.push('/')
        } catch(err){
            setUser(null)
        }
    }

    /**
     * Sets The User Null
     */

    const logoutUser =async () =>{
        try{
            await magic.user.logoutUser() 
            setUser(null)
            router.push('/')      
        } catch(err){

        }
    }

    const checkUserLoggedIn = async () =>{
        try{
            const isLoggedIn = await magic.user.isLoggedIn()

            if(isLoggedIn){
                const {email}=await magic.user.getMetadata()
                setUser({ email })

                //Just for Testing
                //This shows a 15 min Bearer Token after which it expires.
                const token =await getToken()
                console.log("checkUserLoggedIn token",token)
            }
        } catch(err){

        }
    }

    /**
     * 
     * Retrieves the Magic Issues Bearer Token
     * This Allows User to Make authentication request.
     */

    const getToken=async()=>{
        try{
            const token = await magic.user.getIdToken()
            return token
        } catch(err){

        }
    }


    useEffect(()=>{
        magic=new Magic(MAGIC_PUBLIC_KEY)

        checkUserLoggedIn()
    },[] )



    return (
        <AuthContext.Provider value={{user,loginUser,logoutUser, getToken }} >
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext