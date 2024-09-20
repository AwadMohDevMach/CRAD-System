import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../state/PostSLice';
import { useParams } from 'react-router-dom';


const usePostDetails = () => {

  const {id} = useParams();

  const { recored  ,loading , error} = useSelector(state => state.posts)

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchPost(id.toString()))
  },[dispatch])

    return {recored  ,loading , error}
}
export default usePostDetails;