import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { 
  Hobby, 
  CreateHobbyInput, 
  HobbyUpdateInput, 
  ApiResponse, 
  PaginatedResponse,
  HobbyQueryParams,
  isValidHobbyDifficulty,
  isValidHobbyCategory
} from './types';
import { HobbyRepository } from '../repository';

// Request type definitions for Fastify routes
interface CreateHobbyRequest extends FastifyRequest {
  body: CreateHobbyInput;
}

interface UpdateHobbyRequest extends FastifyRequest {
  params: { id: string };
  body: HobbyUpdateInput;
}

interface DeleteHobbyRequest extends FastifyRequest {
  params: { id: string };
}

interface GetHobbyRequest extends FastifyRequest {
  params: { id: string };
}

interface GetHobbiesRequest extends FastifyRequest {
  query: HobbyQueryParams;
}

// Server class with proper TypeScript typing
export class HobbyServer {
  private fastify: FastifyInstance;
  private prisma: PrismaClient;
  private repository: HobbyRepository;

  constructor() {
    this.fastify = Fastify({ logger: true });
    this.prisma = new PrismaClient();
    this.repository = new HobbyRepository(this.prisma);
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupRoutes(): void {
    // CORS setup
    this.fastify.register(require('@fastify/cors'), {
      origin: true
    });

    // GET /hobbies - Read all hobbies with pagination and filtering
    this.fastify.get<{ Querystring: HobbyQueryParams }>(
      '/hobbies',
      {
        schema: {
          querystring: {
            type: 'object',
            properties: {
              page: { type: 'number', minimum: 1 },
              limit: { type: 'number', minimum: 1, maximum: 100 },
              category: { type: 'string', enum: ['sports', 'arts', 'technology', 'outdoor', 'indoor', 'creative'] },
              difficulty: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] },
              isActive: { type: 'boolean' },
              search: { type: 'string' }
            }
          }
        }
      },
      async (request: GetHobbiesRequest, reply: FastifyReply): Promise<ApiResponse<PaginatedResponse<Hobby>>> => {
        try {
          const params = request.query;
          const page = params.page || 1;
          const limit = params.limit || 10;

          const [hobbies, total] = await Promise.all([
            this.repository.findAll(params),
            this.repository.count(params)
          ]);

          const totalPages = Math.ceil(total / limit);

          const response: PaginatedResponse<Hobby> = {
            data: hobbies,
            total,
            page,
            limit,
            totalPages
          };

          return {
            success: true,
            data: response,
            message: `Found ${hobbies.length} hobbies`
          };
        } catch (error) {
          reply.code(500);
          return {
            success: false,
            error: 'Failed to fetch hobbies'
          };
        }
      }
    );

    // GET /hobbies/:id - Read a specific hobby
    this.fastify.get<{ Params: { id: string } }>(
      '/hobbies/:id',
      {
        schema: {
          params: {
            type: 'object',
            properties: {
              id: { type: 'string', pattern: '^[0-9]+$' }
            },
            required: ['id']
          }
        }
      },
      async (request: GetHobbyRequest, reply: FastifyReply): Promise<ApiResponse<Hobby>> => {
        try {
          const id = parseInt(request.params.id);
          
          if (isNaN(id)) {
            reply.code(400);
            return {
              success: false,
              error: 'Invalid hobby ID'
            };
          }

          const hobby = await this.repository.findById(id);
          
          if (!hobby) {
            reply.code(404);
            return {
              success: false,
              error: 'Hobby not found'
            };
          }

          return {
            success: true,
            data: hobby,
            message: 'Hobby retrieved successfully'
          };
        } catch (error) {
          reply.code(500);
          return {
            success: false,
            error: 'Failed to fetch hobby'
          };
        }
      }
    );

    // POST /hobbies - Create a new hobby
    this.fastify.post<{ Body: CreateHobbyInput }>(
      '/hobbies',
      {
        schema: {
          body: {
            type: 'object',
            required: ['name', 'difficulty', 'category'],
            properties: {
              name: { type: 'string', minLength: 1, maxLength: 100 },
              description: { type: 'string', maxLength: 500 },
              difficulty: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] },
              category: { type: 'string', enum: ['sports', 'arts', 'technology', 'outdoor', 'indoor', 'creative'] },
              isActive: { type: 'boolean' }
            }
          }
        }
      },
      async (request: CreateHobbyRequest, reply: FastifyReply): Promise<ApiResponse<Hobby>> => {
        try {
          const input = request.body;
          
          // Validation
          const errors: string[] = [];
          
          if (!input.name || input.name.trim().length === 0) {
            errors.push('Name is required');
          }
          
          if (!isValidHobbyDifficulty(input.difficulty)) {
            errors.push('Invalid difficulty level');
          }
          
          if (!isValidHobbyCategory(input.category)) {
            errors.push('Invalid category');
          }

          if (errors.length > 0) {
            reply.code(400);
            return {
              success: false,
              error: errors.join(', ')
            };
          }

          const hobby = await this.repository.create(input);
          
          reply.code(201);
          return {
            success: true,
            data: hobby,
            message: 'Hobby created successfully'
          };
        } catch (error: any) {
          if (error.code === 'P2002') {
            reply.code(409);
            return {
              success: false,
              error: 'Hobby with this name already exists'
            };
          }
          
          reply.code(500);
          return {
            success: false,
            error: 'Failed to create hobby'
          };
        }
      }
    );

    // PUT /hobbies/:id - Update a hobby
    this.fastify.put<{ Params: { id: string }, Body: HobbyUpdateInput }>(
      '/hobbies/:id',
      {
        schema: {
          params: {
            type: 'object',
            properties: {
              id: { type: 'string', pattern: '^[0-9]+$' }
            },
            required: ['id']
          },
          body: {
            type: 'object',
            properties: {
              name: { type: 'string', minLength: 1, maxLength: 100 },
              description: { type: 'string', maxLength: 500 },
              difficulty: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] },
              category: { type: 'string', enum: ['sports', 'arts', 'technology', 'outdoor', 'indoor', 'creative'] },
              isActive: { type: 'boolean' }
            }
          }
        }
      },
      async (request: UpdateHobbyRequest, reply: FastifyReply): Promise<ApiResponse<Hobby>> => {
        try {
          const id = parseInt(request.params.id);
          const updateData = request.body;
          
          if (isNaN(id)) {
            reply.code(400);
            return {
              success: false,
              error: 'Invalid hobby ID'
            };
          }

          // Validation for provided fields
          const errors: string[] = [];
          
          if (updateData.difficulty && !isValidHobbyDifficulty(updateData.difficulty)) {
            errors.push('Invalid difficulty level');
          }
          
          if (updateData.category && !isValidHobbyCategory(updateData.category)) {
            errors.push('Invalid category');
          }

          if (errors.length > 0) {
            reply.code(400);
            return {
              success: false,
              error: errors.join(', ')
            };
          }

          const hobby = await this.repository.update(id, updateData);
          
          if (!hobby) {
            reply.code(404);
            return {
              success: false,
              error: 'Hobby not found'
            };
          }

          return {
            success: true,
            data: hobby,
            message: 'Hobby updated successfully'
          };
        } catch (error: any) {
          if (error.code === 'P2002') {
            reply.code(409);
            return {
              success: false,
              error: 'Hobby with this name already exists'
            };
          }
          
          reply.code(500);
          return {
            success: false,
            error: 'Failed to update hobby'
          };
        }
      }
    );

    // DELETE /hobbies/:id - Delete a hobby
    this.fastify.delete<{ Params: { id: string } }>(
      '/hobbies/:id',
      {
        schema: {
          params: {
            type: 'object',
            properties: {
              id: { type: 'string', pattern: '^[0-9]+$' }
            },
            required: ['id']
          }
        }
      },
      async (request: DeleteHobbyRequest, reply: FastifyReply): Promise<ApiResponse<null>> => {
        try {
          const id = parseInt(request.params.id);
          
          if (isNaN(id)) {
            reply.code(400);
            return {
              success: false,
              error: 'Invalid hobby ID'
            };
          }

          const deleted = await this.repository.delete(id);
          
          if (!deleted) {
            reply.code(404);
            return {
              success: false,
              error: 'Hobby not found'
            };
          }

          return {
            success: true,
            data: null,
            message: 'Hobby deleted successfully'
          };
        } catch (error) {
          reply.code(500);
          return {
            success: false,
            error: 'Failed to delete hobby'
          };
        }
      }
    );
  }

  private setupErrorHandling(): void {
    this.fastify.setErrorHandler((error, request, reply) => {
      this.fastify.log.error(error);
      
      const response: ApiResponse<null> = {
        success: false,
        error: 'Internal server error'
      };
      
      reply.code(500).send(response);
    });
  }

  async start(port: number = 3000): Promise<void> {
    try {
      await this.fastify.listen({ port, host: '0.0.0.0' });
      console.log(`🚀 Server is running on http://localhost:${port}`);
    } catch (error) {
      this.fastify.log.error(error);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    await this.fastify.close();
    await this.prisma.$disconnect();
  }
}

// Server startup file
export async function createServer(): Promise<HobbyServer> {
  const server = new HobbyServer();
  return server;
}

// If this file is run directly, start the server
if (require.main === module) {
  createServer().then(server => {
    server.start(3000).catch(console.error);
  }).catch(console.error);
}
