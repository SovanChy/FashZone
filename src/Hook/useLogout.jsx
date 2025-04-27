import { useEffect, useState } from 'react'
import { projectAuth, projectFirebase } from '../firebase/config.js'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // update online status
      const { uid } = user
      await projectFirebase.collection('users').doc(uid).update({ online: false })

      // sign the user out
      await projectAuth.signOut()

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
      setIsPending(false)
      setError(null)
      // if (!isCancelled) {
    
      // }
    }
    catch(err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
      // if (!isCancelled) {
       
      // }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}