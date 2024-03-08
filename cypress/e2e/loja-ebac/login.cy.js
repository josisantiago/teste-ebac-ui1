///<reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', ()  => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    //afterEach(() => {
        //cy.screenshot()
    //});

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('josiane.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, josiane.teste (não é josiane.teste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('josiane@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click() 
        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('josiane.teste@teste.com.br')
        cy.get('#password').type('teste@0000')
        cy.get('.woocommerce-form > .button').click() 
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail josiane.teste@teste.com.br está incorreta.')
        cy.get('.woocommerce-error').should('exist')        
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, josiane.teste (não é josiane.teste? Sair)')
    });

    it('Deve fazer login com sucesso - Usando Fixture', () => {
       cy.fixture('perfil').then( dados => {
            cy.get('#username').clear().type(dados.usuario, { log: false })
            cy.get('#password').clear().type(dados.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, josiane.teste (não é josiane.teste? Sair)')
       })
    });

    it('Deve fazer login com sucesso - Usando Comandos customizados', () => {
        cy.login('josiane.teste@teste.com.br', 'teste@123')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, josiane.teste (não é josiane.teste? Sair)')
    });
})