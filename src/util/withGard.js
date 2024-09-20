import { useSelector } from "react-redux"

// this is pure javascript
const withGard = (Component) => {
    
    // this is component
    const Wrapper =  (props) =>{
        const {isLoggedIn} = useSelector(state => state.auth)

        return (isLoggedIn ? <Component {...props}/> : <div>please log in first</div>)
    }
    return Wrapper;
}

export default withGard
