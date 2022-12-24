import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../Components/CommentsList';
import AddCommentForm from '../Components/AddCommentForm';

const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});
    const {articleId} = useParams();

    useEffect(() => {
        // console.log(articleInfo.upvotes);
        const loadArticleInfo = async () => {
            const res = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = res.data;
            setArticleInfo(newArticleInfo);
        }
        // setTimeout(() => loadArticleInfo(), 5000);
        loadArticleInfo();
    }, [])
    
    const article = articles.find(article => article.name === articleId)

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if(!article)
        return <NotFoundPage />;

    return(
        <>
            <h1> {article.title} </h1>
            <div className = "upvotes-section">
                <button onClick={addUpvote}>Upvote </button>
                <p> This article has {articleInfo.upvotes} upvote(s)!</p>
            </div>
            {article.content.map((paragraph, i) => 
                                    <p key={i}>
                                        {paragraph}
                                    </p>
                                )
            }
            <AddCommentForm 
                articleName = {articleId} 
                onArticleUpdate = {updateArticle => setArticleInfo(updateArticle)}
            />
            <CommentsList comments={articleInfo.comments}/>
        </>
    );
}

export default ArticlePage;