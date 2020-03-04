import { themeColors } from '../../../../src/components/misc/color-chart'

context('<ColorChart /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })
  
  it('renders correctly', () => {
    cy.get('section.color-chart').within(() => {
      cy.get('table').should('exist')
      cy.get('tr').should('have.length', themeColors.length)
    })
    cy.checkA11y()
  })
})