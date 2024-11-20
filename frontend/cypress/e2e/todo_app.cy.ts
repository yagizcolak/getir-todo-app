describe('To-Do App', () => {
  it('Loads the app and adds a new task', () => {
    // Visit the app
    cy.visit('http://localhost:3000');

    // Click on 'Add New Task' button using data-testid
    cy.get('[data-testid="add-new-task-button"]').click();

    // Ensure the modal is open by checking for the title input
    cy.get('input[name="title"]').should('be.visible');

    // Fill out the form
    cy.get('input[name="title"]').type('Test Task 3');

    // Submit the form using data-testid
    cy.get('[data-testid="modal-add-task-button"]').click();

    // Verify the task is added
    cy.contains('Test Task').should('be.visible');
  });
});