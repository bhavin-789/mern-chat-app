import { Router } from 'express';
import { verifyToken } from '../middlewares/AuthMiddleware';
import {
  getAllContacts,
  getContactsForDMList,
  searchContacts,
} from '../controllers/ContactsController';

const contatRoutes = Router();

contatRoutes.post('/search', verifyToken, searchContacts);
contatRoutes.get('/get-contacts-for-dm', verifyToken, getContactsForDMList);
contatRoutes.get('/get-all-contacts', verifyToken, getAllContacts);

export default contatRoutes;
