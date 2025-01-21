import express from 'express'
import { createLibraryCard, getLibraryCard } from '../controllers/LibraryCardController';
import { Schemas, ValidateSchema } from '../middlewares/Validation';

const router = express.Router();

router.get('/:cardId', ValidateSchema(Schemas.libraryCard.get, 'params'), getLibraryCard);
router.post('/', ValidateSchema(Schemas.libraryCard.create, 'body'), createLibraryCard);

export default router;