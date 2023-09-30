import React, {useEffect, useMemo, useRef, useState} from 'react';
import './styles/App.css';
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import GetNumberService from "./API/GetNumberService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {getPagesArray, getPagesCount} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";
import AutoLoad from "./API/AutoLoad";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts,isPostsLoading,postError] = useFetching(async (limit,page)=>{
        const response = await PostService.getAll(limit,page);
        setPosts(response.data)
        const totalCount = (await GetNumberService.getNumber()).data;
        setTotalPages(getPagesCount(totalCount,limit))
    })
    useEffect(() => {
        fetchPosts(limit,page)
    }, [page])
    useEffect(()=>{
        AutoLoad.addDefaultUsers()
    },[])
    const createPost = async (newPost) => {
        await axios.post('http://localhost:8090/ServletPost', newPost)
        setPosts([...posts, newPost])
        setModal(false);
    }
    const removePost = async (post) => {
        setPosts([...posts.filter(p => p.id !== post.id)])
        await axios.delete("http://localhost:8090/ServletRemoveTask?id=" + post.id)
    }
    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }
    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0 '}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
            <h1>Произошла ошибка &{postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display:'flex',justifyContent:'center',marginTop: 50}}>
                    <Loader/>

                </div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'}/>
            }
           <Pagination totalPages = {totalPages} changePage={changePage} page={page}/>
        </div>
    );
}

export default App;
