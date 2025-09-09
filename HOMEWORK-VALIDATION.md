# TypeScript Homework Validation Guide

This guide explains how to test and validate your TypeScript homework using the type-checking system.

## 🎯 Purpose

The homework validation system uses TypeScript's compiler to check if your type definitions are correct. Instead of runtime tests, we use **compile-time type checking** to validate your work.

## ✅ How to Test Your Homework

### Method 1: Quick Type Check
```bash
npm run test:homework
```

### Method 2: Alternative Command
```bash
npm run check:homework
```

### Method 3: Direct TypeScript Check
```bash
npx tsc --project tsconfig.homework.json --noEmit
```

## 📋 What Gets Tested

The validation tests check these TypeScript concepts:

### 1. **Basic Types & Interfaces**
- ✅ `Hobby` interface with correct property types
- ✅ `CreateHobbyInput` interface 
- ✅ Union types for `difficulty` and `category`
- ✅ Optional vs required properties

### 2. **Generic Types**
- ✅ `ApiResponse<T>` - Generic response interface
- ✅ `PaginatedResponse<T>` - Generic pagination interface
- ✅ `Repository<T>` - Generic repository interface
- ✅ `HobbyTransformer<T>` - Generic function type

### 3. **Advanced Type Features**
- ✅ Mapped types (`HobbyKeys`, `OptionalHobby`)
- ✅ Conditional types (`NonNullable<T>`)
- ✅ Intersection types (`HobbyWithStats`)
- ✅ Function types (`HobbyValidator`)
- ✅ Type guards with proper return types

## 🚨 Understanding Error Messages

When you run the homework test, you'll see TypeScript compilation errors. These errors tell you exactly what needs to be fixed:

### Example Error Messages:

**1. Generic Type Missing:**
```
Type 'ApiResponse' is not generic.
```
**Fix:** Make ApiResponse generic: `interface ApiResponse<T>`

**2. Property Type Mismatch:**
```
Property 'difficulty' has type 'any' but expected 'HobbyDifficulty'
```
**Fix:** Use proper union type: `difficulty: "beginner" | "intermediate" | "advanced"`

**3. Missing Optional Property:**
```
Property 'description' is optional in type 'CreateHobbyInput' but required in type 'CreateHobbyInput'
```
**Fix:** Make property optional: `description?: string`

## 📝 Homework Files to Complete

### 1. Types Homework: `src/types-homework.ts`
Complete these type definitions:
- [ ] `HobbyDifficulty` union type
- [ ] `HobbyCategory` union type  
- [ ] `Hobby` interface
- [ ] `CreateHobbyInput` interface
- [ ] `ApiResponse<T>` generic interface
- [ ] `PaginatedResponse<T>` generic interface
- [ ] `HobbyQueryParams` interface
- [ ] `Repository<T>` generic interface
- [ ] `HobbyValidator` function type
- [ ] `HobbyTransformer<T>` generic function type
- [ ] Type guards with proper return types
- [ ] Mapped types and conditional types

### 2. Server Homework: `src/server-homework.ts`
Complete these Fastify-related types:
- [ ] Import proper Fastify types
- [ ] Request interface types
- [ ] Route handler types with generics
- [ ] Error handling types
- [ ] Method return types

## 🎉 Success Indicators

### ✅ Homework is Complete When:
1. `npm run test:homework` runs without any TypeScript errors
2. All type compatibility tests pass
3. Generic types work with different type parameters
4. Optional properties are correctly marked
5. Union types restrict values appropriately

### ❌ Common Issues to Fix:
- Using `any` instead of specific types
- Missing generic type parameters (`<T>`)
- Incorrect optional property markers (`?`)
- Wrong union type definitions
- Missing or incorrect function signatures

## 🔍 Step-by-Step Debugging

1. **Run the test:**
   ```bash
   npm run test:homework
   ```

2. **Read the first error message carefully**
   - Note the file name and line number
   - Understand what type is expected vs what was found

3. **Fix one error at a time**
   - Start with the first error in the list
   - Make the minimal change needed
   - Re-run the test

4. **Repeat until no errors remain**

## 📚 Reference Files

If you get stuck, check the correct implementations in:
- `src/answers/types.ts` - Correct type definitions
- `src/answers/server.ts` - Correct server types

**Note:** Use these as reference only after attempting the homework yourself!

## 🏆 Final Validation

When your homework is complete:
1. ✅ `npm run test:homework` shows no errors
2. ✅ `npm run build` compiles successfully  
3. ✅ `npm test` runs all learning tests successfully
4. ✅ Types work correctly in practical usage scenarios

## 💡 Pro Tips

1. **Start Simple:** Fix basic interface properties first, then move to generics
2. **One Error at a Time:** Don't try to fix everything at once
3. **Read Error Messages:** TypeScript errors are usually very specific about what's wrong
4. **Use IDE Help:** VS Code will show you type errors in real-time
5. **Check Examples:** Look at the test file to see how types should be used

Good luck with your TypeScript homework! 🚀
