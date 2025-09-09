/**
 * HOMEWORK: Add TypeScript types to this Fastify server
 * 
 * This file contains the same server logic as server.ts but without proper TypeScript typing.
 * Your task is to add proper TypeScript types, interfaces, and type annotations.
 * 
 * Instructions:
 * 1. Add proper request/reply type annotations for Fastify routes
 * 2. Use proper generic types for Fastify route handlers
 * 3. Create proper interfaces for request parameters and bodies
 * 4. Add proper error handling types
 * 5. Use union types and type guards where appropriate
 * 6. Replace 'any' types with proper TypeScript types
 */

// TODO: Import proper types from Fastify
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

// TODO: Import your properly typed interfaces from the homework types file
// import { ... } from './types-homework';

// TODO: Create proper request type interfaces for Fastify routes
interface CreateHobbyRequest {
  // Add proper typing here
  body: any;
}

interface UpdateHobbyRequest {
  // Add proper typing here  
  params: any;
  body: any;
}

interface DeleteHobbyRequest {
  // Add proper typing here
  params: any;
}

interface GetHobbyRequest {
  // Add proper typing here
  params: any;
}

interface GetHobbiesRequest {
  // Add proper typing here
  query: any;
}

// TODO: Add proper class typing
export class HobbyServer {
  private fastify: any; // TODO: Add proper Fastify typing
  private prisma: any; // TODO: Add proper Prisma typing
  private repository: any; // TODO: Add proper repository typing

  constructor() {
    this.fastify = Fastify({ logger: true });
    this.prisma = new PrismaClient();
    // TODO: Initialize repository with proper typing
    this.repository = {}; // Replace with proper repository initialization
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupRoutes(): void {
    // TODO: Add proper CORS typing
    this.fastify.register(require('@fastify/cors'), {
      origin: true
    });

    // TODO: Add proper route typing and schema validation
    this.fastify.get(
      '/hobbies',
      {
        schema: {
          // TODO: Add proper schema typing
          querystring: {
            type: 'object',
            properties: {
              page: { type: 'number', minimum: 1 },
              limit: { type: 'number', minimum: 1, maximum: 100 },
              category: { type: 'string' }, // TODO: Add proper enum values
              difficulty: { type: 'string' }, // TODO: Add proper enum values
              isActive: { type: 'boolean' },
              search: { type: 'string' }
            }
          }
        }
      },
      // TODO: Add proper async function typing with request/reply types
      async (request: any, reply: any): Promise<any> => {
        try {
          const params = request.query;
          const page = params.page || 1;
          const limit = params.limit || 10;

          // TODO: Add proper Promise.all typing
          const [hobbies, total] = await Promise.all([
            this.repository.findAll(params),
            this.repository.count(params)
          ]);

          const totalPages = Math.ceil(total / limit);

          // TODO: Create properly typed response object
          const response = {
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

    // TODO: Add proper typing for GET /hobbies/:id route
    this.fastify.get(
      '/hobbies/:id',
      {
        schema: {
          // TODO: Add proper params schema
          params: {
            type: 'object',
            properties: {
              id: { type: 'string', pattern: '^[0-9]+$' }
            },
            required: ['id']
          }
        }
      },
      // TODO: Add proper typing
      async (request: any, reply: any): Promise<any> => {
        try {
          // TODO: Add proper ID parsing with type checking
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

    // TODO: Add proper typing for POST /hobbies route
    this.fastify.post(
      '/hobbies',
      {
        schema: {
          // TODO: Add proper body schema with correct enums
          body: {
            type: 'object',
            required: ['name', 'difficulty', 'category'],
            properties: {
              name: { type: 'string', minLength: 1, maxLength: 100 },
              description: { type: 'string', maxLength: 500 },
              difficulty: { type: 'string' }, // TODO: Add proper enum
              category: { type: 'string' }, // TODO: Add proper enum
              isActive: { type: 'boolean' }
            }
          }
        }
      },
      // TODO: Add proper typing
      async (request: any, reply: any): Promise<any> => {
        try {
          const input = request.body;
          
          // TODO: Add proper validation with typed error array
          const errors: any[] = [];
          
          if (!input.name || input.name.trim().length === 0) {
            errors.push('Name is required');
          }
          
          // TODO: Add proper type guard validation
          // Use your type guards from types-homework.ts
          
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
          // TODO: Add proper error typing and handling
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

    // TODO: Add proper typing for PUT /hobbies/:id route
    this.fastify.put(
      '/hobbies/:id',
      {
        schema: {
          // TODO: Add proper params and body schemas
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
              difficulty: { type: 'string' }, // TODO: Add proper enum
              category: { type: 'string' }, // TODO: Add proper enum
              isActive: { type: 'boolean' }
            }
          }
        }
      },
      // TODO: Add proper typing
      async (request: any, reply: any): Promise<any> => {
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

          // TODO: Add proper validation with type guards
          const errors: any[] = [];
          
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

    // TODO: Add proper typing for DELETE /hobbies/:id route
    this.fastify.delete(
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
      // TODO: Add proper typing
      async (request: any, reply: any): Promise<any> => {
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
    // TODO: Add proper error handler typing
    this.fastify.setErrorHandler((error: any, request: any, reply: any) => {
      this.fastify.log.error(error);
      
      // TODO: Create properly typed error response
      const response = {
        success: false,
        error: 'Internal server error'
      };
      
      reply.code(500).send(response);
    });
  }

  // TODO: Add proper method typing
  async start(port: any = 3000): Promise<void> {
    try {
      await this.fastify.listen({ port, host: '0.0.0.0' });
      console.log(`🚀 Server is running on http://localhost:${port}`);
    } catch (error) {
      this.fastify.log.error(error);
      process.exit(1);
    }
  }

  // TODO: Add proper method typing
  async stop(): Promise<void> {
    await this.fastify.close();
    await this.prisma.$disconnect();
  }
}

// TODO: Add proper function return typing
export async function createServer(): Promise<any> {
  const server = new HobbyServer();
  return server;
}

if (require.main === module) {
  createServer().then(server => {
    server.start(3000).catch(console.error);
  }).catch(console.error);
}