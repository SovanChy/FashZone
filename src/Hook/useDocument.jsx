import {useState, useEffect} from 'react'
import { projectFirebase } from '../firebase/config.js'

//for collecting individual document
export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null) 


    //real-time data collection
    useEffect(() => {
        const ref = projectFirebase.collection(collection).doc(id)

        
        const unsubscribe = ref.onSnapshot((snapshot) => {
            if(snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id})
            setError(null)
            }
            else{
                setError("no such document exists")
            }
            

        }, (err) => {
            console.log(err.message)
            setError('fail to get document')
        })
    
        return () => unsubscribe() 


    },[collection, id]) 

    return  {document, error}
}