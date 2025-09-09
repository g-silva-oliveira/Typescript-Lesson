import { PrismaClient, Hobby as PrismaHobby } from '@prisma/client';
import { Hobby, CreateHobbyInput, HobbyQueryParams, Repository } from './types-homework';

// Database Repository implementation using Prisma
export class HobbyRepository implements Repository<Hobby> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number): Promise<Hobby | null> {
    const hobby = await this.prisma.hobby.findUnique({
      where: { id }
    });
    
    return hobby as Hobby | null;
  }

  async findAll(params: HobbyQueryParams = {}): Promise<Hobby[]> {
    const {
      page = 1,
      limit = 10,
      category,
      difficulty,
      isActive,
      search
    } = params;

    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const hobbies = await this.prisma.hobby.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    return hobbies as Hobby[];
  }

  async create(data: CreateHobbyInput): Promise<Hobby> {
    const hobby = await this.prisma.hobby.create({
      data: {
        name: data.name,
        description: data.description || null,
        difficulty: data.difficulty,
        category: data.category,
        isActive: data.isActive ?? true
      }
    });

    return hobby as Hobby;
  }

  async update(id: number, data: Partial<Hobby>): Promise<Hobby | null> {
    try {
      const hobby = await this.prisma.hobby.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.difficulty && { difficulty: data.difficulty }),
          ...(data.category && { category: data.category }),
          ...(data.isActive !== undefined && { isActive: data.isActive })
        }
      });

      return hobby as Hobby;
    } catch (error) {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.hobby.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async count(params: HobbyQueryParams = {}): Promise<number> {
    const { category, difficulty, isActive, search } = params;
    
    const where: any = {};
    
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    return await this.prisma.hobby.count({ where });
  }
}
