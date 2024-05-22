import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../components/ui/button"
import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';
import blogService from '../services/blog';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingBlog, setDeletingBlog] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const fetchedBlogs = await blogService.getAllBlogs();
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleBlogSubmit = (blog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.some((b) => b._id === blog._id)
        ? prevBlogs.map((b) => (b._id === blog._id ? blog : b))
        : [...prevBlogs, blog]
    );
    setEditingBlog(null);
    setShowCreateForm(false);
    setOpen(false);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
  };

  // const handleDeleteBlog = async (blogId) => {
  //   try {
  //     const blog = blogs.find(blog => blog._id === blogId);
  //     if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)){
  //       await blogService.deleteBlog(blogId);
  //       setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
  //     }
      
  //   } catch (error) {
  //     console.error('Error deleting blog:', error);
  //   }
  // };

  const handleDeleteBlog = (blogId) => {
    setDeletingBlog(blogs.find(blog => blog._id === blogId));
  };

  const confirmDeleteBlog = async () => {
    try {
      await blogService.deleteBlog(deletingBlog._id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== deletingBlog._id));
      setDeletingBlog(null);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setEditingBlog(null);
  };

  const handleCancelForm = () => {
    setShowCreateForm(false);
    setEditingBlog(null);
    setDeletingBlog(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold m-2">Blogs</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button onClick={toggleCreateForm}>Create Blog</Button>
          </DialogTrigger>
          <DialogContent>
              <BlogForm onBlogSubmit={handleBlogSubmit} onCancel={handleCancelForm}/>
          </DialogContent>
        </Dialog>
      </div>

      {editingBlog && (
        <Dialog open={true} onOpenChange={handleCancelForm}>
          <DialogContent>
            <BlogForm
              onBlogSubmit={handleBlogSubmit}
              initialBlog={editingBlog}
              onCancel={handleCancelForm}
            />
          </DialogContent>
        </Dialog>
      )}

      {deletingBlog && (
        <Dialog open={true} onOpenChange={handleCancelForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete this blog?</DialogTitle>
              <DialogDescription>
                This will permanently delete your blog and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleCancelForm} variant='secondary'>Cancel</Button>
              <Button onClick={confirmDeleteBlog} variant='destructive'>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <BlogList 
        blogs={blogs} 
        onEditBlog={handleEditBlog}
        onDeleteBlog={handleDeleteBlog}
      />
    </div>
  );
};

export default BlogPage;