import {useState, useEffect} from 'react'
import { projectFirebase } from '../firebase/config'

//for collecting individual document
export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null) 


    //real-time data collection
    useEffect(() => {
        const ref = projectFirebase.collection(collection).doc(id)

        
        const unsubscribe = ref.onSnapshot((snapshot) => {
            setDocument({...snapshot.data(), id: snapshot.id})
            setError(null)

        }, (err) => {
            console.log(err.message)
            setError('fail to get document')
        })
    
        return () => unsubscribe() 


    },[collection, id]) 

    return  {document, error}
}