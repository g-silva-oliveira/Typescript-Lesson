/**
 * INTERMEDIATE TYPESCRIPT CONCEPTS TEST FILE
 * 
 * This file covers advanced TypeScript concepts:
 * 1. Generics
 * 2. Union | and Intersection & Types
 * 3. Type Guards
 * 4. Type Utilities
 * 5. Conditional Types
 * 6. Mapped Types
 */

describe('Intermediate TypeScript Concepts', () => {

  // 1. GENERICS
  describe('1. Generics', () => {
    
    test('should demonstrate basic generics', () => {
      // Generic function
      function identity<T>(arg: T): T {
        return arg;
      }
      
      // Generic interface
      interface ApiResponse<T> {
        success: boolean;
        data: T;
        message?: string;
      }
      
      // Generic class
      class Repository<T> {
        private items: T[] = [];
        
        add(item: T): void {
          this.items.push(item);
        }
        
        getAll(): T[] {
          return [...this.items];
        }
        
        findById<K extends keyof T>(key: K, value: T[K]): T | undefined {
          return this.items.find(item => item[key] === value);
        }
      }
      
      const stringResult = identity("Hello Generics");
      const numberResult = identity(42);
      
      const hobbyResponse: ApiResponse<{ name: string; category: string }> = {
        success: true,
        data: { name: "Photography", category: "arts" },
        message: "Hobby retrieved successfully"
      };
      
      const hobbyRepo = new Repository<{ id: number; name: string; category: string }>();
      hobbyRepo.add({ id: 1, name: "Chess", category: "indoor" });
      hobbyRepo.add({ id: 2, name: "Swimming", category: "sports" });
      
      expect(stringResult).toBe("Hello Generics");
      expect(numberResult).toBe(42);
      expect(hobbyResponse.data.name).toBe("Photography");
      expect(hobbyRepo.getAll().length).toBe(2);
      expect(hobbyRepo.findById("name", "Chess")).toEqual({ id: 1, name: "Chess", category: "indoor" });
    });

    test('should work with generic constraints', () => {
      // Generic constraint using extends
      interface Identifiable {
        id: number;
      }
      
      function updateEntity<T extends Identifiable>(entity: T, updates: Partial<T>): T {
        return { ...entity, ...updates };
      }
      
      // Generic constraint with keyof
      function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
      }
      
      const hobby = { id: 1, name: "Photography", category: "arts", difficulty: "intermediate" };
      const updatedHobby = updateEntity(hobby, { difficulty: "advanced" });
      const hobbyName = getProperty(hobby, "name");
      const hobbyId = getProperty(hobby, "id");
      
      expect(updatedHobby.difficulty).toBe("advanced");
      expect(updatedHobby.name).toBe("Photography");
      expect(hobbyName).toBe("Photography");
      expect(hobbyId).toBe(1);
    });

    test('should demonstrate multiple generic parameters', () => {
      // Multiple generic parameters
      interface Pair<T, U> {
        first: T;
        second: U;
      }
      
      function createPair<T, U>(first: T, second: U): Pair<T, U> {
        return { first, second };
      }
      
      // Generic with default type parameter
      interface Container<T = string> {
        value: T;
        metadata?: Record<string, any>;
      }
      
      const stringNumberPair = createPair("hobby", 42);
      const hobbyBooleanPair = createPair({ name: "Chess" }, true);
      
      const defaultContainer: Container = { value: "default string" };
      const numberContainer: Container<number> = { value: 100 };
      
      expect(stringNumberPair.first).toBe("hobby");
      expect(stringNumberPair.second).toBe(42);
      expect(hobbyBooleanPair.first.name).toBe("Chess");
      expect(hobbyBooleanPair.second).toBe(true);
      expect(defaultContainer.value).toBe("default string");
      expect(numberContainer.value).toBe(100);
    });
  });

  // 2. UNION AND INTERSECTION TYPES
  describe('2. Union | and Intersection & Types', () => {
    
    test('should demonstrate union types', () => {
      // Basic union types
      type Status = "active" | "inactive" | "pending";
      type ID = string | number;
      
      // Union with different object types
      type DatabaseUser = {
        type: "database";
        connectionString: string;
        username: string;
      };
      
      type ApiUser = {
        type: "api";
        endpoint: string;
        apiKey: string;
      };
      
      type User = DatabaseUser | ApiUser;
      
      function processUser(user: User): string {
        // Discriminated union using type property
        switch (user.type) {
          case "database":
            return `Database user: ${user.username}`;
          case "api":
            return `API user with endpoint: ${user.endpoint}`;
          default:
            // TypeScript ensures exhaustive checking
            const _exhaustive: never = user;
            return _exhaustive;
        }
      }
      
      const status: Status = "active";
      const id1: ID = "hobby-123";
      const id2: ID = 456;
      
      const dbUser: DatabaseUser = {
        type: "database",
        connectionString: "postgres://localhost",
        username: "admin"
      };
      
      const apiUser: ApiUser = {
        type: "api",
        endpoint: "https://api.example.com",
        apiKey: "secret-key"
      };
      
      expect(status).toBe("active");
      expect(id1).toBe("hobby-123");
      expect(id2).toBe(456);
      expect(processUser(dbUser)).toBe("Database user: admin");
      expect(processUser(apiUser)).toBe("API user with endpoint: https://api.example.com");
    });

    test('should demonstrate intersection types', () => {
      // Basic intersection types
      interface Timestamped {
        createdAt: Date;
        updatedAt: Date;
      }
      
      interface Identifiable {
        id: number;
      }
      
      interface Hobby {
        name: string;
        category: string;
        difficulty: string;
      }
      
      // Intersection creates a type with all properties
      type HobbyEntity = Hobby & Identifiable & Timestamped;
      
      // Intersection with function types
      type Logger = {
        log: (message: string) => void;
      };
      
      type ErrorHandler = {
        handleError: (error: Error) => void;
      };
      
      type Service = Logger & ErrorHandler & {
        name: string;
        version: string;
      };
      
      const completeHobby: HobbyEntity = {
        id: 1,
        name: "Photography",
        category: "arts",
        difficulty: "intermediate",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02")
      };
      
      const service: Service = {
        name: "HobbyService",
        version: "1.0.0",
        log: (message: string) => console.log(message),
        handleError: (error: Error) => console.error(error)
      };
      
      expect(completeHobby.id).toBe(1);
      expect(completeHobby.name).toBe("Photography");
      expect(completeHobby.createdAt).toBeInstanceOf(Date);
      expect(service.name).toBe("HobbyService");
      expect(typeof service.log).toBe("function");
      expect(typeof service.handleError).toBe("function");
    });

    test('should handle complex union and intersection combinations', () => {
      // Complex combinations
      interface BaseEvent {
        id: string;
        timestamp: Date;
      }
      
      interface UserEvent extends BaseEvent {
        type: "user";
        userId: string;
      }
      
      interface SystemEvent extends BaseEvent {
        type: "system";
        component: string;
      }
      
      interface HobbyEvent extends BaseEvent {
        type: "hobby";
        hobbyId: number;
        action: "created" | "updated" | "deleted";
      }
      
      type Event = UserEvent | SystemEvent | HobbyEvent;
      type EventWithMetadata = Event & { metadata: Record<string, any> };
      
      function processEvent(event: EventWithMetadata): string {
        const baseInfo = `${event.type} event at ${event.timestamp.toISOString()}`;
        
        switch (event.type) {
          case "user":
            return `${baseInfo} for user ${event.userId}`;
          case "system":
            return `${baseInfo} from ${event.component}`;
          case "hobby":
            return `${baseInfo} - hobby ${event.hobbyId} was ${event.action}`;
        }
      }
      
      const hobbyEvent: EventWithMetadata = {
        id: "evt-123",
        type: "hobby",
        timestamp: new Date(),
        hobbyId: 1,
        action: "created",
        metadata: { source: "api", version: "v1" }
      };
      
      const result = processEvent(hobbyEvent);
      expect(result).toContain("hobby event");
      expect(result).toContain("hobby 1 was created");
    });
  });

  // 3. TYPE GUARDS
  describe('3. Type Guards', () => {
    
    test('should demonstrate built-in type guards', () => {
      function processValue(value: string | number | boolean | null | undefined): string {
        // typeof type guard
        if (typeof value === "string") {
          return `String: ${value.toUpperCase()}`;
        }
        
        if (typeof value === "number") {
          return `Number: ${value.toFixed(2)}`;
        }
        
        if (typeof value === "boolean") {
          return `Boolean: ${value ? "true" : "false"}`;
        }
        
        // null check
        if (value === null) {
          return "Null value";
        }
        
        // undefined check
        if (value === undefined) {
          return "Undefined value";
        }
        
        // This should never be reached due to exhaustive checking
        const _exhaustive: never = value;
        return _exhaustive;
      }
      
      expect(processValue("hello")).toBe("String: HELLO");
      expect(processValue(3.14159)).toBe("Number: 3.14");
      expect(processValue(true)).toBe("Boolean: true");
      expect(processValue(null)).toBe("Null value");
      expect(processValue(undefined)).toBe("Undefined value");
    });

    test('should demonstrate custom type guards', () => {
      interface Hobby {
        id: number;
        name: string;
        category: string;
      }
      
      interface User {
        id: number;
        username: string;
        email: string;
      }
      
      // Custom type guard functions
      function isHobby(obj: any): obj is Hobby {
        return obj && 
               typeof obj.id === "number" &&
               typeof obj.name === "string" &&
               typeof obj.category === "string" &&
               !obj.username &&
               !obj.email;
      }
      
      function isUser(obj: any): obj is User {
        return obj && 
               typeof obj.id === "number" &&
               typeof obj.username === "string" &&
               typeof obj.email === "string";
      }
      
      function isStringArray(arr: any): arr is string[] {
        return Array.isArray(arr) && arr.every(item => typeof item === "string");
      }
      
      // Using type guards
      function processEntity(entity: unknown): string {
        if (isHobby(entity)) {
          return `Hobby: ${entity.name} in ${entity.category}`;
        }
        
        if (isUser(entity)) {
          return `User: ${entity.username} (${entity.email})`;
        }
        
        return "Unknown entity type";
      }
      
      const hobbyData = { id: 1, name: "Photography", category: "arts" };
      const userData = { id: 2, username: "john", email: "john@example.com" };
      const invalidData = { id: 3, type: "invalid" };
      const stringData = ["hello", "world", "typescript"];
      const mixedData = ["hello", 42, "world"];
      
      expect(isHobby(hobbyData)).toBe(true);
      expect(isUser(userData)).toBe(true);
      expect(isHobby(userData)).toBe(false);
      expect(isUser(hobbyData)).toBe(false);
      expect(isStringArray(stringData)).toBe(true);
      expect(isStringArray(mixedData)).toBe(false);
      
      expect(processEntity(hobbyData)).toBe("Hobby: Photography in arts");
      expect(processEntity(userData)).toBe("User: john (john@example.com)");
      expect(processEntity(invalidData)).toBe("Unknown entity type");
    });

    test('should demonstrate "in" operator type guard', () => {
      interface Rectangle {
        type: "rectangle";
        width: number;
        height: number;
      }
      
      interface Circle {
        type: "circle";
        radius: number;
      }
      
      type Shape = Rectangle | Circle;
      
      function calculateArea(shape: Shape): number {
        // Using "in" operator as type guard
        if ("width" in shape && "height" in shape) {
          return shape.width * shape.height;
        }
        
        if ("radius" in shape) {
          return Math.PI * shape.radius ** 2;
        }
        
        // This should never be reached
        const _exhaustive: never = shape;
        return _exhaustive;
      }
      
      // Alternative using discriminated union
      function calculateAreaDiscriminated(shape: Shape): number {
        switch (shape.type) {
          case "rectangle":
            return shape.width * shape.height;
          case "circle":
            return Math.PI * shape.radius ** 2;
          default:
            const _exhaustive: never = shape;
            return _exhaustive;
        }
      }
      
      const rectangle: Rectangle = { type: "rectangle", width: 5, height: 3 };
      const circle: Circle = { type: "circle", radius: 4 };
      
      expect(calculateArea(rectangle)).toBe(15);
      expect(calculateArea(circle)).toBeCloseTo(Math.PI * 16, 2);
      expect(calculateAreaDiscriminated(rectangle)).toBe(15);
      expect(calculateAreaDiscriminated(circle)).toBeCloseTo(Math.PI * 16, 2);
    });
  });

  // 4. TYPE UTILITIES
  describe('4. Type Utilities', () => {
    
    interface FullHobby {
      id: number;
      name: string;
      description: string;
      category: string;
      difficulty: "beginner" | "intermediate" | "advanced";
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    }

    test('should demonstrate basic utility types', () => {
      // Partial - makes all properties optional
      type PartialHobby = Partial<FullHobby>;
      
      // Required - makes all properties required
      type RequiredHobby = Required<PartialHobby>;
      
      // Pick - selects specific properties
      type HobbySummary = Pick<FullHobby, "id" | "name" | "category">;
      
      // Omit - excludes specific properties
      type CreateHobbyInput = Omit<FullHobby, "id" | "createdAt" | "updatedAt">;
      
      const partialUpdate: PartialHobby = {
        name: "Updated Photography"
      };
      
      const summary: HobbySummary = {
        id: 1,
        name: "Photography",
        category: "arts"
      };
      
      const createInput: CreateHobbyInput = {
        name: "New Hobby",
        description: "A great hobby",
        category: "sports",
        difficulty: "beginner",
        isActive: true
      };
      
      expect(partialUpdate.name).toBe("Updated Photography");
      expect(summary.id).toBe(1);
      expect(createInput.name).toBe("New Hobby");
      expect(createInput.difficulty).toBe("beginner");
    });

    test('should demonstrate record and exclude/extract', () => {
      // Record - creates object type with specific keys and values
      type HobbyCategories = Record<string, string[]>;
      type DifficultyLevels = Record<"beginner" | "intermediate" | "advanced", number>;
      
      // Exclude - removes types from union
      type NonAdvancedDifficulty = Exclude<"beginner" | "intermediate" | "advanced", "advanced">;
      
      // Extract - keeps only specified types from union
      type EasyDifficulties = Extract<"beginner" | "intermediate" | "advanced", "beginner" | "intermediate">;
      
      const categories: HobbyCategories = {
        sports: ["swimming", "running", "cycling"],
        arts: ["photography", "painting", "sculpture"],
        technology: ["programming", "3d-printing", "robotics"]
      };
      
      const levels: DifficultyLevels = {
        beginner: 1,
        intermediate: 5,
        advanced: 10
      };
      
      const easyLevel: NonAdvancedDifficulty = "beginner";
      const simpleLevel: EasyDifficulties = "intermediate";
      
      expect(categories.sports?.length).toBe(3);
      expect(levels.intermediate).toBe(5);
      expect(easyLevel).toBe("beginner");
      expect(simpleLevel).toBe("intermediate");
    });

    test('should demonstrate readonly and non-nullable', () => {
      // Readonly - makes properties immutable
      type ReadonlyHobby = Readonly<FullHobby>;
      
      // NonNullable - removes null and undefined
      type NonNullString = NonNullable<string | null | undefined>;
      
      const immutableHobby: ReadonlyHobby = {
        id: 1,
        name: "Photography",
        description: "Taking pictures",
        category: "arts",
        difficulty: "intermediate",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // This would cause a TypeScript error:
      // immutableHobby.name = "New name"; // Error: Cannot assign to 'name' because it is a read-only property
      
      const validString: NonNullString = "hello";
      // These would cause TypeScript errors:
      // const invalidString1: NonNullString = null; // Error
      // const invalidString2: NonNullString = undefined; // Error
      
      expect(immutableHobby.name).toBe("Photography");
      expect(validString).toBe("hello");
    });
  });

  // 5. CONDITIONAL TYPES
  describe('5. Conditional Types', () => {
    
    test('should demonstrate basic conditional types', () => {
      // Basic conditional type syntax: T extends U ? X : Y
      type IsString<T> = T extends string ? true : false;
      type IsArray<T> = T extends any[] ? true : false;
      
      // More complex conditional type
      type ApiResponse<T> = T extends string 
        ? { message: T; success: true }
        : T extends Error 
        ? { error: T; success: false }
        : { data: T; success: true };
      
      type StringTest = IsString<string>; // true
      type NumberTest = IsString<number>; // false
      type ArrayTest = IsArray<number[]>; // true
      type ObjectTest = IsArray<object>; // false
      
      const stringResponse: ApiResponse<string> = {
        message: "Success",
        success: true
      };
      
      const errorResponse: ApiResponse<Error> = {
        error: new Error("Something went wrong"),
        success: false
      };
      
      const dataResponse: ApiResponse<{ name: string }> = {
        data: { name: "Photography" },
        success: true
      };
      
      expect(stringResponse.message).toBe("Success");
      expect(errorResponse.success).toBe(false);
      expect(dataResponse.data.name).toBe("Photography");
    });

    test('should demonstrate conditional types with keyof', () => {
      // Extract function property names
      type FunctionPropertyNames<T> = {
        [K in keyof T]: T[K] extends Function ? K : never;
      }[keyof T];
      
      // Extract non-function property names
      type NonFunctionPropertyNames<T> = {
        [K in keyof T]: T[K] extends Function ? never : K;
      }[keyof T];
      
      interface HobbyService {
        name: string;
        version: number;
        isActive: boolean;
        getName(): string;
        setActive(active: boolean): void;
        calculate(x: number, y: number): number;
      }
      
      type ServiceMethods = FunctionPropertyNames<HobbyService>; // "getName" | "setActive" | "calculate"
      type ServiceProperties = NonFunctionPropertyNames<HobbyService>; // "name" | "version" | "isActive"
      
      // We can't directly test these types, but we can use them
      const methodName: ServiceMethods = "getName";
      const propertyName: ServiceProperties = "name";
      
      expect(methodName).toBe("getName");
      expect(propertyName).toBe("name");
    });

    test('should demonstrate distributive conditional types', () => {
      // Distributive conditional types work with union types
      type ToArray<T> = T extends any ? T[] : never;
      type StringOrNumberArray = ToArray<string | number>; // string[] | number[]
      
      // Non-distributive version using brackets
      type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;
      type UnionArray = ToArrayNonDistributive<string | number>; // (string | number)[]
      
      // Exclude null and undefined
      type NonNullable<T> = T extends null | undefined ? never : T;
      type CleanType = NonNullable<string | number | null | undefined>; // string | number
      
      const stringArray: string[] = ["hello", "world"];
      const numberArray: number[] = [1, 2, 3];
      const mixedArray: (string | number)[] = ["hello", 42];
      
      expect(stringArray.length).toBe(2);
      expect(numberArray.length).toBe(3);
      expect(mixedArray.length).toBe(2);
    });

    test('should demonstrate infer keyword in conditional types', () => {
      // Extract return type of function
      type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
      
      // Extract array element type
      type ElementType<T> = T extends (infer U)[] ? U : never;
      
      // Extract promise resolved type
      type PromiseType<T> = T extends Promise<infer U> ? U : never;
      
      function getHobbyName(): string {
        return "Photography";
      }
      
      async function fetchHobby(): Promise<{ id: number; name: string }> {
        return { id: 1, name: "Photography" };
      }
      
      type GetHobbyNameReturn = ReturnType<typeof getHobbyName>; // string
      type HobbyArrayElement = ElementType<{ id: number; name: string }[]>; // { id: number; name: string }
      type FetchHobbyReturn = PromiseType<ReturnType<typeof fetchHobby>>; // { id: number; name: string }
      
      const hobbyName: GetHobbyNameReturn = "Chess";
      const hobby: HobbyArrayElement = { id: 1, name: "Photography" };
      const fetchedHobby: FetchHobbyReturn = { id: 2, name: "Swimming" };
      
      expect(hobbyName).toBe("Chess");
      expect(hobby.id).toBe(1);
      expect(fetchedHobby.name).toBe("Swimming");
    });
  });

  // 6. MAPPED TYPES
  describe('6. Mapped Types', () => {
    
    interface Hobby {
      id: number;
      name: string;
      category: string;
      difficulty: "beginner" | "intermediate" | "advanced";
      isActive: boolean;
    }

    test('should demonstrate basic mapped types', () => {
      // Make all properties optional
      type OptionalHobby = {
        [K in keyof Hobby]?: Hobby[K];
      };
      
      // Make all properties readonly
      type ReadonlyHobby = {
        readonly [K in keyof Hobby]: Hobby[K];
      };
      
      // Make all properties nullable
      type NullableHobby = {
        [K in keyof Hobby]: Hobby[K] | null;
      };
      
      const partialHobby: OptionalHobby = {
        name: "Photography"
      };
      
      const readonlyHobby: ReadonlyHobby = {
        id: 1,
        name: "Chess",
        category: "indoor",
        difficulty: "advanced",
        isActive: true
      };
      
      const nullableHobby: NullableHobby = {
        id: 1,
        name: "Swimming",
        category: null,
        difficulty: "beginner",
        isActive: true
      };
      
      expect(partialHobby.name).toBe("Photography");
      expect(readonlyHobby.name).toBe("Chess");
      expect(nullableHobby.category).toBeNull();
    });

    test('should demonstrate mapped types with key remapping', () => {
      // Key remapping with template literal types
      type Getters<T> = {
        [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
      };
      
      type Setters<T> = {
        [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
      };
      
      // Combine getters and setters
      type GettersAndSetters<T> = Getters<T> & Setters<T>;
      
      type HobbyAccessors = GettersAndSetters<Pick<Hobby, "name" | "category">>;
      
      const hobbyAccessors: HobbyAccessors = {
        getName: () => "Photography",
        getCategory: () => "arts",
        setName: (value: string) => console.log(`Setting name to ${value}`),
        setCategory: (value: string) => console.log(`Setting category to ${value}`)
      };
      
      expect(hobbyAccessors.getName()).toBe("Photography");
      expect(hobbyAccessors.getCategory()).toBe("arts");
      expect(typeof hobbyAccessors.setName).toBe("function");
      expect(typeof hobbyAccessors.setCategory).toBe("function");
    });

    test('should demonstrate conditional mapped types', () => {
      // Extract only string properties
      type StringProperties<T> = {
        [K in keyof T]: T[K] extends string ? K : never;
      }[keyof T];
      
      // Create type with only string properties
      type StringOnly<T> = Pick<T, StringProperties<T>>;
      
      // Convert all properties to strings
      type Stringify<T> = {
        [K in keyof T]: string;
      };
      
      // Make properties optional if they extend certain type
      type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
      
      type HobbyStringFields = StringProperties<Hobby>; // "name" | "category" | "difficulty"
      type HobbyStringsOnly = StringOnly<Hobby>; // { name: string; category: string; difficulty: "beginner" | "intermediate" | "advanced" }
      type HobbyStringified = Stringify<Hobby>; // All properties are strings
      type HobbyPartialName = PartialBy<Hobby, "name" | "category">; // name and category are optional
      
      const stringOnlyHobby: HobbyStringsOnly = {
        name: "Photography",
        category: "arts",
        difficulty: "intermediate"
      };
      
      const stringifiedHobby: HobbyStringified = {
        id: "1",
        name: "Chess",
        category: "indoor",
        difficulty: "advanced",
        isActive: "true"
      };
      
      const partialHobby: HobbyPartialName = {
        id: 1,
        difficulty: "beginner",
        isActive: true
        // name and category are optional
      };
      
      expect(stringOnlyHobby.name).toBe("Photography");
      expect(stringifiedHobby.id).toBe("1");
      expect(partialHobby.id).toBe(1);
      expect(partialHobby.name).toBeUndefined();
    });

    test('should demonstrate advanced mapped type patterns', () => {
      // Deep readonly
      type DeepReadonly<T> = {
        readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
      };
      
      // Proxy type that wraps all methods
      type Proxify<T> = {
        [K in keyof T]: T[K] extends (...args: infer A) => infer R 
          ? (...args: A) => Promise<R>
          : T[K];
      };
      
      interface NestedHobby {
        id: number;
        name: string;
        metadata: {
          tags: string[];
          settings: {
            difficulty: string;
            public: boolean;
          };
        };
      }
      
      interface HobbyService {
        getName(): string;
        setName(name: string): void;
        isActive: boolean;
      }
      
      const deepReadonlyHobby: DeepReadonly<NestedHobby> = {
        id: 1,
        name: "Photography",
        metadata: {
          tags: ["creative", "outdoor"],
          settings: {
            difficulty: "intermediate",
            public: true
          }
        }
      };
      
      const proxifiedService: Proxify<HobbyService> = {
        getName: async () => "Photography",
        setName: async (name: string) => undefined,
        isActive: true
      };
      
      expect(deepReadonlyHobby.name).toBe("Photography");
      expect(deepReadonlyHobby.metadata.tags.length).toBe(2);
      expect(typeof proxifiedService.getName).toBe("function");
      expect(proxifiedService.isActive).toBe(true);
      
      // Verify the async nature
      expect(proxifiedService.getName()).toBeInstanceOf(Promise);
    });
  });
});
