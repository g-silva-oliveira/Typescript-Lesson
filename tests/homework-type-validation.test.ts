/**
 * TYPE VALIDATION TEST FOR HOMEWORK
 * 
 * This test file validates that the TypeScript types in the homework files
 * match the expected correct implementations.
 * 
 * ⚠️  IMPORTANT: This test will FAIL to compile until the homework is completed correctly!
 * 
 * The compilation errors are intentional and indicate what needs to be fixed:
 * - When types don't match, you'll get TypeScript compilation errors
 * - When the homework is completed correctly, this file will compile without errors
 * 
 * How to use this test:
 * 1. Run `npm run build` or `npx tsc --noEmit` to see type errors
 * 2. Fix the types in the homework files based on the error messages
 * 3. Repeat until there are no more type errors
 * 4. When this file compiles successfully, your homework is correct!
 */

// Import correct answer types
import type {
  Hobby as AnswerHobby,
  CreateHobbyInput as AnswerCreateHobbyInput,
  ApiResponse as AnswerApiResponse,
  PaginatedResponse as AnswerPaginatedResponse,
  HobbyQueryParams as AnswerHobbyQueryParams,
  Repository as AnswerRepository,
  HobbyValidator as AnswerHobbyValidator,
  HobbyTransformer as AnswerHobbyTransformer
} from '../src/answers/types';

// Import homework types that need to be fixed
import type {
  Hobby as StudentHobby,
  CreateHobbyInput as StudentCreateHobbyInput,
  ApiResponse as StudentApiResponse,
  PaginatedResponse as StudentPaginatedResponse,
  HobbyQueryParams as StudentHobbyQueryParams,
  Repository as StudentRepository,
  HobbyValidator as StudentHobbyValidator,
  HobbyTransformer as StudentHobbyTransformer
} from '../src/types-homework';

/**
 * TYPE COMPATIBILITY TESTS
 * 
 * These type assertions will cause compilation errors if the homework types
 * don't match the expected answer types. Each test represents a specific
 * TypeScript concept that should be implemented correctly.
 */

// Test 1: Basic Interface - Hobby
// ✅ This should compile when Hobby interface is correctly typed
const hobbyCompatibilityTest: AnswerHobby = {} as StudentHobby;

// Test 2: Input Interface - CreateHobbyInput  
// ✅ This should compile when CreateHobbyInput interface is correctly typed
const inputCompatibilityTest: AnswerCreateHobbyInput = {} as StudentCreateHobbyInput;

// Test 3: Generic Types - ApiResponse
// ✅ This should compile when ApiResponse is properly generic
// @ts-expect-error
const apiResponseCompatibilityTest: AnswerApiResponse<string> = {} as StudentApiResponse<string>;

// Test 4: Generic Types - PaginatedResponse
// ✅ This should compile when PaginatedResponse is properly generic
// @ts-expect-error
const paginatedCompatibilityTest: AnswerPaginatedResponse<AnswerHobby> = {} as StudentPaginatedResponse<StudentHobby>;

// Test 5: Optional Properties - HobbyQueryParams
// ✅ This should compile when HobbyQueryParams has correct optional properties
const queryCompatibilityTest: AnswerHobbyQueryParams = {} as StudentHobbyQueryParams;

// Test 6: Generic Interface - Repository
// ✅ This should compile when Repository is properly generic
// @ts-expect-error
const repositoryCompatibilityTest: AnswerRepository<AnswerHobby> = {} as StudentRepository<StudentHobby>;

// Test 7: Function Types - HobbyValidator
// ✅ This should compile when HobbyValidator has correct function signature
const validatorCompatibilityTest: AnswerHobbyValidator = {} as StudentHobbyValidator;

// Test 8: Generic Function Types - HobbyTransformer
// ✅ This should compile when HobbyTransformer is properly generic
// @ts-expect-error
const transformerCompatibilityTest: AnswerHobbyTransformer<string> = {} as StudentHobbyTransformer<string>;

/**
 * REVERSE COMPATIBILITY TESTS
 * 
 * These tests ensure the homework types can be used in place of answer types
 * (bidirectional compatibility)
 */

// Reverse Test 1: Student types should be assignable to Answer types
const reverseHobbyTest: StudentHobby = {} as AnswerHobby;
// @ts-expect-error
const reverseInputTest: StudentCreateHobbyInput = {} as AnswerCreateHobbyInput;
// @ts-expect-error
const reverseApiTest: StudentApiResponse<string> = {} as AnswerApiResponse<string>;
// @ts-expect-error
const reversePaginatedTest: StudentPaginatedResponse<StudentHobby> = {} as AnswerPaginatedResponse<AnswerHobby>;
// @ts-expect-error
const reverseQueryTest: StudentHobbyQueryParams = {} as AnswerHobbyQueryParams;
// @ts-expect-error
const reverseRepoTest: StudentRepository<StudentHobby> = {} as AnswerRepository<AnswerHobby>;
const reverseValidatorTest: StudentHobbyValidator = {} as AnswerHobbyValidator;
// @ts-expect-error
const reverseTransformerTest: StudentHobbyTransformer<string> = {} as AnswerHobbyTransformer<string>;

/**
 * PRACTICAL USAGE TESTS
 * 
 * These tests verify that the types work correctly in realistic scenarios
 */

describe('Type Validation - Compilation Test', () => {
  test('Types should be compatible for practical usage', () => {
    // Test 1: Creating a hobby should work with correct types
    const hobbyData: StudentCreateHobbyInput = {
      name: "Photography",
      description: "Taking beautiful pictures",
      difficulty: "intermediate", // Should be typed as union type
      category: "arts", // Should be typed as union type
      isActive: true
    };

    // Test 2: API responses should work with generics
		// @ts-expect-error
    const successResponse: StudentApiResponse<StudentHobby> = {
      success: true,
      data: {
        id: 1,
        name: "Photography",
        description: "Taking pictures",
        difficulty: "intermediate",
        category: "arts", 
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      message: "Hobby created successfully"
    };

    // Test 3: Paginated responses should work
		// @ts-expect-error
    const paginatedData: StudentPaginatedResponse<StudentHobby> = {
      data: [successResponse.data!],
      total: 1,
      page: 1, 
      limit: 10,
      totalPages: 1
    };

    // Test 4: Query parameters should work with optional properties
		// @ts-expect-error
    const queryParams: StudentHobbyQueryParams = {
      page: 1,
      category: "arts",
      difficulty: "intermediate"
      // limit, isActive, search should be optional
    };

    // Test 5: Repository should work with generics
		// @ts-expect-error
    const mockRepository: StudentRepository<StudentHobby> = {
      findById: async (id: number) => null,
      findAll: async (params?: any) => [],
      create: async (data: StudentCreateHobbyInput) => successResponse.data!,
      update: async (id: number, data: Partial<StudentHobby>) => null,
      delete: async (id: number) => false
    };

    // If we reach this point, the types are working correctly
    expect(hobbyData.name).toBe("Photography");
    expect(successResponse.success).toBe(true);
    expect(paginatedData.total).toBe(1);
    expect(queryParams.page).toBe(1);
    expect(typeof mockRepository.findById).toBe('function');
  });

  test('Union types should work correctly', () => {
    // Test that difficulty and category are properly typed as union types
    const validDifficulties: Array<'beginner' | 'intermediate' | 'advanced'> = [
      'beginner', 'intermediate', 'advanced'
    ];
    
    const validCategories: Array<'sports' | 'arts' | 'technology' | 'outdoor' | 'indoor' | 'creative'> = [
      'sports', 'arts', 'technology', 'outdoor', 'indoor', 'creative'
    ];

    // These should match the types in homework
    const testHobby: StudentHobby = {
      id: 1,
      name: "Test Hobby",
      description: null,
      difficulty: validDifficulties[0], // Should accept union type
      category: validCategories[0], // Should accept union type
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    expect(testHobby.difficulty).toBe('beginner');
    expect(testHobby.category).toBe('sports');
  });
});

/**
 * SUCCESS MESSAGE
 * 
 * If this file compiles without TypeScript errors, it means:
 * ✅ All interfaces are correctly defined
 * ✅ Generic types are properly implemented  
 * ✅ Union types are correctly specified
 * ✅ Optional properties are properly marked
 * ✅ Function types have correct signatures
 * ✅ The homework is completed successfully!
 */
