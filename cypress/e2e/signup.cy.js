const faker = require('faker');
describe('Sign-up', () => {
  it('Sign-up with same Email', () => {
    cy.visit('https://demo.evershop.io/')
    cy.wait(2000); // Menunda selama 2 detik
    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click();
    cy.xpath("//a[normalize-space()='Create an account']").click();
    cy.xpath("//input[@placeholder='Full Name']").type("Hendrawan");
    cy.wait(2000); // Menunda selama 2 detik (2000 milidetik)


    // generate email unik dengan faker 
    const email = faker.internet.email();

    // isi email dengan generate fake email
    //const Emailunik = `test${Date.now()}@example.com`;
    cy.xpath("//input[@placeholder='Email']").type(email);
    //cy.xpath("//input[@placeholder='Email']").type(Emailunik);
    cy.xpath("//input[@placeholder='Password']").type("Abcd1234");
    cy.xpath("//button[@type='button']").click();

    // signup sukses redirect ke home
    cy.url().should('eq', 'https://demo.evershop.io/');
    cy.wait(1500); // Menunda selama 1 detik (1000 milidetik)

    // masuk kembali ke halaman create account
    cy.visit('https://demo.evershop.io/account/');
    cy.xpath("//a[normalize-space()='Logout']").click();

    // signup dengan email yang sama
    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click();
    cy.xpath("//a[normalize-space()='Create an account']").click();
    cy.xpath("//input[@placeholder='Full Name']").type("Hendrawan");
    cy.wait(2500); // Menunda selama 2,5 detik (2500 milidetik)
    cy.xpath("//input[@placeholder='Email']")
      .clear()
      .type(email);

      cy.wait(1500); // Menunda selama 1,5 detik (1500 milidetik)

    cy.xpath("//input[@placeholder='Password']").type("Abcd1234");
    cy.xpath("//button[@type='button']").click();

    // konfirmasi signup gagal karena email sama
    cy.contains(/duplicate key value violates unique constraint/i).should('be.visible');



  })
})