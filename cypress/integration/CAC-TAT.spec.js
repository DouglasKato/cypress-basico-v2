    ///<reference types="Cypress"/>

    describe('Central de Atendimento ao Cliente TAT', function(){ /*Suite de Teste*/
    
        beforeEach(function(){
            cy.visit('./src/index.html')
        })
    
        it('verifica o título da aplicação', function(){ /*Caso de Teste*/
       
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })

        it('preenche os campos obrigatórios e envia o formulário', function(){
            
            cy.get('#firstName').type('Douglas')
            cy.get('#lastName').type('Kato')
            cy.get('#email').type('douglas@gmail.com')
            cy.get('#open-text-area').type('Valeu')
            cy.get('button[type="submit"]').click()

            cy.get('.success').should('be.visible')
        })
        it('time-out', function(){
            const longtext =' Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptate suscipit obcaecati et tempore, id error iste molestiae dolor architecto sunt vitae magnam, animi ut repellat natus, autem culpa fugit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam dicta pariatur labore officiis sint non, dolorum molestiae facilis fuga natus asperiores omnis ex illum, commodi, voluptatibus debitis iste maiores id. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima molestias illo id sunt repellendus veniam, doloribus vitae nesciunt consectetur nihil porro error perferendis ipsa voluptas quaerat optio quia natus suscipit.'
            cy.get('#firstName').type('Douglas')
            cy.get('#lastName').type('Kato')
            cy.get('#email').type('douglas@gmail.com')
            cy.get('#open-text-area').type(longtext, {delay: 0 })
            cy.get('button[type="submit"]').click()

            cy.get('.success').should('be.visible')

        })

        it ('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
            cy.get('#firstName').type('Douglas')
            cy.get('#lastName').type('Kato')
            cy.get('#email').type('douglas.com')
            cy.get('#open-text-area').type('Valeu')
            cy.get('button[type="submit"]').click()

            cy.get('.error').should('be.visible')
        })
        
        it ('numero de telefone invalido ao tentar digitação nao-numérico', function(){

            cy.get ('#phone')
            .type('abcde')
            .should('have.value', '')
        })
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
            cy.get('input[id="firstName"]').type('Douglas')
            cy.get('input[id="lastName"]').type('Kato')
            cy.get('input[id="email"]').type('douglas@gmail.com')
            cy.get('#phone-checkbox').check()
            cy.get('textarea[id="open-text-area"]').type('asnaspjasp')
            
            cy.get('.button').click()

            cy.get('.error').should('be.visible')

        })

        it ('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
            cy.get ('input[id="firstName"]').type('Douglas').should('have.value','Douglas')  
            cy.get ('input[id="lastName"]').type('Kato').should('have.value','Kato')
            cy.get ('input[id="email"]').type('douglas@gmail.com').should('have.value','douglas@gmail.com')
            cy.get ('input[id="phone-checkbox"]').check()
            cy.get ('input[id="phone"]').type('012345678') 
            cy.get ('textarea[id="open-text-area"]').type('Olá Mundo')

            cy.get ('input[id="firstName"]').clear().should ('have.value','')
            cy.get ('input[id="lastName"]').clear().should ('have.value','')
            cy.get ('input[id="email"]').clear().should ('have.value','')
            cy.get ('input[id="phone"]').clear().should ('have.value','')
            cy.get ('input[id="phone-checkbox"]').uncheck()
            cy.get ('textarea[id="open-text-area"]').clear().should('have.value','')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){

            cy.get('button[class="button"]').click()
            cy.get('.error').should('be.visible').should('contain','Valide os campos obrigatórios!')
            
        })
        
        it('envia o formulário com sucesso usando um comando customizado',function(){

            cy.fillMandatoryFieldsAndSubmit()
            
            cy.get('.success').should('be.visible')

        })

        it('testeComContains', function(){

            cy.contains('button','Enviar').click()

        })
        /*Teste com o seletor 'Select'*/
        it('seleciona um produto (YouTube) por seu texto',function(){
            cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        })
        it(' seleciona um produto (Mentoria) por seu valor (value)', ()=>{
            cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
        })
        it ('seleciona um produto (Blog) por seu índice',function(){
            cy.get('#product').select(1).should('have.value','blog')

        })
        /*Teste com Radio */
        it('marca o tipo de atendimento "Feedback"',function(){
            cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
            .should('be.checked')
        })
        
        it('marca cada tipo de atendimento',function(){
            cy.get('input[type="radio"][value ="elogio"]')
            .check()
            .should('be.checked')
            cy.get('input[type="radio"][value ="feedback"]')
            .check()
            .should('be.checked')
            cy.get('input[type="radio"][value ="ajuda"]')
            .check()
            .should('be.checked')
        })
        
        it('marca cada tipo de atendimento V2', function(){
            cy.get('input[type="radio"]')
            .should('have.length', 3)/*Verifica o tamanho da radio */
            .each(function($radio){/*Pega cada um dos elementos radio */
                cy.wrap($radio).check()/*empacota os elementos   */
                cy.wrap($radio).should('be.checked')
            })
        })
        /* ****TESTES COM CHECKBOX**** */
        it('marca ambos checkboxes, depois desmarca o último',function(){
            cy.get('input[type="checkbox"]')/*Dessa maneira seleciona tds os check */
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })
        /*****UPLOAD DE ARQUIVOS******/
        it('selecionar um arquivo na pasta fixtures', function(){
            cy.get('input[id="file-upload"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')

            })
        })

        it('selecionar um arquivo simulando drag-drop', function(){
            cy.get('input[id="file-upload"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')

            })
        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')

            })
        })
        /******TESTE DE LINKS COM TARGET BLANK*****/

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
            cy.get('#privacy a').should('have.attr', 'target', '_blank')
            
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
            cy.get('#privacy a')
            .invoke ('removeAttr', 'target')
            cy.get('#privacy a')
            .click()

        })

        it ('testa a página da política de privacidade de forma independente', function(){

            cy.get('#privacy a')
            .invoke ('removeAttr', 'target')
            cy.get('#privacy a')
            .click()
            cy.get('#white-background')
            .should('be.visible')
        
      

        })






    })