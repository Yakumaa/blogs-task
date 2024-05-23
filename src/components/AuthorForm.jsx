import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import authorService from '../services/author';

const AuthorForm = ({ onAuthorSubmit, initialAuthor = null, onCancel }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (initialAuthor) {
      setFullName(initialAuthor.fullName);
      setEmail(initialAuthor.email)
    }
  }, [initialAuthor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const author = { fullName, email };
    if (initialAuthor) {
      // Update existing author
      console.log('initialAuthor._id', initialAuthor._id)
      console.log('author', author)
      const updatedAuthor = await authorService.updateAuthor(initialAuthor._id, author);
      console.log('updatedAuthor', updatedAuthor)
      onAuthorSubmit(updatedAuthor);
    } else {
      // Create new author
      const newAuthor = await authorService.createAuthor(author);
      console.log('newAuthor', newAuthor)
      onAuthorSubmit(newAuthor);
    }
    setFullName('');
    setEmail('');
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onAuthorSubmit({
  //     _id: initialAuthor ? initialAuthor._id : undefined,
  //     fullName,
  //     email
  //   });
  // };

  const handleCancel = () => {
    setFullName('');
    setEmail('');
    onCancel();
  };

  return (
    <div className="border-gray-300 rounded">
      <h2 className="text-xl font-semibold mt-2 mb-4">
        {initialAuthor ? 'Edit Author' : 'Create Author'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-semibold">Name</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <label className="block text-sm font-semibold">Email</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>

        <div className="flex justify-end space-x-4">
          <Button onClick={handleCancel} variant='secondary'>Cancel</Button>
          <Button>{initialAuthor ? 'Update Author' : 'Create Author'}</Button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;