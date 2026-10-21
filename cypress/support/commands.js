Cypress.Commands.add('Dados pessoais', (user_correct) => {
    cy.get('input[name="name"]').type(user_correct.name);
    cy.get('input[name="email"]').type(user_correct.email);
    cy.get('input[name="cpf"]').type(user_correct.cpf);
});