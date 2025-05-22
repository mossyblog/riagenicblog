---
description: 
globs: 
alwaysApply: true
---
Here are the current project breakdown

./risksec.invoice/                         # Root directory for the Invoice solution/application
|-- risksec.invoice.api/                   # Contains the Azure Functions API endpoints
|   |-- Core/                              # Core API-specific logic or utilities
|   |-- Invoices/                          # API functions related to invoices
|   |-- Properties/                        # Project configuration (publish profiles, dependencies)
|   |   |-- PublishProfiles/               # Azure deployment profiles
|   |   `-- ServiceDependencies/           # Configuration for Azure service dependencies
|   |-- WorkOrders/                        # API functions related to work orders
|   `-- risksec.invoice.api.csproj         # Project file for the API
|-- risksec.invoice.core/                  # Core business logic, interfaces, and services for the Invoice app
|   |-- Data/                              # Data-related entities or models specific to invoice core logic
|   |-- Docs/                              # Documentation specific to the invoice core project
|   |-- Extensions/                        # Extension methods for invoice core functionality
|   |-- Helpers/                           # Helper classes or utilities for invoice core
|   |-- Infrastructure/                    # Infrastructure concerns (e.g., external service clients) for invoice core
|   |-- Interfaces/                        # Interfaces defining contracts for services and repositories in invoice core
|   |-- Services/                          # Concrete implementations of business logic services for invoice core
|   `-- risksec.invoice.core.csproj        # Project file for the core logic
|-- risksec.invoice.providers/             # Integration logic with external providers (AIMS, NetSuite)
|   |-- AIMS/                              # Code specific to the AIMS provider integration
|   |-- NetSuite/                          # Code specific to the NetSuite provider integration
|   `-- risksec.invoice.providers.csproj   # Project file for the providers
|-- risksec.invoice.tests/                 # Unit and integration tests for the risksec.invoice projects
|   |-- Components/                        # Test components or utilities
|   |-- EmptyFiles/                        # Resource files used in tests
|   `-- risksec.invoice.tests.csproj       # Project file for the tests
|-- tasks/                                 # Build or automation tasks/scripts
|-- .gitignore                             # Specifies intentionally untracked files that Git should ignore
|-- azure-pipelines.yml                    # Azure DevOps CI/CD pipeline definition
|-- nuget.config                           # NuGet configuration file (e.g., package sources)
|-- README.md                              # Top-level documentation for the Invoice solution
|-- risksec.code-workspace                 # VS Code workspace file for the Invoice solution
|-- risksec.invoice.sln                    # Visual Studio Solution file for the Invoice application
`-- risksec.invoice.sln.DotSettings.user   # User-specific Rider/ReSharper settings for the solution

./risksec.core.data/ (Separate Solution/Repo) # Root directory for shared Core Data structures
|-- Client/                                # Client-related data models or logic (possibly legacy/duplicate?)
|-- docs/                                  # Documentation specific to core.data
|-- src/                                   # Source code for the core data library
|   |-- Audit/                             # Data structures related to auditing
|   |-- Billing/                           # Data structures related to billing
|   |   `-- PayLink/                       # Data structures specific to payment links
|   |-- Client/                            # Data structures related to clients
|   |-- Communications/                    # Data structures related to communications
|   |-- Dtos/                              # Data Transfer Objects shared across applications
|   |-- Network/                           # Data structures related to network concepts
|   |-- Security/                          # Data structures related to security
|   `-- WorkOrders/                        # Data structures related to work orders
|   `-- risksec.core.data.csproj           # Project file for the core data library
|-- tests/                                 # Tests specific to the core.data library
|-- .gitignore                             # Git ignore file for core.data
`-- risksec.core.data.sln                  # Visual Studio Solution file for core.data

./risksec.core.jarvis/ (Separate Solution/Repo) # Root directory for the Jarvis data framework
|-- Data/                                  # Data storage implementations (e.g., InMemory for testing)
|   `-- Storage/                           # Abstract storage interfaces or base classes
|       `-- InMemory/                      # In-memory storage implementation for testing/dev
|-- docs/                                  # Documentation for Jarvis components
|   |-- CosmosTranslator/                  # Documentation for Cosmos DB query translation
|   |-- DataContext/                       # Documentation for IDataContext
|   |-- EntityContext/                     # Documentation for EntityContext
|   |-- PartitionDocument/                 # Documentation for PartitionDocument structure
|   |-- PartitionStorage/                  # Documentation for PartitionStorage abstraction
|   |-- QueryBuilder/                      # Documentation for query building capabilities
|   `-- WorkingSet/                        # Documentation for the WorkingSet (Unit of Work)
|-- plans/                                 # Planning or design documents for Jarvis
|-- risksec.core.jarvis/                   # Main Jarvis library source code project
|   |-- Data/                              # Core data abstractions and implementations for Jarvis
|   |   |-- Query/                         # Query-related interfaces and classes
|   |   `-- Storage/                       # Core storage abstractions
|   |       `-- InMemory/                  # Core in-memory storage logic
|   |-- Exceptions/                        # Custom exceptions defined by Jarvis
|   |-- CHANGELOG.MD                       # PROJECTS CHANGELOG LOCATION. (risksec.core.jarvis\CHANGELOG.md)
|   `-- risksec.core.jarvis.csproj         # Project file for the Jarvis library
|-- risksec.core.jarvis.tests/             # Unit and integration tests for the Jarvis framework
|   |-- Components/                        # Test components, helpers, or fixtures for Jarvis tests
|   |-- Data/                              # Tests specifically targeting Jarvis data components
|   |   |-- Query/                         # Tests for Jarvis query functionality
|   |   `-- Storage/                       # Tests for Jarvis storage implementations
|   |-- docs/                              # Documentation specific to Jarvis tests
|   |-- Examples/                          # Example usage patterns tested
|   |-- Integration/                       # Integration tests (e.g., against actual Cosmos DB emulator)
|   |-- TestResults/                       # Output directory for test results
|   |-- coverage_summary.md                # Code coverage summary report
|   |-- risksec.core.jarvis.tests.csproj   # Project file for Jarvis tests
|   `-- UnitTest1.cs                       # Example/default test file

|-- .gitignore                             # Git ignore file for Jarvis
|-- risksec.core.jarvis.sln                # Visual Studio Solution file for Jarvis
|-- risksec.core.jarvis.sln.DotSettings.user # User-specific Rider/ReSharper settings for Jarvis
`-- run_coverage_and_open_dashboard.ps1    # Script to run tests with coverage and view results