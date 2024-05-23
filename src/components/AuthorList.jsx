import { Button } from "@/components/ui/button"

const AuthorList = ({ authors, onEditAuthor, onDeleteAuthor }) => {
  return (
    <ul className="space-y-4">
      {authors.map((author) => (
        <li key={author._id} className="p-4 border border-gray-300 rounded shadow">
          <h3 className="text-xl font-bold">{author.fullName}</h3>
          <p className="mt-4 mb-4">{author.email}</p>
          <div className="flex space-x-4">
            <Button onClick={() => onEditAuthor(author)}>Edit</Button>
            <Button onClick={() => onDeleteAuthor(author._id)} variant='destructive'>Delete</Button>        
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AuthorList;