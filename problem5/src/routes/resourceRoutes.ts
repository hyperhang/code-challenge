import { Router } from 'express';
import { ResourceController } from '../controllers/resourceController';

const router = Router();
const resourceController = new ResourceController();

// Create a new resource
router.post('/', resourceController.create.bind(resourceController));

// List resources with filters
router.get('/', resourceController.findAll.bind(resourceController));

// Get resource details by ID
router.get('/:id', resourceController.findOne.bind(resourceController));

// Update resource
router.put('/:id', resourceController.update.bind(resourceController));

// Delete resource
router.delete('/:id', resourceController.delete.bind(resourceController));

export default router;