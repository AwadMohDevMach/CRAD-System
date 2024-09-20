import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {recoreds : [] , loading : false , error : null , recored : null}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_ , thunkApi)=>{
    const {rejectWithValue} = thunkApi;
    try{
        const res = await fetch("http://localhost:5000/potst")
        const data =await res.json();
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id , thunkApi)=>{
    const {rejectWithValue} = thunkApi;
    try{
        const res = await fetch(`http://localhost:5000/potst/${id}`)
        const data =await res.json();
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const deletePosts = createAsyncThunk("posts/deletePost" , async(id, thunkApi)=>{
    const {rejectWithValue} = thunkApi;
    try{
        await fetch(`http://localhost:5000/potst/${id}`,{
            method : "DELETE",
        });
        return id;
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const insertPosts = createAsyncThunk("posts/insertPosts", async(post, thunkApi)=>{
    const {rejectWithValue } = thunkApi;
    try{
       const res =  await fetch(`http://localhost:5000/potst`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json; charset=UTF-8"
            },
            body : JSON.stringify(post)
        })
        const data =await  res.json();
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
})
export const editPost = createAsyncThunk("posts/editPost", async(post, thunkApi)=>{
    const {rejectWithValue } = thunkApi;
    try{
       const res =  await fetch(`http://localhost:5000/potst/${post.id}`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json; charset=UTF-8"
            },
            body : JSON.stringify(post)
        })
        const data =await  res.json();
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
})


const psotSlice = createSlice({
    name : "posts", 
    initialState,
    reducers:{
        cleanRecord : (state) => {
            state.recored = null
        }
    },
    extraReducers:{
        // get post
        [fetchPost.pending] : (state)=>{
            state.loading = true;
            state.error = null;
        },
        [fetchPost.fulfilled] : (state, action)=>{
            state.loading = false;
            state.recored = action.payload;
        },
        [fetchPost.rejected] : (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        // fetch data
        [fetchPosts.pending] : (state ) => {
            state.loading = true;
            state.error = null;
        },
        [fetchPosts.fulfilled] : (state ,action) => {
            state.loading = false;
            state.recoreds = action.payload;
        },
        [fetchPosts.rejected] : (state ,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete posts 
        [deletePosts.pending] : (state) => {
            state.loading = true;
            state.error = null;
        },
        [deletePosts.fulfilled] : (state ,action) => {
            state.loading = false;
            state.recoreds = state.recoreds.filter(post => post.id!== action.payload) 
        },
        [deletePosts.rejected] : (state ,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create posts 
        [insertPosts.pending] : (state ) => {
            state.loading = true;
            state.error = null;
        },
        [insertPosts.fulfilled] : (state ,action) => {
            state.loading = false;
            state.recoreds = [...state.recoreds, action.payload] 
        },
        [insertPosts.rejected] : (state ,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // edit post
        [editPost.pending] : (state ) => {
            state.loading = true;
            state.error = null;
        },
        [editPost.fulfilled] : (state ,action) => {
            state.loading = false;
            state.reducer = action.payload;
        },
        [editPost.rejected] : (state ,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
    }
})

export const { cleanRecord } = psotSlice.actions;
export default psotSlice.reducer