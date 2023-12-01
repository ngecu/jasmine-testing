describe('Login', () => {
    it('Successfully logins a user', () => {
      cy.visit('http://localhost:4200/')
  
      cy.contains('ACCOUNT').click()

      cy.url().should('include', '/login')


      cy.get('[data-cy="email"]').type('kabbzdj@gmail.com');
      cy.get('[data-cy="password"]').type('3W!W.:srzc4r^!P');
      


      cy.get('button[type="submit"]').contains('Login').click();

      cy.wait(10000);

      cy.location('pathname').should('eq', '/my-account');

   
  
    })

    it('It fails to login user', () => {
      cy.visit('http://localhost:4200/')
  
      cy.contains('ACCOUNT').click()

      cy.url().should('include', '/login')


      cy.get('[data-cy="email"]').type('admin@gmail.com');
      cy.get('[data-cy="password"]').type('3W!W.:srzc4r^!P');
      


      cy.get('button[type="submit"]').contains('Login').click();
      cy.get('.response_error', { timeout: 1000 }).should('be.visible');

   
  
    })

  })