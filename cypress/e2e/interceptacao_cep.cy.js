describe('Cenário de teste com cy.intercept', () => {
    beforeEach(() => {
        cy.visit('https://walkdog.vercel.app/');
    });

    it('Requisição interceptada deve retornar o endereço correto', () => {
        // Interceptação da requisição GET
        cy.intercept('GET', 'https://viacep.com.br/ws/41800-700/json/', {
            "cep": "41800-700",
            "logradouro": "Avenida Getúlio Vargas",
            "complemento": "",
            "bairro": "Centro",
            "localidade": "Salvador",
            "uf": "BA",
            "ibge": "2927408",
            "gia": "1153",
            "ddd": "71",
            "siafi": "1234"
        }).as('getAddress');

        // Acessar a página de cadastro
        cy.get('a[href="/signup"]').click();
        cy.get('form h1').should('have.text', 'Faça seu cadastro');

        // Preencher o campo de CEP e clicar no botão de buscar
        cy.get('input[name="cep"]').type('41800-700');
        cy.get('input[type="button"][value="Buscar CEP"]').click();

        // Aguardar a requisição interceptada
        cy.wait('@getAddress');

        // Validar se os campos foram preenchidos corretamente
        cy.get('input[name="addressStreet"]').should('have.value', 'Avenida Getúlio Vargas');
        cy.get('input[name="addressDistrict"]').should('have.value', 'Centro');
        cy.get('input[name="addressCityUf"]').should('have.value', 'Salvador/BA');

    })
})