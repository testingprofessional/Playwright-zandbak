# Playwright & TypeScript Coding Standards

## General principles

* Write readable, maintainable and simple code.
* Prefer clarity over clever abstractions.
* Avoid unnecessary duplication.
* Do not introduce abstractions unless they provide clear value.
* Follow the existing project architecture and conventions.

## Test design

* Tests describe WHAT is being tested, not HOW it is implemented.
* Keep tests focused on business behaviour.
* Avoid implementation details in test cases.
* Keep test setup minimal and relevant.
* Use meaningful test names that describe expected behaviour.

## Page Objects

* Page Objects encapsulate UI interaction.
* Locators belong inside Page Objects, not directly in tests.
* Locators should normally be `private readonly`.
* Prefer semantic Playwright locators:

  * `getByRole()`
  * `getByLabel()`
  * `getByText()`
  * `getByPlaceholder()`
* Avoid CSS selectors and XPath unless there is a clear reason.
* Page Object methods should represent meaningful user actions.
* Do not expose internal locators unnecessarily.
* Keep Page Objects focused on one page or logical UI component.

## Assertions

* Assertions verify observable outcomes.
* Keep assertions close to the behaviour they validate.
* Do not add assertions simply because they are technically possible.
* Assertions should be placed at the appropriate architectural level.
* A Page Object may contain assertions when the assertion is intrinsic to that page or component.
* Business-level assertions generally belong in the test or an appropriate higher-level abstraction.

## Component Objects

* Use Component Objects for reusable UI components.
* Examples include navigation bars, dialogs, tables, forms and dropdowns.
* Do not duplicate interaction logic across multiple Page Objects.
* Components should encapsulate their own UI implementation details.

## Workflows / Business Objects

* Use Workflows or Business Objects for meaningful multi-step business processes.
* Workflows describe WHAT business process is performed.
* Workflows hide unnecessary UI implementation details.
* Do not create a Workflow for every small action.

## Fixtures

* Use fixtures for reusable test setup and dependencies.
* Do not use fixtures simply to hide ordinary test logic.
* Keep fixture responsibilities clear and limited.

## TypeScript

* Use strong typing.
* Avoid `any` unless there is a documented reason.
* Prefer explicit types where they improve readability.
* Use async/await consistently.
* Avoid unnecessary type assertions.

## Playwright

* Prefer Playwright's built-in functionality over custom helper implementations.
* Avoid arbitrary `waitForTimeout()` calls unless specifically justified.
* Prefer waiting for meaningful conditions and Playwright's automatic waiting.
* Keep browser interaction deterministic.
* Reuse existing Playwright functionality before creating custom utilities.

## Code generation

When generating or modifying code:

1. Inspect the existing project architecture.
2. Reuse existing Page Objects, Components, Fixtures and Workflows where appropriate.
3. Follow these coding standards.
4. Prefer the simplest solution that fits the architecture.
5. Do not introduce a new abstraction when an existing one can be reused.
6. Do not move logic between architectural layers without a clear reason.
7. If the correct architectural location is ambiguous, explain the trade-off before introducing a new pattern.

## Architectural decision rules

When deciding where code belongs, use these rules:

### Test
Use the test for:
- expressing business behaviour
- arranging the scenario
- invoking the appropriate business-level action
- verifying the expected business outcome

Do not use the test for:
- locating UI elements
- performing low-level UI interactions
- implementing reusable UI behaviour

### Workflow
Use a Workflow when:
- multiple user actions form one meaningful business process
- the process may be reused by multiple tests
- the test should express the process at business level

Do not create a Workflow for:
- a single trivial UI interaction
- behaviour that belongs naturally to one Page Object

### Page Object
Use a Page Object for:
- page-specific UI interactions
- page-specific locators
- page-specific UI state

Do not use a Page Object to represent an entire business process.

### Component Object
Use a Component Object when:
- a UI component is reusable
- the component has its own locators and behaviour
- the same component appears on multiple pages

### Assertion
Place an assertion at the highest appropriate level that still clearly expresses the expected behaviour.

Prefer:
- business-level assertions in the test
- UI/component assertions inside a Page Object or Component when they represent an intrinsic UI state

Do not move assertions merely to make a test shorter.

## Architectural decision rules

When deciding where code belongs, use these rules.

### Test

Use the test for:

* expressing business behaviour
* arranging the scenario
* invoking the appropriate business-level action
* verifying the expected business outcome

Do not use the test for:

* locating UI elements
* performing low-level UI interactions
* implementing reusable UI behaviour
* implementing multi-step business processes

The test should make the business intent understandable without requiring knowledge of the UI implementation.

### Workflow

Use a Workflow when:

* multiple user actions form one meaningful business process
* the process may be reused by multiple tests
* the test should express the process at business level
* the workflow represents a meaningful user journey

Do not create a Workflow for:

* a single trivial UI interaction
* behaviour that belongs naturally to one Page Object
* the purpose of hiding a small amount of code

Prefer an existing Workflow over creating a new one when the existing Workflow already represents the required business process.

### Page Object

Use a Page Object for:

* page-specific UI interactions
* page-specific locators
* page-specific UI state
* actions that naturally belong to a specific page

Page Objects should hide UI implementation details from tests and Workflows.

Do not use a Page Object to represent an entire business process.

### Component Object

Use a Component Object when:

* a UI component is reusable
* the component has its own locators and behaviour
* the same component appears on multiple pages
* encapsulating the component reduces duplication

Do not create a Component Object for a component that is only used once unless it provides a clear architectural benefit.

### Assertion placement

Place an assertion at the highest appropriate level that still clearly expresses the expected behaviour.

Prefer:

* business-level outcome assertions in the test
* UI/component state assertions inside a Page Object or Component when that state is intrinsic to the component
* reusable domain-specific verification methods when they provide clear value

Do not move assertions merely to make a test shorter.

The location of an assertion should be determined by responsibility, readability and reusability.

### Architectural decision process

Before creating new code, consider:

1. Can an existing Page Object, Component, Workflow or Fixture be reused?
2. Which architectural layer owns this responsibility?
3. Is the proposed abstraction necessary?
4. Would adding the abstraction make the test easier to understand?
5. Does the solution hide implementation details appropriately?

Prefer the simplest solution that respects the architecture.

Do not introduce abstractions merely because they are technically possible.

### Important

Follow the existing project architecture before introducing a new pattern.

If the correct architectural location is ambiguous, explain the trade-off rather than silently introducing a new abstraction.

## Rule strength

The following terms have specific meaning:

* **MUST** = mandatory architectural or technical rule.
* **SHOULD** = strong recommendation; deviations may be valid when justified.
* **MAY** = optional pattern that should only be introduced when it provides clear value.

Do not classify a SHOULD or MAY rule as a violation unless the code creates a concrete maintainability, readability or architectural problem.

## Test quality

* Tests MUST verify an observable expected outcome.
* Tests MUST NOT contain UI locators.
* Tests MUST NOT perform low-level UI interactions directly.
* Tests SHOULD express business behaviour rather than implementation details.
* Test data SHOULD be explicit when it is relevant to understanding the scenario.
* Tests SHOULD remain concise enough that the business scenario can be understood quickly.

## Locator quality

* Page Objects and Components MUST own their UI locators.
* Semantic Playwright locators SHOULD be preferred:

  * `getByRole()`
  * `getByLabel()`
  * `getByText()`
  * `getByPlaceholder()`
* CSS selectors and XPath SHOULD only be used when semantic locators are not suitable.
* A CSS selector is not automatically an architectural violation; the reason for using it should be considered.

## Navigation

* Navigation logic MUST belong to the appropriate Page Object or Workflow rather than directly in a test when it represents application behaviour.
* Application-specific base URLs SHOULD be configured centrally.
* Page Objects SHOULD prefer relative application routes when the Playwright `baseURL` is configured.
* A hardcoded absolute URL is a maintainability concern, not automatically an architectural violation.

## Test data

* Page Objects MUST NOT hardcode scenario-specific business data unless that data is intrinsic to the page/component itself.
* Scenario-specific data SHOULD be supplied by the test, Workflow or appropriate test-data abstraction.
* Page Objects SHOULD remain reusable with different test data.

## Page Object responsibility

* A Page Object MUST primarily represent interaction with a page.
* A Page Object MUST NOT become a hidden multi-step business Workflow.
* A Page Object MAY contain multiple related UI actions when those actions naturally belong to the same page.
* If an operation spans multiple pages and represents a meaningful business process, the orchestration SHOULD belong in a Workflow.

## Architectural review

When reviewing code:

1. Identify actual MUST violations first.
2. Identify SHOULD deviations separately.
3. Do not label a MAY pattern as a violation.
4. Consider the existing project architecture before recommending new abstractions.
5. Distinguish between:

   * architectural violation
   * maintainability concern
   * style preference
   * optional improvement
6. Do not recommend refactoring solely for the sake of abstraction.
7. Preserve working, understandable code when the architectural benefit of changing it is unclear.


