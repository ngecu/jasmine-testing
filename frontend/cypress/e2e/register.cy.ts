describe('Registers', () => {
    it('Successfully registers a user', () => {
      cy.visit('http://localhost:4200/')
  
      cy.contains('ACCOUNT').click()

      cy.url().should('include', '/login')
      

      cy.get('[data-cy="name"]').type('Ngecu');
      cy.get('[data-cy="reg_email"]').type('ngecu16@gmail.com');
      cy.get('[data-cy="reg_password"]').type('3W!W.:srzc4r^!P');

      


      cy.get('button[type="submit"]').contains('Register').click();


    //   cy.get('.reg_success', { timeout: 1000 }).should('be.visible');

      
   
  
    })

    it('Doesnt Reg a user', () => {
        cy.visit('http://localhost:4200/')
    
        cy.contains('ACCOUNT').click()
  
        cy.url().should('include', '/login')
        
        cy.get('[data-cy="name"]').type('Ngecu');
        cy.get('[data-cy="reg_email"]').type('ngecu16@gmail.com');
        cy.get('[data-cy="reg_password"]').type('3W!W.:srzc4r^!P');

        cy.get('[data-cy="c_password"]').type('3W!W.:srzc4r^!Pgh');

  
  
        cy.get('button[type="submit"]').contains('Register').click();
  
  
        cy.get('.reg_err', { timeout: 1000 }).should('be.visible');
  
        
     
    
      })

  

  })