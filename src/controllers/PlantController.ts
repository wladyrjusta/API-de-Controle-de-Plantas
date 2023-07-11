import { Request, Response, NextFunction } from 'express';
import PlantService from '../services/PlantService';

class PlantController {
  public readonly service: PlantService;

  constructor(service: PlantService) {
    this.service = service;
  }

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const plants = await this.service.getAll();
      return res.status(200).json(plants);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const plant = await this.service.getById(req.params.id);
      return res.status(200).json(plant);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const plant = await this.service.create(req.body);
      return res.status(201).json(plant);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const plant = await this.service.update(req.params.id, req.body);
      return res.status(200).json(plant);
    } catch (e) {
      next(e);
    }
  }

  public async remove(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await this.service.removeById(req.params.id);

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
}

export default PlantController;
