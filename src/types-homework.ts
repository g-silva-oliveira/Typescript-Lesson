/**
 * HOMEWORK: Add TypeScript types to this file
 * 
 * This file contains the same logic as types.ts but without TypeScript typing.
 * Your task is to add proper TypeScript types, interfaces, and type annotations.
 * 
 * Instructions:
 * 1. Add proper type annotations to all variables and functions
 * 2. Create interfaces for complex objects
 * 3. Use union types where appropriate
 * 4. Add generic types where needed
 * 5. Use type guards and type assertions correctly
 * 6. Replace 'any' types with proper TypeScript types
 */

// TODO: Create proper type definitions for hobby difficulty levels instead of constant
export const DIFFICULTY_LEVELS = ["beginner", "intermediate", "advanced"];

// TODO: Create proper type definitions for hobby categories instead of constant
export const HOBBY_CATEGORIES = ["sports", "arts", "technology", "outdoor", "indoor", "creative"];

// TODO: Define proper interface for Hobby
export interface Hobby {
  // Add proper type annotations here
  id: any;
  name: any;
  description: any;
  difficulty: any;
  category: any;
  isActive: any;
  createdAt: any;
  updatedAt: any;
}

// TODO: Create proper input type for creating hobbies
export interface CreateHobbyInput {
  // Add proper type annotations here
  name: any;
  description: any;
  difficulty: any;
  category: any;
  isActive: any;
}

// TODO: Create proper response type with generics
export interface ApiResponse {
  // Add proper type annotations here
  success: any;
  data: any;
  error: any;
  message: any;
}

// TODO: Create proper paginated response type with generics
export interface PaginatedResponse {
  // Add proper type annotations here
  data: any;
  total: any;
  page: any;
  limit: any;
  totalPages: any;
}

// TODO: Create proper query parameters interface
export interface HobbyQueryParams {
  // Add proper type annotations here
  page: any;
  limit: any;
  category: any;
  difficulty: any;
  isActive: any;
  search: any;
}

// TODO: Create proper type guards
export function isValidHobbyDifficulty(difficulty: any): any {
  return DIFFICULTY_LEVELS.includes(difficulty);
}

export function isValidHobbyCategory(category: any): any {
  return HOBBY_CATEGORIES.includes(category);
}

// TODO: Add proper types to mapped types
export type HobbyKeys = any;
export type OptionalHobby = any;

// TODO: Create proper conditional types
export type NonNullable = any;

// TODO: Create proper intersection types
export interface HobbyStatistics {
  // Add proper type annotations here
  totalHobbies: any;
  averageDifficulty: any;
  categoryCounts: any;
}

export type HobbyWithStats = any;

// TODO: Create proper generic repository interface
export interface Repository {
  // Add proper type annotations and generics here
  findById(id: any): any;
  findAll(params: any): any;
  create(data: any): any;
  update(id: any, data: any): any;
  delete(id: any): any;
}

// TODO: Add proper function type annotations
export type HobbyValidator = any;
export type HobbyTransformer = any;

// TODO: Add proper class typing
export class HobbyService {
  private repository: any; // TODO: Add proper typing for repository
  
  constructor(repository: any) {
    this.repository = repository;
  }

  // TODO: Add proper method typing
  async validateHobby(input: any): Promise<any> {
    const errors: any[] = []; // TODO: Add proper array typing
    
    if (!input.name || input.name.trim().length === 0) {
      errors.push("Name is required");
    }
    
    if (!isValidHobbyDifficulty(input.difficulty)) {
      errors.push("Invalid difficulty level");
    }
    
    if (!isValidHobbyCategory(input.category)) {
      errors.push("Invalid category");
    }
    
    return errors;
  }

  // TODO: Add proper method typing with proper return types
  async createHobby(input: any): Promise<any> {
    try {
      const errors = await this.validateHobby(input);
      if (errors.length > 0) {
        return {
          success: false,
          error: errors.join(", ")
        };
      }

      const hobby = await this.repository.create(input);
      return {
        success: true,
        data: hobby,
        message: "Hobby created successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create hobby"
      };
    }
  }
}
