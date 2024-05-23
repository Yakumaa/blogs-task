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

  const fetch = async () => {
    const initialBlogs = await blogService.getAllBlogs();
    const initialAuthors = await authorService.getAllAuthors();
    setBlogs(initialBlogs);
    setAuthors(initialAuthors);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
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
      </div>
    </BrowserRouter>
  )
}

export default App
