import usePostDetails from '../hooks/use-post-details';
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import {cleanRecord} from "../state/PostSLice"
import withGard from '../util/withGard';

const Detail = () => {
  const {recored  ,loading , error} = usePostDetails()

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(cleanRecord())
  },[dispatch])

  return (
    <div>
      {
        loading ? "loading..": error? error :(
          <>
          <p>Title : {recored?.title}</p>
          <p>Title : {recored?.description}</p>
          </>
        )
      }
    </div>
  )
}

export default withGard(Detail)
