/**
 * Simple script to run our ECS test
 */

// Import the built test module
try {
  const { testEcsWorld } = require('../../../dist/lib/ecs/test');
  
  // Run the test
  testEcsWorld();
  
  console.log('Test completed successfully');
} catch (error) {
  console.error('Failed to run the test:', error);
  console.log('Make sure you have built the project first with: npm run build');
}