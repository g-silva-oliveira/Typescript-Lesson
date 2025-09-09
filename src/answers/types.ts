// TypeScript Types and Interfaces for Hobbies API
// This file demonstrates various TypeScript type features

// 1. Primitive Types and Union Types
export type HobbyDifficulty = "beginner" | "intermediate" | "advanced";
export type HobbyCategory = "sports" | "arts" | "technology" | "outdoor" | "indoor" | "creative";

// 2. Interface Definition
export interface Hobby {
  id: number;
  name: string;
  description: string | null;
  difficulty: HobbyDifficulty;
  category: HobbyCategory;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 3. Partial Types for Updates (Utility Type)
export type HobbyUpdateInput = Partial<Omit<Hobby, 'id' | 'createdAt' | 'updatedAt'>>;

// 4. Input Types for API
export interface CreateHobbyInput {
  name: string;
  description?: string;
  difficulty: HobbyDifficulty;
  category: HobbyCategory;
  isActive?: boolean;
}

// 5. Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 6. Query Parameters Interface
export interface HobbyQueryParams {
  page?: number;
  limit?: number;
  category?: HobbyCategory;
  difficulty?: HobbyDifficulty;
  isActive?: boolean;
  search?: string;
}

// 7. Type Guards
export function isValidHobbyDifficulty(difficulty: string): difficulty is HobbyDifficulty {
  return ["beginner", "intermediate", "advanced"].includes(difficulty);
}

export function isValidHobbyCategory(category: string): category is HobbyCategory {
  return ["sports", "arts", "technology", "outdoor", "indoor", "creative"].includes(category);
}

// 8. Mapped Types Example
export type HobbyKeys = keyof Hobby;
export type OptionalHobby = {
  [K in keyof Hobby]?: Hobby[K];
};

// 9. Conditional Types
export type NonNullable<T> = T extends null | undefined ? never : T;
export type HobbyWithoutNull = {
  [K in keyof Hobby]: NonNullable<Hobby[K]>;
};

// 10. Intersection Types
export interface HobbyStatistics {
  totalHobbies: number;
  averageDifficulty: number;
  categoryCounts: Record<HobbyCategory, number>;
}

export type HobbyWithStats = Hobby & {
  statistics?: HobbyStatistics;
};

// 11. Generic Types
export interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(params?: Record<string, any>): Promise<T[]>;
  create(data: CreateHobbyInput): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

// 12. Function Types
export type HobbyValidator = (hobby: CreateHobbyInput) => string[];
export type HobbyTransformer<T> = (hobby: Hobby) => T;

// 13. Class with TypeScript features
export class HobbyService {
  constructor(private repository: Repository<Hobby>) {}

  async validateHobby(input: CreateHobbyInput): Promise<string[]> {
    const errors: string[] = [];
    
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

  async createHobby(input: CreateHobbyInput): Promise<ApiResponse<Hobby>> {
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
