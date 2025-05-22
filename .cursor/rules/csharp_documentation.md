---
description: 
globs: 
alwaysApply: true
---
====================================
AI Assistant Rules for C# Development
====================================

I. Core Operational Directives
------------------------------
*   Execute Instructions Directly: Perform assigned tasks without unnecessary discussion.
*   Adhere to Instructions: Strictly follow specific instructions in each request.
*   Act as Implementer: Fulfill the role of coding and documenting as requested.

II. Code Implementation & Quality
---------------------------------
*   Readability & Maintainability:
    - Prioritize clear, understandable code.
    - Ensure consistent formatting (indentation, spacing, braces) per .NET conventions.
    - Keep lines to a reasonable length (~120 chars).
    - Use appropriate whitespace.
*   C# Best Practices & Conventions:
    - Naming:
        + PascalCase: Classes, properties, namespaces.
        + camelCase: Local variables, parameters.
        + Interface Prefix: 'I'.
        + Use meaningful names.
        + Method Names: Concise, verb-based (Fluent). Avoid redundant suffixes like 'Async' if context/type is clear.
    - Syntax & Semantics:
        + Ensure correct C# syntax.
        + Use appropriate data types.
        + Implement null safety ('?.', '??', '!', nullable annotations).
        + Manage IDisposable with 'using'.
        + Apply async/await correctly; use 'ConfigureAwait(false)' in libraries.
        + Implement specific, robust exception handling (try-catch-finally, specific types, logging).
        + Utilize LINQ effectively.
        + Employ generics for type safety/reusability.
        + Leverage modern C# features where beneficial.
    - Structure & Design:
        + Apply appropriate access modifiers (encapsulation).
        + Break down large units (Modularity, High Cohesion).
        + Refactor duplicated code (DRY).
        + Reduce dependencies (Low Coupling).
        + Apply relevant design patterns.
        + Suggest dependency injection.
*   Performance:
    - Identify common anti-patterns (inefficient loops/queries).
    - Suggest efficient alternatives.
*   Security:
    - Advise on input validation.
    - Recommend secure practices for sensitive data.
    
III.a Code Cleanup & Refactoring
-------------------------------
*   **Reformatting:** Actively reformat code sections being modified to strictly adhere to project conventions and the rules in Section II.
*   **Simplification:** Where appropriate and within the scope of the task, simplify overly complex expressions or logic flows to improve readability.
*   **Removing Redundancy:** Eliminate commented-out code, unused variables, or unnecessary using statements within the modified sections.
*   **Handling TODOs:**
    - **Address if Relevant:** If the assigned task directly relates to or resolves a `TODO` comment, address the `TODO` and remove the comment.
    - **Improve if Touching:** If modifying code near a `TODO`, improve the comment if possible (e.g., add context, a ticket number, or clarify the action needed) unless instructed otherwise.
    - **Do Not Address Unless Instructed:** Do not go out of your way to address `TODO`s that are unrelated to the current task, unless specifically asked to do so.
    - **Log/Track:** If `TODO`s represent significant technical debt or require discussion, mention this and suggest creating a backlog item/ticket.

III.b Documentation (csharp_documentation Standards)
--------------------------------------------------
*   Public Members:
    - <summary>: Explain purpose.
    - <param>: Document parameters.
    - <returns>: Document return values.
    - <exception>: Document potential exceptions and triggers.
*   Clarity & Context:
    - Add inline comments for complex logic.
    - Use <remarks> for extra context, usage notes, follow-up actions (e.g., Commit needed).
    - Document assumptions.
    - Tests should in their header documentation explain the purpose, reason and expected outcomes conceptually.

IV. Testing
-----------
*   Execution:
    - Run specific tests/classes via filters ('dotnet test --filter ...').
    - NEVER use '--no-build'.
*   Validation: Run tests after writing/modifying to ensure they pass.
*   Testability: Suggest refactoring for better testability if needed.
*   **Scoped Service Retrieval in Tests:**
    - When retrieving potentially scoped services like `IDataContext` within test methods, ALWAYS create a dependency injection scope (`using var scope = _serviceProvider.CreateScope();`) and resolve the service from the scope's provider (`scope.ServiceProvider.GetRequiredService<IDataContext>();`).
    - Rationale: This correctly simulates request scoping and ensures services like `IDataContext` and its internal `WorkingSet` have the intended limited lifetime for the test's unit of work, preventing state leakage between tests.
    - AVOID retrieving services like `IDataContext` directly from the root `_serviceProvider` within individual test methods.

## Best Practices
- Each test should be independent
- Use descriptive test names
- Do not use mock unless specifically intstructed.


V. Interaction & Suggestions
----------------------------
*   Context Awareness: Analyze surrounding code/project.
*   Explain Rationale (When Necessary): Briefly explain *why* for significant changes.
*   Offer Alternatives (When Applicable): Present valid options and trade-offs.
*   Non-Destructive Suggestions (Default): Propose changes for review unless asked to apply directly.
*   Error Handling: Clearly communicate issues with ambiguous or erroneous code.