import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Resource } from '../models/Resource';
import { ResourceCreateDto, ResourceUpdateDto, ResourceFilters } from '../types';

export class ResourceController {
  // Create resource
async create(req: Request, res: Response): Promise<Response> {
  try {
    const resourceRepository = getRepository(Resource);
    const resourceData = req.body;
    
    // Validate required fields
    if (!resourceData.name || !resourceData.description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    
    console.log('Creating new resource:', resourceData);
    delete resourceData.id; // remove resource id in the request (here id is always incrementally auto-created)
    const newResource = resourceRepository.create(
      resourceData
    )
    // Save the resource
    const result = await resourceRepository.save(newResource);
    
    console.log('Resource created:', newResource);
    
    // Count resources after creation
    const count = await resourceRepository.count();
    console.log(`Total resources in database: ${count}`);
    
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating resource:', error);
    return res.status(500).json({ 
      error: 'Failed to create resource', 
      details: (error as any ).message,
      stack: (error as any ).stack
    });
  }
}
  // List resources with filters
async findAll(req: Request, res: Response): Promise<Response> {
  try {
    const resourceRepository = getRepository(Resource);
    
    // Build filter object based on query parameters
    const filters: any = {};
    
    // Extract filters from query parameters
    if (req.query.name) {
      filters.name = Like(`%${req.query.name as string}%`); // Using Like operator for partial matching
    }
    
    if (req.query.type) {
      filters.type = req.query.type as string;
    }
    
    if (req.query.isActive !== undefined) {
      filters.isActive = req.query.isActive === 'true';
    }
    
    console.log('Fetching resources with filters:', filters);
    
    // Use find method instead of query builder for simplicity
    const resources = Object.keys(filters).length > 0 
      ? await resourceRepository.find({ where: filters })
      : await resourceRepository.find();
    
    console.log(`Found ${resources.length} resources`);
    
    return res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return res.status(500).json({ error: 'Failed to fetch resources' });
  }
}
  
  // Get resource by ID
  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const resourceRepository = getRepository(Resource);
      const id = parseInt(req.params.id);
      
      const resource = await resourceRepository.findOne(id);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      return res.json(resource);
    } catch (error) {
      console.error('Error fetching resource:', error);
      return res.status(500).json({ error: 'Failed to fetch resource' });
    }
  }
  
  // Update resource
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const resourceRepository = getRepository(Resource);
      const id = parseInt(req.params.id);
      const requestData = req.body;

      const updateData: ResourceUpdateDto = {
        name: requestData.name,
        description: requestData.description,
        type: requestData.type,
        isActive: requestData.isActive
      };
      
      // Remove undefined values (optional)
      const filteredUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v !== undefined)
      );

      const resource = await resourceRepository.findOne(id);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      await resourceRepository.update(id, filteredUpdateData);
      const updatedResource = await resourceRepository.findOne(id);
      
      return res.json(updatedResource);
    } catch (error) {
      console.error('Error updating resource:', error);
      return res.status(500).json({ error: 'Failed to update resource' });
    }
  }
  
  // Delete resource
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const resourceRepository = getRepository(Resource);
      const id = parseInt(req.params.id);
      
      const resource = await resourceRepository.findOne(id);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      await resourceRepository.delete(id);
      
      return res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
      console.error('Error deleting resource:', error);
      return res.status(500).json({ error: 'Failed to delete resource' });
    }
  }
}