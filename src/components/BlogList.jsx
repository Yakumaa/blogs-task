import { Button } from "@/components/ui/button"

const BlogList = ({ blogs, onEditBlog, onDeleteBlog, onViewBlogDetails }) => {
  return (
    <ul className="space-y-4">
      {blogs.map((blog) => (
        <li key={blog._id} onClick={() => onViewBlogDetails(blog)} className="p-4 border border-gray-300 rounded shadow">
          <h3 className="text-xl font-bold">{blog.title}</h3>
          <p className="mt-4 mb-4">{blog.content}</p>
          <div className="flex space-x-4">
            <Button onClick={() => onEditBlog(blog)}>Edit</Button>
            <Button onClick={() => onDeleteBlog(blog._id)} variant='destructive'>Delete</Button>        
          </div>
        </li>
      ))}
    </ul>
  );
};
export default BlogList