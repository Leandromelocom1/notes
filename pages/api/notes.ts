// pages/api/notes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import Note from '../../models/Note';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const notes = await Note.find({});
        res.status(200).json({ success: true, data: notes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const note = await Note.create(req.body);
        res.status(201).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        await Note.findByIdAndDelete(id);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
