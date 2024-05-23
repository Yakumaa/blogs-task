import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Button } from "./components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// import './App.css'
import Blog from './components/BlogList'
import blogService from './services/blog'
import authorService from './services/author'
import BlogPage from './pages/BlogPage';
import AuthorPage from './pages/AuthorPage';
import BlogForm from './components/BlogForm';

function App() {
  const [blogs, setBlogs] = useState([])
  const [authors, setAuthors] = useState([])
  // const [newBlogTitle, setNewBlogTitle] = useState('')
  // const [newBlogContent, setNewBlogContent] = useState('')
  // const [editingBlog, setEditingBlog] = useState(null)
  // const [updatedTitle, setUpdatedTitle] = useState('')
  // const [updatedContent, setUpdatedContent] = useState('')
  // const [updatedAuthorId, setUpdatedAuthorId] = useState('');

  const fetch = async () => {
    const initialBlogs = await blogService.getAllBlogs();
    const initialAuthors = await authorService.getAllAuthors();
    setBlogs(initialBlogs);
    setAuthors(initialAuthors);
  };

  useEffect(() => {
    fetch();
  }, []);

  // const addBlog = (event) => {
  //   event.preventDefault()
  //   console.log('button clicked', event.target)

  //   const blogObject = {
  //     title: newBlogTitle,
  //     content: newBlogContent,
  //     authorId: "664b010583a66916be9ad640",
  //   }

  //   console.log('blogObject', blogObject)

  //   blogService
  //     .createBlog(blogObject)
  //     .then(returnedBlog => {
  //       setBlogs(blogs.concat(returnedBlog))
  //       setNewBlogTitle('')
  //       setNewBlogContent('')
  //     })
  // }

  // const handleBlogSubmit = (blog) => {
  //   setBlogs((prevBlogs) =>
  //     prevBlogs.some((b) => b._id === blog._id)
  //       ? prevBlogs.map((b) => (b._id === blog._id ? blog : b))
  //       : [...prevBlogs, blog]
  //   );
  //   setEditingBlog(null);
  // };

  // const editBlog = (blog) => {
  //   setEditingBlog(blog)
  //   setUpdatedTitle(blog.title)
  //   setUpdatedContent(blog.content)
  //   setUpdatedAuthorId(blog.authorId)
  // }

  // const updateBlog = async (event) => {
  //   event.preventDefault()

  //   const updatedBlog = { 
  //     ...editingBlog, 
  //     title: updatedTitle,
  //     content: updatedContent, 
  //     authorId: editingBlog.author
  //   }

  //   console.log('updatedBlog', updatedBlog)
  //   console.log('Updating blog with id:', editingBlog._id)
  //   console.log('Updated title:', updatedTitle)
  //   console.log('Updated content:', updatedContent)

  //   const returnedBlog = await blogService.updateBlog(editingBlog._id, updatedBlog)
  //   console.log('returnedBlog', returnedBlog)

  //   setBlogs(blogs.map(blog => blog._id !== editingBlog._id ? blog : returnedBlog))
  //   setEditingBlog(null)
  //   setUpdatedTitle('')
  //   setUpdatedContent('')
  //   fetchBlogs()
  // }

  // const deleteBlog = async (id) => {
  //   try {
  //     const blog = blogs.find(blog => blog._id === id);
  //     console.log('blog', blog)
  //     console.log('Deleting blog with id:', blog._id);
  //     if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)){
  //       await blogService.deleteBlog(blog._id);
  //       setBlogs(blogs.filter(blog => blog._id !== id));
  //       fetchBlogs()
  //     }
  //   } catch (error) {
  //     console.error('Error deleting blog:', error.response.data);
  //   }
  // }

  // const blogForm = () => (
  //   <div className="mt-8 mb-8 p-4 border border-gray-300 rounded">
  //     <h2 className="text-xl font-semibold mt-4 mb-4">Add a new blog</h2>
  //     <form onSubmit={addBlog} className="space-y-4">
  //       <label className="block text-sm font-semibold">Title</label>
  //       <input className="w-full p-2 border border-gray-300 rounded"
  //         type='text'
  //         value = {newBlogTitle}
  //         onChange={({ target }) => setNewBlogTitle(target.value)}
  //       />
  //       <label className="block text-sm font-semibold">Content</label>
  //       <input className="w-full p-2 border border-gray-300 rounded"
  //         type='text'
  //         value = {newBlogContent}
  //         onChange={({ target }) => setNewBlogContent(target.value)}
  //       />
  //       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">save</button>
  //     </form>
  //   </div>
  // )

  return (
    // <div className="container mx-auto p-3">
    //   <h1 className="text-2xl font-bold mb-4">Blogs</h1>
    //   {blogForm()}
    //   <ul className="space-y-4"> 
    //     {blogs.map(blog =>
    //       <Blog 
    //         key={blog._id} 
    //         blog={blog} 
    //         onEdit={() => editBlog(blog)}
    //         onDelete={() => deleteBlog(blog._id)} />
    //     )}
    //   </ul>

    //   {editingBlog && (
    //     <div className="mt-8 p-4 border border-gray-300 rounded">
    //       <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
    //       <form onSubmit={updateBlog} className="space-y-4"> 
    //         <label className="block text-sm font-semibold">Title</label>
    //         <input className="w-full p-2 border border-gray-300 rounded"
    //           placeholder="Blog title"
    //           type='text'
    //           value={updatedTitle}
    //           onChange={({ target }) => setUpdatedTitle(target.value)}
    //         />
    //         <label className="block text-sm font-semibold">Content</label>
    //         <input className="w-full p-2 border border-gray-300 rounded"
    //           placeholder="Blog content"
    //           type='text'
    //           value={updatedContent}
    //           onChange={({ target }) => setUpdatedContent(target.value)}
    //         />
    //         <div className="flex space-x-4">
    //           <button type='submit' className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Update</button>
    //           <button onClick={() => setEditingBlog(null)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
    //         </div>
    //       </form>
    //     </div>
    //     )}
    // </div>

    <BrowserRouter>
      <div className="container mx-auto p-3">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to='/'>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to='/blogs'>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blogs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to='/authors'>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Authors
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to='/login'>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Routes>
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/authors" element={<AuthorPage />} />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} /> */}
        </Routes>

        {/* <h1 className="text-2xl font-bold mb-4">Blogs</h1>
        <BlogForm
          onBlogSubmit={handleBlogSubmit}
          initialBlog={editingBlog}
        /> */}

        {/* {editingBlog && (
          <div className="mt-8 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
            <BlogForm
              onBlogSubmit={handleBlogSubmit}
              initialBlog={{
                _id: editingBlog._id,
                title: updatedTitle,
                content: updatedContent,
                authorId: updatedAuthorId, // Pass the updatedAuthorId state
              }}
            />
            <button
              onClick={() => {
                setEditingBlog(null);
                setUpdatedTitle('');
                setUpdatedContent('');
                setUpdatedAuthorId(''); // Reset the updatedAuthorId state
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )} */}
      </div>
    </BrowserRouter>
  )
}

export default App
