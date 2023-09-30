import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import axios from "axios";

const PostForm = ({create}) => {
    const [post,setPost] = useState({title: '', body: ''})
    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: new Date().getHours()
        }
        create(newPost)
        setPost({title: '', body: ''})
    }
    return (
        <form>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Имя пользователя">

            </MyInput>
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Описание проделанных работ">

            </MyInput>
            <MyButton onClick={addNewPost}>Создать таску</MyButton>
        </form>
    );
};

export default PostForm;