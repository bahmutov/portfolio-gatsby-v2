import { colors } from '../../../../src/config/colors'

context('<ColorChart /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })

  // actual functionality is tested in the npm package
  
  context('default chart', () => {
    it('renders correctly', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('table').should('exist')
        cy.get('tr').should('have.length', Object.keys(colors).length)
      })
      cy.checkA11y()
    })
  })

  context('editable chart', () => {
    it('renders correctly', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('input[type="color"]').should('have.length', Object.keys(colors).length)
      })
      cy.checkA11y()
    })

    it('correctly sets new colors', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('input').eq(0)
          .should('have.value', Object.values(colors)[0])
          // trigger color change
          .as('color')
          .invoke('val', '#663399')
          .trigger('change')
          .should('have.value', '#663399')
      })
      
      // refresh the page, reset the theme colors
      // cy.reload()
    })
  })
})