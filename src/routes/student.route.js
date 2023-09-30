import express from 'express';
import { studentController } from '../controllers/index.js';

const router = express.Router();

router.get('/', studentController.getStudentList)
router.get('/:id', studentController.getStudentById)
router.post('/', studentController.createStudent)
router.put('/', studentController.updateStudent)
router.delete('/', studentController.deleteStudent)
router.post('/fake', studentController.fakeStudent)

export default router;