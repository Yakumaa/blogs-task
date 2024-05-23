import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import blogService from '../services/blog';
import authorService from '../services/author';

const BlogDetails = ({blogId}) => {
  console.log(blogId);
  const [blog, setBlog] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [comments, setComments] = useState([]);
  // const [isLiked, setIsLiked] = useState(false);
  // const [isDisliked, setIsDisliked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try{
        setIsLoading(true);
        const blogDetails = await blogService.getBlogDetails(blogId);
        console.log(blogDetails);
        setBlog(blogDetails.blog);
        setComments(blogDetails.comments);
        const authorId = blogDetails.blog.author;
        const author = await authorService.getAuthorById(authorId);
        setAuthorName(author.fullName);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setIsLoading(false);
      } 
    }

    fetchBlogDetails();
  }, [blogId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const handleLike = async () => {
    try{
      await blogService.likeBlog(blogId);
      setBlog((prevBlog) => ({
        ...prevBlog,
        likes_count: prevBlog.likes_count + 1
      }));
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleDislike = async () => {
    try{
      await blogService.dislikeBlog(blogId);
      setBlog((prevBlog) => ({
        ...prevBlog,
        likes_count: prevBlog.likes_count - 1,
      }));
    } catch (error) {
      console.error('Error disliking blog:', error);
    }
  };

  return(
    <div>
      {console.log(blog)}
      <h1>Title: {blog.title}</h1>
      <p>Author: {authorName}</p>
      <p>Content: {blog.content}</p>
      <div>
        <Button onClick={handleLike}>
          Like ({blog.likes_count})
        </Button>
        <Button onClick={handleDislike}>
          Dislike
        </Button>
      </div>
      <p>Views: {blog.view_count}</p>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>By: {comment.author.fullName}</p>
        </div>
      ))}
    </div>
  )
};

export default BlogDetails;