import BadRequestException from '../exceptions/BadRequest';
import NotFoundException from '../exceptions/NotFound';
import { INewPlant, IPlant, IVerifyNewPlant } from '../interfaces';
import { IModel } from '../models/interfaces';
import { IService } from './interfaces';

class PlantService implements IService<IPlant, INewPlant> {
  private readonly plantModel: IModel<IPlant>;

  constructor(model: IModel<IPlant>) {
    this.plantModel = model;
  }

  public async getAll(): Promise<IPlant[]> {
    const plants = await this.plantModel.getAll();

    return plants;
  }

  public async getById(id: string): Promise<IPlant> {
    const plant = await this.plantModel.getById(id);
    if (!plant) {
      throw new NotFoundException('Plant not found.');
    }

    return plant;
  }

  public async create(plant: INewPlant): Promise<IPlant> {
    const {
      breed,
      needsSun,
      origin,
      size,
    } = plant;
    PlantService.verifyNewPlantAttributes({ breed, needsSun, size });

    const waterFrequency = needsSun ? size * 0.77 + (origin === 'Brazil' ? 8 : 7) : (size / 2) * 1.33 + (origin === 'Brazil' ? 8 : 7);

    const newPlant = await this.plantModel.create({ ...plant, waterFrequency });

    return newPlant;
  }

  public async update(id: string, plant: Omit<IPlant, 'id'>): Promise<IPlant> {
    PlantService.verifyNewPlantAttributes(plant);

    const plantExists = await this.plantModel.getById(id);
    if (!plantExists) throw new NotFoundException('Plant not Found!');

    const IdToUpdate = parseInt(id, 10);

    const newPlant = await this.plantModel.update({ id: IdToUpdate, ...plant });

    return newPlant;
  }

  public async removeById(id: string): Promise<void> {
    const removePlant = await this.plantModel.removeById(id);

    if (!removePlant) {
      throw new NotFoundException('Plant not found');
    }
  }

  static verifyNewPlantAttributes(plant: IVerifyNewPlant): void {
    const {
      breed,
      needsSun,
      size,
    } = plant;

    if (typeof breed !== 'string') {
      throw new BadRequestException('Attribute "breed" must be a string.');
    }
    if (typeof needsSun !== 'boolean') {
      throw new BadRequestException('Attribute "needsSun" must be boolean.');
    }
    if (typeof size !== 'number') {
      throw new BadRequestException('Attribute "size" must be a number.');
    }
  }
}

export default PlantService;
