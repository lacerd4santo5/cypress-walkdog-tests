Cypress.Commands.add('Dados pessoais', (user_correct) => {
    cy.get('input[name="name"]').type(user_correct.name);
    cy.get('input[name="email"]').type(user_correct.email);
    cy.get('input[name="cpf"]').type(user_correct.cpf);
});

Cypress.Commands.add('loginPorSessao', (usuario, senha) => {
  // Passamos o array [usuario, senha] para criar uma chave única de sessão para cada usuário
  cy.session([usuario, senha], () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Usamos os parâmetros recebidos diretamente nos inputs (Sem sobrescrever!)
    cy.get('input[name="username"]').type(usuario);
    cy.get('input[name="password"]').type(senha);
    cy.get('button[type="submit"]').click();

    // Validações de transição para garantir que o login concluiu com sucesso
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-title').should('be.visible');
  });
});