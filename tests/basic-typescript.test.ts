/**
 * BASIC TYPESCRIPT CONCEPTS TEST FILE
 * 
 * This file covers fundamental TypeScript concepts:
 * 1. Primitive Types
 * 2. Type Inference and Explicit Typing
 * 3. Interfaces and Types
 * 4. Type Assertion ("as") and "satisfies" operator
 * 5. Typed Functions
 * 6. any vs unknown dilemma
 */

describe('Basic TypeScript Concepts', () => {
  
  // 1. PRIMITIVE TYPES
  describe('1. Primitive Types', () => {
    
    test('should demonstrate basic primitive types', () => {
      // String type
      const hobbyName: string = "Photography";
      const description: string = `${hobbyName} is a great hobby for creativity`;
      
      // Number type
      const difficultyLevel: number = 5;
      const price: number = 299.99;
      
      // Boolean type
      const isActive: boolean = true;
      const isCompleted: boolean = false;
      
      // Null and undefined
      const optionalField: string | null = null;
      const undefinedValue: undefined = undefined;
      
      expect(typeof hobbyName).toBe('string');
      expect(typeof difficultyLevel).toBe('number');
      expect(typeof isActive).toBe('boolean');
      expect(optionalField).toBeNull();
      expect(undefinedValue).toBeUndefined();
    });

    test('should work with arrays and their types', () => {
      // Array of strings
      const categories: string[] = ["sports", "arts", "technology"];
      
      // Array using generic syntax
      const ratings: Array<number> = [4.5, 3.8, 5.0, 2.1];
      
      // Mixed types using union
      const mixedData: (string | number)[] = ["hobby", 42, "easy", 100];
      
      expect(categories.length).toBe(3);
      expect(ratings.every(rating => typeof rating === 'number')).toBe(true);
      expect(mixedData).toContain("hobby");
      expect(mixedData).toContain(42);
    });
  });

  // 2. TYPE INFERENCE AND EXPLICIT TYPING
  describe('2. Type Inference and Explicit Typing', () => {
    
    test('should demonstrate type inference', () => {
      // TypeScript infers the type automatically
      const inferredString = "TypeScript is awesome"; // inferred as string
      const inferredNumber = 42; // inferred as number
      const inferredBoolean = true; // inferred as boolean
      const inferredArray = [1, 2, 3]; // inferred as number[]
      
      // These would cause TypeScript compile errors if uncommented:
      // inferredString = 123; // Error: Type 'number' is not assignable to type 'string'
      // inferredNumber = "text"; // Error: Type 'string' is not assignable to type 'number'
      
      expect(typeof inferredString).toBe('string');
      expect(typeof inferredNumber).toBe('number');
      expect(typeof inferredBoolean).toBe('boolean');
      expect(Array.isArray(inferredArray)).toBe(true);
    });

    test('should demonstrate explicit typing', () => {
      // Explicit type annotations
      let explicitString: string;
      let explicitNumber: number;
      let explicitBoolean: boolean;
      
      explicitString = "Hello TypeScript";
      explicitNumber = 3.14;
      explicitBoolean = false;
      
      // Union types with explicit annotation
      let unionType: string | number = "initially string";
      unionType = 456; // Can reassign to number
      
      expect(explicitString).toBe("Hello TypeScript");
      expect(explicitNumber).toBe(3.14);
      expect(explicitBoolean).toBe(false);
      expect(unionType).toBe(456);
    });
  });

  // 3. INTERFACES AND TYPES
  describe('3. Interfaces and Types', () => {
    
    // Interface definition
    interface Hobby {
      id: number;
      name: string;
      category: string;
      difficulty: "beginner" | "intermediate" | "advanced";
      isActive?: boolean; // Optional property
      readonly createdAt: Date; // Readonly property
    }
    
    // Type alias definition
    type HobbyCategory = "sports" | "arts" | "technology" | "outdoor" | "indoor" | "creative";
    
    // Type with intersection
    type HobbyWithStats = Hobby & {
      totalHours: number;
      averageRating: number;
    };

    test('should work with interfaces', () => {
      const photography: Hobby = {
        id: 1,
        name: "Photography",
        category: "arts",
        difficulty: "intermediate",
        isActive: true,
        createdAt: new Date("2024-01-01")
      };
      
      // Optional property can be omitted
      const hiking: Hobby = {
        id: 2,
        name: "Hiking",
        category: "outdoor",
        difficulty: "beginner",
        createdAt: new Date("2024-01-02")
        // isActive is optional, so it's not required
      };
      
      expect(photography.name).toBe("Photography");
      expect(photography.difficulty).toBe("intermediate");
      expect(hiking.isActive).toBeUndefined();
    });

    test('should work with type aliases and unions', () => {
      const validCategories: HobbyCategory[] = [
        "sports", "arts", "technology", "outdoor", "indoor", "creative"
      ];
      
      const selectedCategory: HobbyCategory = "sports";
      
      expect(validCategories).toContain(selectedCategory);
      expect(validCategories.length).toBe(6);
    });

    test('should work with intersection types', () => {
      const hobbyWithStats: HobbyWithStats = {
        id: 1,
        name: "Chess",
        category: "indoor",
        difficulty: "advanced",
        createdAt: new Date(),
        totalHours: 150,
        averageRating: 4.8
      };
      
      expect(hobbyWithStats.name).toBe("Chess");
      expect(hobbyWithStats.totalHours).toBe(150);
      expect(hobbyWithStats.averageRating).toBe(4.8);
    });
  });

  // 4. TYPE ASSERTION AND SATISFIES OPERATOR
  describe('4. Type Assertion ("as") and "satisfies" operator', () => {
    
    test('should demonstrate type assertion with "as"', () => {
      // Type assertion tells TypeScript to treat a value as a specific type
      const unknownValue: unknown = "This is a string";
      const stringValue: string = unknownValue as string;
      
      // Assertion with DOM elements (common use case)
      const jsonString = '{"name": "Photography", "difficulty": "intermediate"}';
      const parsedObject = JSON.parse(jsonString) as { name: string; difficulty: string };
      
      expect(stringValue).toBe("This is a string");
      expect(parsedObject.name).toBe("Photography");
      expect(parsedObject.difficulty).toBe("intermediate");
    });

    test('should demonstrate angle bracket assertion (alternative syntax)', () => {
      const unknownData: unknown = { id: 1, name: "Gardening" };
      
      // Angle bracket syntax (less common in JSX/TSX files)
      const hobbyData = <{ id: number; name: string }>unknownData;
      
      expect(hobbyData.id).toBe(1);
      expect(hobbyData.name).toBe("Gardening");
    });

    test('should demonstrate satisfies operator', () => {
      // satisfies operator ensures type safety while preserving specific type
      interface HobbyConfig {
        name: string;
        categories: string[];
        defaultDifficulty: "beginner" | "intermediate" | "advanced";
      }
      
      // Without satisfies, TypeScript might infer broader types
      const config = {
        name: "Hobby App",
        categories: ["sports", "arts", "technology"],
        defaultDifficulty: "beginner"
      } satisfies HobbyConfig;
      
      // Now config.defaultDifficulty is specifically "beginner", not just string
      expect(config.name).toBe("Hobby App");
      expect(config.categories.length).toBe(3);
      expect(config.defaultDifficulty).toBe("beginner");
    });
  });

  // 5. TYPED FUNCTIONS
  describe('5. Typed Functions', () => {
    
    test('should demonstrate function parameter and return types', () => {
      // Function with typed parameters and return type
      function calculateDifficulty(hours: number, complexity: number): string {
        const score = hours * complexity;
        if (score < 10) return "beginner";
        if (score < 50) return "intermediate";
        return "advanced";
      }
      
      // Arrow function with types
      const formatHobbyName = (name: string, category: string): string => {
        return `${name} (${category})`;
      };
      
      // Function with optional parameters
      const createHobby = (name: string, category?: string): object => {
        return {
          name,
          category: category || "general",
          createdAt: new Date()
        };
      };
      
      expect(calculateDifficulty(2, 3)).toBe("beginner");
      expect(calculateDifficulty(10, 8)).toBe("advanced");
      expect(formatHobbyName("Chess", "indoor")).toBe("Chess (indoor)");
      
      const hobby1 = createHobby("Reading");
      const hobby2 = createHobby("Swimming", "sports");
      expect(hobby1).toHaveProperty("category", "general");
      expect(hobby2).toHaveProperty("category", "sports");
    });

    test('should work with function types and callbacks', () => {
      // Function type definition
      type HobbyValidator = (hobby: { name: string; category: string }) => boolean;
      type HobbyTransformer = (hobby: any) => { id: number; name: string };
      
      // Implementation of function types
      const isValidHobby: HobbyValidator = (hobby) => {
        return hobby.name.length > 0 && hobby.category.length > 0;
      };
      
      const transformHobby: HobbyTransformer = (hobby) => {
        return {
          id: hobby.id || Math.random(),
          name: hobby.name.toLowerCase()
        };
      };
      
      // Higher-order function
      function processHobbies(
        hobbies: any[], 
        validator: HobbyValidator, 
        transformer: HobbyTransformer
      ): { id: number; name: string }[] {
        return hobbies
          .filter(validator)
          .map(transformer);
      }
      
      const inputHobbies = [
        { name: "Photography", category: "arts" },
        { name: "", category: "sports" }, // Invalid
        { name: "Chess", category: "indoor" }
      ];
      
      const result = processHobbies(inputHobbies, isValidHobby, transformHobby);
      
      expect(result.length).toBe(2);
      expect(result[0]?.name).toBe("photography");
      expect(result[1]?.name).toBe("chess");
    });

    test('should demonstrate rest parameters and destructuring', () => {
      // Rest parameters with types
      function combineHobbies(primary: string, ...others: string[]): string {
        return [primary, ...others].join(", ");
      }
      
      // Destructuring in function parameters
      function getHobbyInfo({ name, difficulty, category }: {
        name: string;
        difficulty: string;
        category: string;
      }): string {
        return `${name} is a ${difficulty} ${category} hobby`;
      }
      
      const combined = combineHobbies("Photography", "Chess", "Reading", "Swimming");
      const info = getHobbyInfo({
        name: "Rock Climbing",
        difficulty: "advanced",
        category: "outdoor"
      });
      
      expect(combined).toBe("Photography, Chess, Reading, Swimming");
      expect(info).toBe("Rock Climbing is a advanced outdoor hobby");
    });
  });

  // 6. ANY VS UNKNOWN DILEMMA
  describe('6. any vs unknown dilemma', () => {
    
    test('should demonstrate the problems with "any"', () => {
      // any allows anything - no type safety!
      let anythingGoes: any = "Hello";
      anythingGoes = 42;
      anythingGoes = { name: "Photography" };
      anythingGoes = [1, 2, 3];
      
      // This compiles but could fail at runtime!
      // anythingGoes.nonExistentMethod(); // Would throw error at runtime
      // anythingGoes.length.toUpperCase(); // Would throw error at runtime
      
      // any disables TypeScript's type checking
      expect(anythingGoes).toEqual([1, 2, 3]);
    });

    test('should demonstrate the safety of "unknown"', () => {
      // unknown is type-safe - requires type checking before use
      let userInput: unknown = "Could be anything";
      
      // Cannot directly use unknown values
      // userInput.toUpperCase(); // Error: Object is of type 'unknown'
      
      // Must check type before using
      if (typeof userInput === "string") {
        const upperCased = userInput.toUpperCase(); // Now it's safe!
        expect(upperCased).toBe("COULD BE ANYTHING");
      }
      
      userInput = { hobby: "Photography", difficulty: "intermediate" };
      
      // Type guards for objects
      if (typeof userInput === "object" && userInput !== null) {
        // Additional checks needed for object properties
        if ("hobby" in userInput) {
          const hobbyObj = userInput as { hobby: string; difficulty: string };
          expect(hobbyObj.hobby).toBe("Photography");
        }
      }
    });

    test('should show proper type narrowing with unknown', () => {
      function processUnknownData(data: unknown): string {
        // Type narrowing with multiple checks
        if (typeof data === "string") {
          return `String: ${data}`;
        }
        
        if (typeof data === "number") {
          return `Number: ${data}`;
        }
        
        if (typeof data === "boolean") {
          return `Boolean: ${data}`;
        }
        
        if (Array.isArray(data)) {
          return `Array with ${data.length} items`;
        }
        
        if (typeof data === "object" && data !== null) {
          return `Object with keys: ${Object.keys(data).join(", ")}`;
        }
        
        return "Unknown type";
      }
      
      expect(processUnknownData("Hello")).toBe("String: Hello");
      expect(processUnknownData(42)).toBe("Number: 42");
      expect(processUnknownData(true)).toBe("Boolean: true");
      expect(processUnknownData([1, 2, 3])).toBe("Array with 3 items");
      expect(processUnknownData({ name: "Chess" })).toBe("Object with keys: name");
      expect(processUnknownData(null)).toBe("Unknown type");
    });

    test('should demonstrate when to use any vs unknown', () => {
      // Use any only when:
      // 1. Migrating from JavaScript gradually
      // 2. Working with dynamic libraries without types
      // 3. Prototyping (temporarily)
      
      // Use unknown when:
      // 1. Receiving data from external sources (APIs, user input)
      // 2. Working with JSON.parse results
      // 3. Creating generic functions that accept any type
      
      function safeJsonParse(jsonString: string): unknown {
        try {
          return JSON.parse(jsonString);
        } catch {
          return null;
        }
      }
      
      const jsonData = '{"hobby": "Photography", "rating": 4.5}';
      const parsed = safeJsonParse(jsonData);
      
      // Now we safely handle the unknown result
      if (parsed && typeof parsed === "object" && "hobby" in parsed) {
        const hobbyData = parsed as { hobby: string; rating: number };
        expect(hobbyData.hobby).toBe("Photography");
        expect(hobbyData.rating).toBe(4.5);
      }
    });
  });
});
