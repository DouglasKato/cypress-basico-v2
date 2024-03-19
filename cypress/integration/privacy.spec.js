describe('Pagina de Privacidade',function(){
    beforeEach(function(){
        cy.visit('./src/privacy.html')
    })

    it.only('Verificar texto do privacy', function(){
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')
       
    })




})