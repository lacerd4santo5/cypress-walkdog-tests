describe('Cadastro no Walkdog', () => {
    beforeEach(() => {
        cy.visit('https://walkdog.vercel.app/');

    });

    it('Deve cadastrar um novo Dog Walker com sucesso', () => {
        cy.fixture('user_correct').then((user_correct) => {
            // 1. Acessar a página de cadastro
            cy.get('a[href="/signup"]').click();
            cy.get('form h1').should('have.text', 'Faça seu cadastro');

            // 2. Preencher dados pessoais
            cy.DadosPessoais(user_correct);

            // 3. Preencher e buscar endereço pelo CEP
            cy.get('input[name="cep"]').type(user_correct.cep);
            cy.get('input[type="button"][value="Buscar CEP"]').click();

            // Validar se o endereço foi preenchido automaticamente pela API de CEP
            cy.get('input[name="addressStreet"]').should('have.value', user_correct.addressStreet);
            cy.get('input[name="addressDistrict"]').should('have.value', user_correct.addressDistrict);
            cy.get('input[name="addressCityUf"]').should('have.value', user_correct.addressCityUf);

            // Preencher número e complemento
            cy.get('input[name="addressNumber"]').type(user_correct.addressNumber);
            cy.get('input[name="addressDetails"]').type(user_correct.addressDetails);

            // 4. Selecionar o método de atendimento
            // Seleciona a opção "Cuidar" ou "Adestrar"
            cy.contains('span', 'Cuidar').click();

            // 5. Upload do documento de identificação
            // Certifique-se de colocar um arquivo 'cnh.png' na pasta cypress/fixtures/
            cy.get('input[type="file"]').selectFile('cypress/fixtures/cnh.png', { force: true });

            // 6. Submeter o formulário
            cy.get('.button-register').click();

            // 7. Asserção / Validação do sucesso
            cy.get('.swal2-html-container')
                .should('be.visible')
                .and('contain', 'Recebemos o seu cadastro');
        });
    });
    it('Deve cadastrar um novo Dog Walker com erros', () => {
        cy.fixture('user_incorrect').then((user_incorrect) => {
            // 1. Acessar a página de cadastro
            cy.get('a[href="/signup"]').click();
            cy.get('form h1').should('have.text', 'Faça seu cadastro');

            // 2. Preencher dados pessoais
            cy.DadosPessoais(user_incorrect);

            // 3. Submeter o formulário
            cy.get('.button-register').click();

            //Verificar os campos obrigatórios e mensagens de erro
            cy.contains('Informe um email válido');
            cy.contains('CPF inválido')

        }
        );
    });
});