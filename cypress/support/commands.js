Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
      
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Kato')
    cy.get('#email').type('douglas@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

})