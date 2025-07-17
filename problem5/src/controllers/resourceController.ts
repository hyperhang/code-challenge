import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Resource } from '../models/Resource';
import { ResourceCreateDto, ResourceUpdateDto, ResourceFilters } from '../types';

export class ResourceController {
  // Create resource
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const resourceRepository = getRepository(Resource);
      const resourceData: ResourceCreateDto = req.body;
      
      // Validate required fields
      if (!resourceData.name || !resourceData.description) {
        return res.status(400).json({ error: 'Name and description are required' });
      }
      
      const newResource = resourceRepository.create(resourceData);
      const result = await resourceRepository.save(newResource);
      
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error creating resource:', error);
      return res.status(500).json({ error: 'Failed to create resource' });
    }
  }
  
  // List resources with filters
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const resourceRepository = getRepository(Resource);
      const filters: ResourceFilters = {};
      
      // Extract filters from query parameters
      if (req.query.name) filters.name = req.query.name as string;
      if (req.query.type) filters.type = req.query.type as string;
      if (req.query.isActive !== undefined) {
        filters.isActive = req.query.isActive === 'true';
      }
      
      // Build the query
      let query = resourceRepository.createQueryBuilder('resource');
      
      if (filters.name) {
        query = query.andWhere('resource.name LIKE :name', { name: `%\${filters.name}%` });
      }
      
      if (filters.type) {
        query = query.andWhere('resource.type = :type', { type: filters.type });
      }
      
      if (filters.isActive !== undefined) {
        query = query.andWhere('resource.isActive = :isActive', { isActive: filters.isActive });
      }
      
      const resources = await query.getMany();
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
      const updateData: ResourceUpdateDto = req.body;
      
      const resource = await resourceRepository.findOne(id);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      await resourceRepository.update(id, updateData);
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