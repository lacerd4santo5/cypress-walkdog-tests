describe('Validação de campos obrigatórios', () => {
    beforeEach(() => {
        cy.visit('https://walkdog.vercel.app/');
    });

    it('Verificar as mensagens de erro nos campos obrigatórios', () => {
        cy.fixture('user_incorrect').then((user_incorrect) => {
            // 1. Acessar a página de cadastro
            cy.get('a[href="/signup"]').click();
            cy.get('form h1').should('have.text', 'Faça seu cadastro');
            
            // 2. Submeter o formulário
            cy.get('.button-register').click();
            
            // 3. Criamos a lista de mensagens esperadas
            const errosEsperados = ['Informe o seu nome completo', 'Informe o seu melhor email', 'Informe o seu CPF', 'Informe o seu CEP','Informe um número maior que zero','Adcione um documento com foto (RG ou CHN)'];

            // 2. O loop .forEach() pega item por item e executa o bloco interno
            errosEsperados.forEach((textosComOsErros) => {
                // A asserção se repete automaticamente para cada 'nomeDoItem' da lista
                cy.should('contain', textosComOsErros);
            });})})})