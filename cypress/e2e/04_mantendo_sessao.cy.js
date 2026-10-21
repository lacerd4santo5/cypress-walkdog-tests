describe('Testes de Sessão no OrangeHRM', () => {
  
  // Exemplo: Dados definidos de forma centralizada para reaproveitamento
  const dadosLogin = {
    user: 'Admin',
    pass: 'admin123'
  };

  beforeEach(() => {
    // A referência aos dados de login acontece no momento de invocar o comando
    cy.loginPorSessao(dadosLogin.user, dadosLogin.pass);
  });

  it('Teste 1: Deve visualizar a foto/perfil do usuário no header', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    cy.get('.oxd-userdropdown-tab').should('be.visible');
  });

  it('Teste 2: Deve navegar para o módulo PIM (Lista de Empregados)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    cy.get('.oxd-topbar-header-breadcrumb h6').should('have.text', 'PIM');
  });
});