// cypress/integration/booking_spec.js
describe('Booking Process', () => {
    it('should select category, check a service, and show the second part', () => {
        // Visit the page
        cy.visit('http://localhost:3001#booking'); // replace with the actual URL

        // Select a category
        cy.get('#categorySelect').select('Mehed'); // replace with the actual category name

        // Check a service
        cy.get('#serviceCheckboxes input[type="checkbox"]').first().check();

        // Click the submit button
        cy.get('#submitButton').click();

        // Check if the second part is displayed
        cy.get('#second-part').should('be.visible');

        // Additional interactions with the second part if needed
        // For example, selecting a worker and handling date input
        cy.get('select').select('Jelena'); // replace with the actual worker name
        const desiredTime = '16:00';
        const desiredDate = '18.01.24 (N)';

        // Get index
        cy.contains('thead th', desiredDate).invoke('index').then(index => {
            cy.contains(desiredTime).parent('tr').within(() => {
                cy.get('td').eq(index).click()
            })
        })

        // Check if the client form is displayed
        cy.get('.client_form').should('be.visible');

        // Fill out the client form
        cy.get('#clientName').type('John Doe');
        cy.get('#clientTel').type('55546053');
        cy.get('#clientEmail').type('john.doe@example.com');
        cy.get('#clientAdditionalInfo').type('Additional information for the booking');

        // Submit the client form
        cy.get('#send_user_data').click();

        // Check if the success modal is displayed
        cy.get('.modal')
            .should('be.visible')
            .within(() => {
                cy.get('#error-modal-body').should('have.text', 'Teie broneering on kinnitatud!');
            });
    });
});
