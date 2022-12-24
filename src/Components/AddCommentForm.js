import {useState} from "react";
import axios from 'axios';

const AddCommentForm = ({articleName, onArticleUpdate}) => {

    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const AddComment = async () => {

        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        });
        
        const updatedArticle = response.data;
        onArticleUpdate(updatedArticle);
        setName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input 
                    type="text" 
                    value = {name}
                    onChange = {evt => setName(evt.target.value)}
                />
            </label>
            <label>
                Comment:
                <textarea 
                    rows="4" 
                    cols="50"
                    value = {commentText}
                    onChange = {evt => setCommentText(evt.target.value)}
                />
            </label>
            <button onClick={AddComment}>Add Comment</button>
        </div>
    );
}

export default AddCommentForm;