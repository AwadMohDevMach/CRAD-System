import React, { useCallback, useEffect } from 'react'
import PostList from '../components/PostList'
import { useDispatch , useSelector } from 'react-redux'
import { fetchPosts , deletePosts  } from '../state/PostSLice'

const Index = () => {

  const dispatch = useDispatch()

const {recoreds , loading , error } = useSelector(state => state.posts)
  
  useEffect(()=>{
    dispatch(fetchPosts())
  },[dispatch])

  const deleteRecod = useCallback((id)=> {
    dispatch(deletePosts(id))
  },[dispatch])

  return (
          <PostList data={recoreds} loading={loading} error={error} deleteRecod={deleteRecod} />
    )
}

export default Index
