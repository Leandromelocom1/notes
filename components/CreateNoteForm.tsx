// components/CreateNoteForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CreateNoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setTitle('');
      setContent('');
      window.location.reload();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Content"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Adicionar
      </Button>
    </Box>
  );
};

export default CreateNoteForm;
