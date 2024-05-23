import {useState, useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../components/ui/button";
import authorService from '../services/author';
import AuthorList from '../components/AuthorList';
import AuthorForm from '../components/AuthorForm';

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [deletingAuthor, setDeletingAuthor] = useState(null); 
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  // useEffect(() => {
  //   // Trigger re-render after authors state has been updated
  // }, [authors]);

  const fetchAuthors = async () => {
    try {
      const fetchedAuthors = await authorService.getAllAuthors();
      setAuthors(fetchedAuthors);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleAuthorSubmit = (updatedAuthor) => {
    // console.log('updatedAuthor', updatedAuthor);
    // setAuthors((prevAuthors) =>
    //   prevAuthors.some((a) => a._id === author._id)
    //     ? prevAuthors.map((a) => (a._id === author._id ? author : a))
    //     : [...prevAuthors, author]
    // );
    setAuthors((prevAuthors) => {
      console.log('prevAuthors', prevAuthors);
      if (updatedAuthor._id) {
        // Update existing author
        return prevAuthors.map((author) =>
          author._id === updatedAuthor._id ? updatedAuthor : author
        );
      } else {
        // Create new author
        return [...prevAuthors, updatedAuthor];
      }
    });
    setEditingAuthor(null);
    setShowCreateForm(false);
    setOpen(false);
  };

  // const handleAuthorSubmit = async (author) => {
  //   try {
  //     let updatedAuthor;
  //     if (author._id) {
  //       updatedAuthor = await authorService.updateAuthor(author._id, author);
  //     } else {
  //       updatedAuthor = await authorService.createAuthor(author);
  //     }

  //     setAuthors((prevAuthors) => {
  //       if (author._id) {
  //         return prevAuthors.map((a) => (a._id === author._id ? updatedAuthor : a));
  //       } else {
  //         return [...prevAuthors, updatedAuthor];
  //       }
  //     });

  //     setEditingAuthor(null);
  //     setShowCreateForm(false);
  //     setOpen(false);
  //   } catch (error) {
  //     console.error('Error updating author:', error);
  //   }
  // };

  const handleEditAuthor = (author) => {
    setEditingAuthor(author);
  };

  const handleDeleteAuthor = (authorId) => {
    setDeletingAuthor(authors.find(author => author._id === authorId))
  };

  const confirmDeleteAuthor = async () => {
    try {
      await authorService.deleteAuthor(deletingAuthor._id);
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author._id !== deletingAuthor._id));
      setDeletingAuthor(null);
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setEditingAuthor(null);
  };

  const handleCancelForm = () => {
    setShowCreateForm(false);
    setEditingAuthor(null);
    setDeletingAuthor(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold m-2">Authors</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button onClick={toggleCreateForm}>Create Author</Button>
          </DialogTrigger>
          <DialogContent>
              <AuthorForm onAuthorSubmit={handleAuthorSubmit} onCancel={handleCancelForm}/>
          </DialogContent>
        </Dialog>
      </div>

      {editingAuthor && (
        <Dialog open={true} onOpenChange={handleCancelForm}>
          <DialogContent>
            <AuthorForm
              onAuthorSubmit={handleAuthorSubmit}
              initialAuthor={editingAuthor}
              onCancel={handleCancelForm}
            />
          </DialogContent>
        </Dialog>
      )}

      {deletingAuthor && (
        <Dialog open={true} onOpenChange={handleCancelForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete this Author?</DialogTitle>
              <DialogDescription>
                This will permanently delete the Author and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleCancelForm} variant='secondary'>Cancel</Button>
              <Button onClick={confirmDeleteAuthor} variant='destructive'>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <AuthorList 
        authors={authors} 
        onEditAuthor={handleEditAuthor} 
        onDeleteAuthor={handleDeleteAuthor}
      />
    </div>
  )
}

export default AuthorPage;