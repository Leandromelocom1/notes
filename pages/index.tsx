// pages/index.tsx
import { GetServerSideProps } from 'next';
import dbConnect from '../lib/db';
import Note from '../models/Note';
import NoteCard from '../components/NoteCard';
import CreateNoteForm from '../components/CreateNoteForm';
import { Container, Grid, Typography } from '@mui/material';

interface HomeProps {
  notes: { _id: string; title: string; content: string }[];
}

const Home: React.FC<HomeProps> = ({ notes }) => {
  const handleDelete = async (id: string) => {
    await fetch('/api/notes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    window.location.reload();
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Notas
      </Typography>
      <CreateNoteForm />
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {notes.map((note) => (
          <Grid item key={note._id} xs={12} sm={6} md={4}>
            <NoteCard id={note._id} title={note.title} content={note.content} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const notes = await Note.find({});
  return { props: { notes: JSON.parse(JSON.stringify(notes)) } };
};

export default Home;
