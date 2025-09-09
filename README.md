# TypeScript Learning Project - Hobbies API

This project is designed to teach TypeScript fundamentals and advanced concepts through a practical CRUD API for managing hobbies using Fastify and Prisma.

## 🎯 Learning Objectives

### Basic TypeScript Concepts (Covered in `tests/basic-typescript.test.ts`)
- **Primitive Types**: string, number, boolean, null, undefined, arrays
- **Type Inference vs Explicit Typing**: Understanding when TypeScript can infer types automatically
- **Interfaces and Types**: Creating reusable type definitions
- **Type Assertion**: Using `as` operator and `satisfies` keyword
- **Typed Functions**: Function parameters, return types, and overloads
- **any vs unknown**: Understanding type safety trade-offs

### Intermediate TypeScript Concepts (Covered in `tests/intermediate-typescript.test.ts`)
- **Generics**: Creating reusable, type-safe code
- **Union and Intersection Types**: Combining types with `|` and `&`
- **Type Guards**: Runtime type checking
- **Type Utilities**: Built-in utility types like `Partial`, `Pick`, `Omit`
- **Conditional Types**: Types that depend on conditions
- **Mapped Types**: Transforming existing types

## 🚀 Project Structure

```
typescript_2025/
├── src/                          # Main application source
│   ├── types.ts                  # TypeScript type definitions (REFERENCE)
│   ├── repository.ts             # Database repository with Prisma
│   ├── server.ts                 # Fastify server with CRUD APIs (REFERENCE)
│   └── index.ts                  # Application entry point
├── tests/                        # TypeScript learning tests
│   ├── basic-typescript.test.ts  # Fundamental TypeScript concepts
│   └── intermediate-typescript.test.ts # Advanced TypeScript concepts
├── homework/                     # Practice files for students
│   ├── types-homework.ts         # Practice adding types to type definitions
│   └── server-homework.ts        # Practice adding types to server code
├── prisma/                       # Database schema and migrations
│   └── schema.prisma            # Database schema definition
└── package.json                 # Project dependencies and scripts
```

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npm run prisma:migrate
   ```

3. **Generate Prisma client**:
   ```bash
   npm run prisma:generate
   ```

## 🧪 Running Tests

Run all TypeScript learning tests:
```bash
npm test
```

Run specific test suites:
```bash
# Basic TypeScript concepts
npm run test:basic

# Intermediate TypeScript concepts  
npm run test:intermediate
```

## 🏃‍♂️ Running the Server

Build and start the server:
```bash
npm run build
npm start
```

Or run in development mode:
```bash
npm run dev
```

The server will be available at `http://localhost:3000`

## 🎓 Learning Path

### Step 1: Study the Reference Implementation
1. Examine `src/types.ts` to see proper TypeScript typing
2. Study `src/server.ts` to understand Fastify with TypeScript
3. Run the tests to see TypeScript concepts in action

### Step 2: Practice with Homework Files
1. Open `homework/types-homework.ts`
2. Replace all `any` types with proper TypeScript types
3. Create proper interfaces and type definitions
4. Use the reference `src/types.ts` file to check your work

### Step 3: Advanced Practice
1. Open `homework/server-homework.ts`
2. Add proper TypeScript typing to the Fastify server
3. Use generics, union types, and type guards appropriately
4. Compare with `src/server.ts` to verify your solution

### Step 4: Run Tests and Build
1. Ensure all tests pass: `npm test`
2. Verify the project builds without errors: `npm run build`
3. Test the API endpoints with proper typing

## 🔗 API Endpoints

The hobby API provides these endpoints:

### GET /hobbies
Get all hobbies with optional filtering and pagination
```bash
curl "http://localhost:3000/hobbies?page=1&limit=10&category=sports"
```

### GET /hobbies/:id
Get a specific hobby by ID
```bash
curl "http://localhost:3000/hobbies/1"
```

### POST /hobbies
Create a new hobby
```bash
curl -X POST "http://localhost:3000/hobbies" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Photography",
    "description": "Taking pictures of beautiful moments",
    "difficulty": "intermediate",
    "category": "arts",
    "isActive": true
  }'
```

### PUT /hobbies/:id
Update an existing hobby
```bash
curl -X PUT "http://localhost:3000/hobbies/1" \\
  -H "Content-Type: application/json" \\
  -d '{
    "difficulty": "advanced",
    "description": "Professional photography techniques"
  }'
```

### DELETE /hobbies/:id
Delete a hobby
```bash
curl -X DELETE "http://localhost:3000/hobbies/1"
```

## 📊 Database Schema

The hobby model includes:
- `id`: Unique identifier (number)
- `name`: Hobby name (string, unique)
- `description`: Optional description (string | null)
- `difficulty`: Skill level ("beginner" | "intermediate" | "advanced")
- `category`: Hobby category ("sports" | "arts" | "technology" | "outdoor" | "indoor" | "creative")
- `isActive`: Whether the hobby is active (boolean)
- `createdAt`: Creation timestamp (Date)
- `updatedAt`: Last update timestamp (Date)

## 🛠 Development Tools

- **TypeScript Compiler**: `tsc` for type checking and compilation
- **tsx**: For running TypeScript files directly in development
- **Jest**: Testing framework with TypeScript support
- **Prisma**: Database ORM with TypeScript integration
- **Fastify**: Fast web framework with excellent TypeScript support

## 📚 Key TypeScript Features Demonstrated

### 1. Type Safety
```typescript
// ❌ This would cause a TypeScript error:
// const hobby: Hobby = { name: 123 }; // Error: Type 'number' is not assignable to type 'string'

// ✅ Correct typing:
const hobby: Hobby = {
  id: 1,
  name: "Photography",
  category: "arts",
  difficulty: "intermediate"
};
```

### 2. Generics
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const hobbyResponse: ApiResponse<Hobby> = {
  success: true,
  data: hobby
};
```

### 3. Union Types
```typescript
type HobbyDifficulty = "beginner" | "intermediate" | "advanced";
type ID = string | number;
```

### 4. Type Guards
```typescript
function isValidHobbyDifficulty(difficulty: string): difficulty is HobbyDifficulty {
  return ["beginner", "intermediate", "advanced"].includes(difficulty);
}
```

### 5. Utility Types
```typescript
type CreateHobbyInput = Omit<Hobby, 'id' | 'createdAt' | 'updatedAt'>;
type PartialHobby = Partial<Hobby>;
```

## 🎯 Homework Solutions

After completing the homework files, compare your solutions with the reference implementations:

- `homework/types-homework.ts` → `src/types.ts`
- `homework/server-homework.ts` → `src/server.ts`

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more TypeScript examples
- Improve test coverage
- Add more challenging homework exercises
- Enhance documentation

## 📖 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Fastify TypeScript Documentation](https://fastify.dev/docs/latest/Reference/TypeScript/)
- [Prisma TypeScript Documentation](https://www.prisma.io/docs/concepts/overview/what-is-prisma)
- [Jest with TypeScript](https://jestjs.io/docs/getting-started#using-typescript)

Happy learning! 🚀
