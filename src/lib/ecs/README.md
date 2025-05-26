# ECS Implementation for Blog Data

This directory contains the Entity Component System (ECS) implementation for handling blog data using `react-ecs`.

## Current Implementation Status

The ECS implementation is currently in a **transitional phase**:

1. All ECS components, systems, and utilities have been defined and are ready for use
2. However, due to compatibility issues with server-side components and API routes, we are temporarily using a more traditional approach in those contexts
3. The current code includes TODOs to mark where full ECS implementation will be phased in once server-side compatibility issues are resolved

## Overview

The ECS pattern divides data into three main concepts:

1. **Entities**: Lightweight objects that serve as containers for components
2. **Components**: Pure data containers attached to entities
3. **Systems**: Logic that operates on entities with specific components

## Structure

- `components.ts`: Defines the component classes and data interfaces
- `systems.ts`: Contains systems for processing and persisting data
- `utils.ts`: Helper functions for working with the ECS world
- `test.ts`: Simple test functions for verifying ECS functionality

## Usage (For Client-Side Implementation)

### Creating an ECS World

```typescript
import { createEcsWorld } from './lib/ecs';

// Create a new ECS world
const world = createEcsWorld();
```

### Working with Post Data

```typescript
import { 
  createEcsWorld, 
  addPostEntity, 
  extractPostsFromWorld,
  ecsPostToPostData 
} from './lib/ecs';

// Create a world and add posts
const world = createEcsWorld();
addPostEntity(world, postFromSupabase);

// Extract posts for use in components
const posts = extractPostsFromWorld(world);
const clientReadyPosts = posts.map(ecsPostToPostData);
```

### Working with Category Data

```typescript
import { 
  createEcsWorld, 
  addCategoryEntity, 
  extractCategoriesFromWorld 
} from './lib/ecs';

// Create a world and add categories
const world = createEcsWorld();
addCategoryEntity(world, categoryFromSupabase);

// Extract categories
const categories = extractCategoriesFromWorld(world);
```

### Persisting Data

```typescript
import { 
  createEcsWorld, 
  PostData, 
  NeedsSaveToSupabase,
  SupabasePersistenceSystem 
} from './lib/ecs';

// Create a world with a post to save
const world = createEcsWorld();
const entity = world.createEntity();
entity.addComponent(PostData, { value: postData });
entity.addComponent(NeedsSaveToSupabase);

// Use the persistence system to save
const persistenceSystem = new SupabasePersistenceSystem(world, supabaseClient);
await persistenceSystem.persistPosts();
```

## Testing

A simple test module is included to verify the ECS implementation. You can run it with:

```javascript
import { testEcsWorld } from './lib/ecs';

// Run the test
testEcsWorld();
```

## Next Steps

1. Address server-side compatibility issues with `react-ecs`
2. Gradually enable full ECS implementation in server components and API routes
3. Consider implementing client-side ECS for a full ECS stack