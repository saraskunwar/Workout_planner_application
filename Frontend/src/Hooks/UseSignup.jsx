// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext'
// import { useAuthContext } from './UseAuthContext'


export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
      setIsLoading(true)
      setError('null')
      
      
        const response = await fetch('http://localhost:4000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        const json = await response.json()
        
        if (!response.ok) {
            setError(json.error)
            setIsLoading(false) 
        }
        
        if (response.ok) {
            //save the user to the local storage
            localStorage.setItem('user', JSON.stringify(json))
            

            //update the auth context
            dispatch({ type: 'LOGIN', payload: json })

           
            setIsLoading(false)
        }
  }
  
  return { error, isLoading,signup}
}