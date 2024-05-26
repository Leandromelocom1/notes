// components/NoteCard.tsx
import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, content, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {content}
        </Typography>
        <IconButton aria-label="delete" onClick={() => onDelete(id)}>
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
