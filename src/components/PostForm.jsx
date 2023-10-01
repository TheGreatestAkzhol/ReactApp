import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MySelectUser from "./UI/select/MySelectUser";

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
            <MySelectUser
                value={post.title}
                defaultValue="Имя пользователя"
                onChange={e => setPost({...post, title: e})}
                options={[
                    {value: 'Akzhol', name: 'Акжол'},
                    {value: 'Tural', name: 'Турал'},
                    {value: 'Denys', name: 'Денис'},
                    {value: 'Evgeny', name: 'Евгений'}
                ]}
            />
            <br/>
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Описание проделанных работ">

            </MyInput>
            <br/>
            <MyButton onClick={addNewPost}>Создать таску</MyButton>
        </form>
    );
};

export default PostForm;