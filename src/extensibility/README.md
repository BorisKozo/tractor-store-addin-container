# AddinContainer

## Overview

The AddinContainer provides a facility for distributed application configuration through a decentralized, path-based registry system. It is designed exclusively for configuration purposes and should not be used for state management.

## Core Concepts

### Architecture

The AddinContainer organizes configuration elements in a hierarchical tree structure. Each element is stored as an `Addin<T>` type within path-based buckets, enabling modular and distributed configuration across the application.

### Addin Structure

Each `Addin<T>` consists of two required properties:

- **id**: A unique identifier within the specific path where the addin is registered
- **content**: The configuration data, which must be either an object or a function (primitive values are not supported)

In most use cases, you will primarily interact with the `content` property of addins.

## Usage

### Adding Addins

Addins must be registered during the application initialization phase by specifying a target path. While the current implementation does not enforce this restriction, adding addins after initialization is not supported and may be prohibited in future versions.

#### Path Convention

Paths consist of alphanumeric segments separated by dots (`.`), forming a hierarchical structure (e.g., `menu.main.items`). While helper functions exist for path construction, paths are typically predefined as constants for consistency.

**Best Practice**: Use predefined path constants rather than constructing paths manually.

### Configuration Contract Pattern

Each path represents a contract between configuration producers and consumers, following a publish-subscribe pattern:

1. **Producers** register addins at predefined paths during initialization
2. **Consumers** retrieve and process addins from those paths after initialization

**Example**: A main menu component defines a path (e.g., `menu.main.items`) where feature modules can register menu items. After initialization, the menu component reads all addins at that path to construct the interface. The consumer remains agnostic to the producers' identities, requiring only that content conforms to the expected type.

**Note**: Type enforcement is not implemented due to JavaScript's dynamic nature. Adherence to type contracts is the responsibility of producers and consumers.

## Global Instance

### globalAddinContainer

While multiple AddinContainer instances can be created, the application should use the singleton `globalAddinContainer` instance system-wide. All addin consumption should reference this global instance to ensure consistency.

## Services

Services are utility classes that encapsulate specific functionality within a cohesive interface. The AddinContainer provides dedicated methods for registering and retrieving services.

**Important**: Services must remain stateless. They should only expose functions for interacting with other system components and should never maintain internal state.