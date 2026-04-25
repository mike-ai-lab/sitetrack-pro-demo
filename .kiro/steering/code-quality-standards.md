---
inclusion: always
---

# Code Quality & Professional Development Standards

## Core Principles

You are working in a professional codebase. Every change you make must be deliberate, well-researched, and maintain code quality. Carelessness, duplication, and shortcuts are unacceptable.

## CRITICAL: Search Before You Code

### Before Adding ANY New Code

1. **Search exhaustively** for existing implementations:
   - Use `grepSearch` to find similar function names, class names, and logic patterns
   - Search for variations of the functionality (synonyms, related terms)
   - Check multiple file types and locations
   - Example: Before adding `validateEmail()`, search for: "validate.*email", "email.*valid", "checkEmail", "verifyEmail"

2. **Review ALL search results**, not just the first match:
   - Read through every file that matches your search
   - Understand the context and purpose of existing code
   - Identify if existing code can be reused or extended

3. **Document your search process**:
   - Tell the user what you searched for
   - Confirm no duplicates exist before proceeding
   - If similar code exists, explain why new code is still needed OR propose reusing existing code

### Before Modifying Existing Code

1. **Read the entire file** before making changes:
   - Understand the file's purpose and structure
   - Identify all related functions and dependencies
   - Check for patterns and conventions used

2. **Search for all usages** of what you're modifying:
   - Find all references to functions, classes, or variables you're changing
   - Understand the impact of your changes across the codebase
   - Verify your changes won't break existing functionality

3. **Check for similar patterns** elsewhere:
   - If fixing a bug, search if the same bug exists elsewhere
   - If refactoring, ensure consistency across similar code

## Anti-Duplication Rules

### Absolutely Forbidden

- Adding a function when a similar function already exists
- Creating a new utility when an existing one can be extended
- Copying code blocks instead of extracting shared logic
- Implementing the same logic in multiple places
- Creating new files without checking for existing similar files

### Required Actions

1. **Consolidate, don't duplicate**:
   - If you find similar code, refactor to share logic
   - Extract common patterns into reusable functions
   - Use inheritance, composition, or utilities appropriately

2. **Extend, don't recreate**:
   - Add parameters to existing functions rather than creating new ones
   - Enhance existing utilities rather than writing new ones
   - Build on existing patterns rather than introducing new ones

3. **Propose refactoring** when you find duplication:
   - Alert the user to existing duplication
   - Suggest consolidation strategies
   - Offer to clean up before adding new features

## Code Modification Standards

### When Editing Code

1. **Use precise replacements**:
   - Include sufficient context in `strReplace` operations
   - Verify your `oldStr` matches exactly one location
   - If multiple matches exist, handle each deliberately

2. **Maintain code structure**:
   - Preserve existing formatting and style
   - Follow established patterns in the file
   - Keep related code together

3. **Avoid monolithic changes**:
   - Break large changes into logical steps
   - Make one conceptual change at a time
   - Explain each step clearly

### When Adding Code

1. **Find the right location**:
   - Place new code near related functionality
   - Follow the file's organizational structure
   - Don't append to the end unless appropriate

2. **Match existing style**:
   - Use the same naming conventions
   - Follow the same code patterns
   - Maintain consistent indentation and formatting

3. **Keep it minimal**:
   - Write only what's necessary
   - Avoid over-engineering
   - Don't add "nice to have" features unless requested

## Search Strategy Requirements

### Comprehensive Search Checklist

Before claiming "no existing implementation found":

- [ ] Searched for exact function/class name
- [ ] Searched for similar names (synonyms, variations)
- [ ] Searched for the core logic pattern
- [ ] Searched in common utility locations
- [ ] Searched in related feature directories
- [ ] Checked imported modules and dependencies
- [ ] Reviewed similar files for patterns

### Search Patterns to Use

For a feature like "email validation":
```
- "email.*valid"
- "valid.*email"
- "check.*email"
- "verify.*email"
- "@.*email"
- "validateEmail"
- "isValidEmail"
- "emailValidator"
```

For a feature like "date formatting":
```
- "format.*date"
- "date.*format"
- "formatDate"
- "dateFormat"
- "toDateString"
- "parseDate"
```

## Conflict Prevention

### Before Making Changes

1. **Understand dependencies**:
   - Check what imports the file you're modifying
   - Verify what the file imports
   - Understand the data flow

2. **Check for conflicts**:
   - Look for naming conflicts
   - Verify no duplicate exports
   - Ensure no circular dependencies

3. **Test compatibility**:
   - Consider how changes affect existing code
   - Verify type compatibility
   - Check for breaking changes

### After Making Changes

1. **Use `getDiagnostics`** to verify:
   - No syntax errors introduced
   - No type errors created
   - No linting issues added

2. **Verify the change**:
   - Read the modified file to confirm correctness
   - Check that only intended changes were made
   - Ensure no unintended side effects

## Quality Checklist

Before completing any task, verify:

- [ ] Searched thoroughly for existing implementations
- [ ] Reviewed ALL search results, not just the first
- [ ] No duplicate code added
- [ ] No duplicate functions created
- [ ] Code placed in the logical location
- [ ] Existing patterns and styles followed
- [ ] All modifications are precise and intentional
- [ ] No monolithic or overly complex changes
- [ ] Diagnostics checked and passing
- [ ] Changes explained clearly to the user

## Communication Standards

### Always Tell the User

1. **What you searched for** and what you found
2. **Why you're adding new code** vs. reusing existing code
3. **What existing code you're modifying** and why
4. **Any duplication or issues you discovered**
5. **Any refactoring opportunities you identified**

### Never

- Silently add duplicate code
- Skip search steps to save time
- Make assumptions about code structure
- Modify code without understanding it
- Leave the codebase worse than you found it

## Professional Standards

### You Are Expected To

- Work methodically and carefully
- Think before you code
- Search before you create
- Understand before you modify
- Verify before you complete

### You Are Not Allowed To

- Rush through tasks (BUT ALSO DO NOT HANG OR WASTE TIME)
- Skip search and verification steps
- Create technical debt
- Leave duplicate or conflicting code
- Make careless or lazy changes

## UI/UX Standards

### Design Requirements

- **No cartoonish emojis** in UI elements or user-facing text
- **Consistent design language** - all UI elements must match in style, spacing, and visual hierarchy
- **Minimal, efficient components** - avoid bulky or unnecessarily large UI elements
- **Responsive design mandatory**:
  - Desktop view must be fully functional
  - Mobile view must account for native browser toolbars
  - Consider safe areas for accurate interface display on mobile devices
  - Test and verify both orientations when relevant

### Implementation Standards

- **No placeholders** - when a feature is requested, implement it fully and functionally
- **Real implementations only** - no mock data, dummy functions, or "TODO" comments unless explicitly requested

## File Organization & Architecture

### Prevent File Bloat

- **Never accumulate features in single files**
- **Maximum file size guideline**: If a file approaches 500 lines, consider refactoring
- **Modular architecture required**:
  - Separate features into dedicated modules
  - Use proper directory structure for feature organization
  - Split large files into logical components

### Directory Structure Standards

- **Professional organization** - follow industry-standard patterns:
  - `/src` or `/app` for application code
  - `/components` for reusable UI components
  - `/features` or `/modules` for feature-specific code
  - `/utils` or `/helpers` for utility functions
  - `/styles` or `/css` for stylesheets
  - `/tests` for all testing files
  - `/docs` for all documentation

### CSS Management

- **No scattered CSS rules** across multiple files
- **Organized stylesheet structure**:
  - Component-specific styles with the component
  - Global styles in dedicated global stylesheet
  - Use CSS modules, scoped styles, or clear naming conventions
  - Avoid conflicts and specificity wars

## Documentation Standards

### When to Document

- **Only document after user confirmation** - features must be tested and confirmed working with zero problems
- **Document only when needed** - not every small change requires documentation
- **Single source of truth** - one document per feature, no duplicates

### Documentation Requirements

- **Organized subfolder only** - all documentation in `/docs` or similar organized directory
- **No root directory documentation** - absolutely no scattered `.md` files in root
- **Clear naming convention**: `FEATURE-NAME.md` (e.g., `user-authentication.md`)
- **Required metadata**:
  - Date and time stamp of feature integration
  - Feature description
  - Integration notes if relevant
- **Update, don't duplicate** - if a feature is updated, update the existing doc, never create `feature-v2.md` or `feature-updated.md`

### Forbidden Documentation Practices

- Multiple docs for the same feature
- Version suffixes (e.g., `feature-v1.md`, `feature-v2.md`, `feature-final.md`)
- Root directory documentation files
- Documenting before user confirms functionality

## Security Standards

### API Key Protection

- **Never expose API keys** in committed files
- **Always use environment variables** for sensitive data
- **Verify `.gitignore` includes**:
  - `config.js` (if it contains keys)
  - `.env` and `.env.*` files
  - Any files with credentials
- **No console logging of sensitive data** - ensure API keys never appear in browser console
- **Check before committing** - verify no keys are exposed in the commit

### Security Checklist

Before any commit:
- [ ] No API keys in code
- [ ] Sensitive files in `.gitignore`
- [ ] No credentials in console logs
- [ ] Environment variables properly configured
- [ ] Example config files use placeholders only

## Testing Standards

### Test Organization

- **Single organized subfolder** - all tests in `/tests` directory
- **No test file accumulation** - forbidden patterns:
  - `test-example.js`
  - `test-example-fixed.js`
  - `test-example-fixed-final.js`
  - `test-example-v2.js`
- **Update existing tests** - don't create new versions

### Test Naming Convention

- **Required format**: `[purpose]-TEST.js`
- **Examples**:
  - `APIkey-TEST.js`
  - `authentication-TEST.js`
  - `database-connection-TEST.js`
  - `user-validation-TEST.js`
- **Descriptive purpose** - test name should clearly indicate what is being tested

### Test File Management

- One test file per feature/module
- Update existing tests when functionality changes
- Delete obsolete tests
- Keep test directory clean and organized

## Protected Files

### SESSION File Handling Rule

**Trigger Condition:**
When the user shares any file whose name starts with `SESSION-`

**AI Behavior:**

1. **Interpretation**
   - Treat the file as a previously interrupted session
   - Parse and reconstruct full context from the content
   - Identify the last active task from the final part of the file (especially where the response was cut off)

2. **Response Protocol (STRICT)**
   - **DO NOT** continue the task automatically
   - **DO NOT** modify, generate, or edit any code
   - **DO NOT** summarize in detail or list completed steps unless explicitly asked
   
3. **Required Reply Structure**
   The AI must respond with:
   - A short confirmation that the session context is understood
   - A clear statement that it is ready to resume from the last point
   - A direct request for user confirmation before proceeding

4. **State After Reply**
   - Enter a paused state
   - Wait for explicit user instruction (e.g., "Proceed" or a new request)
   - Only after confirmation, resume execution from the last identified task

**Response Template:**
```
I've reviewed the session file and fully understand the previous context and where the process was interrupted.

I'm ready to continue from the last active step.

Please confirm how you want to proceed.
```

**Additional SESSION File Rules:**
- Never edit files with `SESSION-` prefix unless explicitly instructed
- These files are user-managed session data
- AI agents must not modify, delete, or refactor these files without permission
- If a task involves SESSION files beyond reading context, ask the user for guidance

## Remember

**Quality over speed.** Taking time to search, understand, and implement correctly is always better than rushing and creating problems. The user would rather wait a bit longer for professional, clean code than deal with duplicates, conflicts, and technical debt.

**When in doubt, search more.** If you're not 100% certain no similar code exists, search again with different terms.

**Communicate your process.** The user needs to trust that you're being thorough. Show your work.

**Professional standards always.** Every file, every feature, every commit should reflect production-quality work with proper organization, security, and maintainability.

**Always remember to update the README.md file with the updates after i confirm the successful implementation**