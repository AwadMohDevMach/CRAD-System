import {cloneElement} from 'react'
import { useNavigate  } from 'react-router-dom'
import { useSelector } from 'react-redux'

const WithGard = ({children}) => {
    const {isLoggedIn} = useSelector(stat=>stat.auth);
    const x = cloneElement(children , {title : "this title"}) 
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate('/')
    //     }
    // }, [navigate,isLoggedIn])
  return (isLoggedIn ? x : <p>please log in first</p>)
}

export default WithGard
