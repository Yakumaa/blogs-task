import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import blogService from '../services/blog';

const BlogForm = ({ onBlogSubmit, initialBlog = null, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    if (initialBlog) {
      setTitle(initialBlog.title);
      setContent(initialBlog.content);
      setAuthorId(initialBlog.author);
    }
  }, [initialBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, content, authorId };
    if (initialBlog) {
      // Update existing blog
      const updatedBlog = await blogService.updateBlog(initialBlog._id, blog);
      onBlogSubmit(updatedBlog);
    } else {
      // Create new blog
      const newBlog = await blogService.createBlog(blog);
      onBlogSubmit(newBlog);
    }
    setTitle('');
    setContent('');
    setAuthorId('');
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setAuthorId('');
    onCancel();
  };

  return (
    <div className="border-gray-300 rounded">
      <h2 className="text-xl font-semibold mt-2 mb-4">{ initialBlog ? 'Edit Blog' : 'Add a new blog'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-semibold">Title</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="block text-sm font-semibold">Content</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <label className="block text-sm font-semibold">Author ID</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        />

        <div className="flex justify-end space-x-4">
          <Button onClick={handleCancel} variant='secondary'>Cancel</Button>
          <Button>{initialBlog ? 'Update Blog' : 'Create Blog'}</Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;