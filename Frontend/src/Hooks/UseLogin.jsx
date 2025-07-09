// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react'
// import { useAuthContext } from './useAuthContext'
// // import { useAuthContext } from './UseAuthContext'


// export const useLogin = () => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)
//   const { dispatch } = useAuthContext()

//   const login = async (email, password) => {
//       setIsLoading(true)
//       setError('null')
      
      
//         const response = await fetch('http://localhost:4000/api/users/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }),
//         })
//         const json = await response.json()
        
//         if (!response.ok) {
//             setError(json.error)
//             setIsLoading(false) 
//         }
        
//         if (response.ok) {
//             //save the user to the local storage
//             localStorage.setItem('user', JSON.stringify(json))
            

//             //update the auth context
//             dispatch({ type: 'LOGIN', payload: json })

           
//             setIsLoading(false)
//         }
//   }
  
//   return { error, isLoading,login}
// }
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.error || 'Login failed')
      }

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // Update auth context
      dispatch({ type: 'LOGIN', payload: json })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { error, isLoading, login }
}
