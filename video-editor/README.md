# Professional Video Editor Task

A high-performance, web-based video timeline editor built with React, focusing on state predictability, performance, and a seamless user experience.


**Live Demo:** [https://video-editor-fullstack.onrender.com](https://video-editor-fullstack.onrender.com)
> ⚠️ **Note:** This application is hosted on a free-tier instance on Render.com. If the app hasn't been visited recently, the initial load may take **30-50 seconds** (cold start) as the server wakes up. Subsequent interactions and reloads will be fast.

## Architectural Approach

The application was built with a focus on **modularity**, **data integrity**, and **state predictability**, ensuring that the complex logic of a timeline editor remains maintainable and scalable.

### State Management
I chose **Zustand** as the primary state manager. To keep the code clean and maintainable, I implemented a **Slices Pattern**, separating logic into domain-specific modules:
- **Project/REST API Slice**: Handles core project metadata and clip synchronization.
- **Timeline Slice**: Manages playhead positioning, selection logic, and spatial calculations.
- **Notes/GraphQL Slice**: Orchestrates integration with the GraphQL storage layer for real-time annotations.
- **History Slice**: A robust Undo/Redo system built using functional programming principles to track state snapshots.

### Data Flow & Logic
- **Functional Programming**: Leveraged **Ramda.js** for state transitions, especially within the Undo/Redo logic, ensuring immutability and predictable data transformations.
- **Hybrid API Integration**: Seamlessly combined **REST (Projects)** and **GraphQL (Notes)** within a unified store. I implemented logic to handle potential race conditions between fetching project structures and their subsequent metadata.
- **Accessibility (A11y)**: Prioritized keyboard-first navigation. Users can navigate the timeline using `Arrows`, select clips with `Enter`/`Space`, and dismiss selections with `Escape`, all while maintaining proper focus management.

## Tech Stack
- **Core**: React 18 + Vite
- **State**: Zustand (Slices Pattern)
- **Utilities**: Ramda (FP Utilities)
- **UI/UX**: Tailwind CSS + Shadcn UI + Lucide React
- **Testing**: Vitest + React Testing Library (almost 100% logic coverage)

## What I would improve with more time

### Static Type Safety (TypeScript)
- **Migrate to TypeScript**: While the current JavaScript implementation focuses on data integrity through functional patterns, I would transition the entire codebase to TypeScript. This would eliminate a whole class of runtime errors, improve IDE autocompletion, and make complex data structures like `Clip` and `Note` much easier to refactor safely.

### User Experience (UX) Enhancements
- **Optimistic UI Updates**: For project notes, I would implement an optimistic UI pattern (potentially using the new `useOptimistic` React hook). This would allow notes to appear instantly in the list while the API call is in flight, providing a snappier feel and handling background sync errors gracefully.
- **Drag-and-Drop Interaction:**: I would add a full drag-and-drop system (e.g., using `dnd-kit`). This would make the editor feel much more intuitive for mouse users.

### Advanced Asynchronous Control (Fluture.js)
- **Asynchrony**: Would replace standard Promises with `Fluture.js` (Futures) for complex side effects.
- **Cancellation**: Automatically canceling API requests (REST/GraphQL) if a user navigates away or starts a new action, preventing memory leaks and race conditions.
- **Better Error Handling**: Using Fluture’s `Reified` types to handle errors as values, eliminating the need for `try/catch` blocks and making the code more robust and composable.

## AI Usage

Below are the logs of some targeted sessions:
1. https://chatgpt.com/s/t_69dea8e8c1748191a145ea8c95370336 - Zustand i Slices Pattern
2. https://chatgpt.com/s/t_69deaa641e7c81919dc3776f9799a6a1 - Ramda
3. https://chatgpt.com/s/t_69deab175bc4819194d718dc98297a49 - Race condition
4. https://chatgpt.com/s/t_69deab8adbf881918e1e34c2642a22a6 - Tailwind, TimeLine
5. https://chatgpt.com/s/t_69dea993d4a481919385864c920e9952 - Vitest / React Testing Library
6. https://chatgpt.com/s/t_69dea9ff7f6c81918551d212ffbf6d92 - API Mocks
7. https://chatgpt.com/s/t_69deac301e1481918153294b02f211ad - Fluture
8. https://chatgpt.com/s/t_69deaabd17808191bbd81a83499ea257 - Express server