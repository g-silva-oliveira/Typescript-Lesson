# TypeScript Learning Project - Hobbies CRUD API

A comprehensive TypeScript educational project featuring a RESTful API for managing hobbies, built with Fastify and Prisma. This project serves as a practical learning resource for TypeScript concepts ranging from basic to advanced.

## 🎯 Learning Objectives

- **TypeScript Fundamentals**: Interfaces, types, generics, and type safety
- **Backend Development**: RESTful API design with Fastify
- **Database Operations**: Prisma ORM with SQLite
- **Testing**: Jest testing framework with TypeScript
- **Type System Mastery**: Advanced TypeScript features and patterns

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone and enter the project
cd typescript_2025

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Set up the database and run migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed

# Start development server
npm run dev
```

> **Note**: The `npm run dev` command runs the homework server implementation. To run the complete reference implementation, you can start the server with `tsx src/answers/server.ts` after completing the homework exercises.

## 📁 Project Structure

```
typescript_2025/
├── src/
│   ├── index.ts                  # Main application entry point
│   ├── repository.ts             # Database operations with Prisma
│   ├── types-homework.ts         # Student practice file (fix the types!)
│   ├── server-homework.ts        # Server implementation practice
│   └── answers/                  # Complete reference implementations
│       ├── types.ts              # Complete TypeScript type definitions
│       └── server.ts             # Fastify server with full typing
├── tests/
│   ├── basic-typescript.test.ts       # 17 tests for TypeScript basics
│   ├── intermediate-typescript.test.ts # 20 tests for advanced concepts
│   ├── homework-type-validation.test.ts # Homework validation system
│   └── type-validation.test.ts         # Additional type validation tests
├── prisma/
│   ├── schema.prisma             # Database schema definition
│   ├── seed.ts                   # Sample data for development
│   └── migrations/               # Database migration files
├── HOMEWORK-VALIDATION.md        # Homework validation guide
└── package.json                  # Project dependencies and scripts
```

## 🏗️ API Endpoints

The hobbies API provides full CRUD operations:

### Hobbies
- `GET /hobbies` - List hobbies with pagination and filters
- `GET /hobbies/:id` - Get hobby by ID
- `POST /hobbies` - Create new hobby
- `PUT /hobbies/:id` - Update hobby
- `DELETE /hobbies/:id` - Delete hobby

### Categories
- `GET /categories` - List all hobby categories

### Difficulties
- `GET /difficulties` - List all difficulty levels

## 🧪 Testing & Learning

### Run All Tests
```bash
npm test                    # All tests (37 total)
npm run test:basic         # Basic TypeScript concepts (17 tests)
npm run test:intermediate  # Advanced TypeScript concepts (20 tests)
npm run test:homework      # Validate homework implementations
```

### Test Coverage
- **Basic TypeScript** (17 tests): Primitive types, interfaces, functions, type assertions
- **Intermediate TypeScript** (20 tests): Generics, unions, intersections, utility types, conditional types

## 📝 Homework System

This project includes a unique homework validation system that uses TypeScript's compiler to provide real-time feedback.

### How to Complete Homework

1. **Fix Type Definitions** (`src/types-homework.ts`):
   - Replace all `any` types with proper TypeScript types
   - Implement interfaces, generics, and utility types

2. **Implement Server Types** (`src/server-homework.ts`):
   - Add proper Fastify typing
   - Fix route handlers and middleware

3. **Validate Your Work**:
   ```bash
   npm run test:homework
   ```

4. **Understand Errors**: The TypeScript compiler will show you exactly what needs to be fixed

### Homework Validation Features

- **Real-time Feedback**: Immediate TypeScript compiler errors
- **Comprehensive Coverage**: All major TypeScript concepts
- **Progressive Learning**: Errors guide you step-by-step
- **Type Safety**: Ensures your implementations are type-safe

## 🎓 Learning Path

### Beginner (Start Here)
1. Run basic tests: `npm run test:basic`
2. Study `src/answers/types.ts` for reference implementations
3. Complete `src/types-homework.ts`

### Intermediate
1. Run intermediate tests: `npm run test:intermediate`
2. Study advanced patterns in the codebase
3. Complete `src/server-homework.ts`

### Advanced
1. Implement your own features
2. Add new test cases
3. Explore the validation system internals

## 🛠️ Development Commands

```bash
# Development
npm run dev                 # Start development server with hot reload
npm run build              # Build for production
npm run start              # Start production server

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run prisma:seed        # Seed database with sample data
npm run prisma:studio      # Open Prisma Studio (visual database editor)

# Testing & Validation
npm test                   # Run all tests
npm run test:basic         # Run basic TypeScript tests
npm run test:intermediate  # Run intermediate TypeScript tests
npm run test:homework      # Validate homework type implementations
npm run check:homework     # Alias for homework validation
```

## � Database Schema

### Hobby
- `id`: Unique identifier
- `name`: Hobby name
- `description`: Detailed description (optional)
- `category`: Category (SPORTS, ARTS, TECHNOLOGY, etc.)
- `difficulty`: Difficulty level (BEGINNER, INTERMEDIATE, ADVANCED)
- `isActive`: Active status
- `tags`: Array of tags
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🎯 Key TypeScript Concepts Covered

### Basic Concepts
- Primitive types (`string`, `number`, `boolean`)
- Arrays and tuples
- Interfaces and type aliases
- Optional and readonly properties
- Function types and overloads
- Union and intersection types

### Advanced Concepts
- Generic types and constraints
- Conditional types
- Mapped types
- Template literal types
- Type guards and type predicates
- Utility types (`Pick`, `Omit`, `Partial`, etc.)
- Advanced type manipulation

## 🤝 Contributing

This is an educational project designed for learning TypeScript. Feel free to:

- Add more test cases
- Implement additional features
- Improve the homework validation system
- Create additional learning exercises

## 📖 Additional Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [Fastify Documentation](https://www.fastify.io/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

## 📄 License

This project is created for educational purposes. Feel free to use it for learning and teaching TypeScript concepts.

---

**Happy Learning! 🚀**

Start with `npm run test:basic` and work your way through the concepts. Use `npm run test:homework` to validate your implementations and get immediate feedback on your TypeScript skills.
