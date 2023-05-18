
describe('Login Feature Evershop', () => {
  beforeEach(() => {
    cy.visit('https://demo.evershop.io/');
    cy.wait(1200);
  });

  it('Login Berhasil', () => {
    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click();
    // Login sukses
    cy.fixture('credentials.json').then(credentials => {
      const { email, password } = credentials.correctLogin;
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.wait(1200); // // Menunda selama 1,2 detik 
      cy.xpath("//button[@type='submit']").click();
      // Cek apakah login berhasil
      cy.url().should('eq', 'https://demo.evershop.io/');
      cy.wait(1500); // Menunda selama 1,5 detik 
      // Logout akun
      cy.visit('https://demo.evershop.io/account/');
      cy.xpath("//a[normalize-space()='Logout']").click();
    });
  });

  it('Login Gagal', () => {
      // back to login page
      cy.xpath("//a[@href='/account/login']//*[name()='svg']").click();
      cy.wait(1200); // Menunda selama 1,2 detik 
      // Login gagal
      cy.fixture('credentials.json').then(credentials => {
        const { email, password } = credentials.incorrectLogin;
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.wait(1200); // Menunda selama 1,2 detik 
        cy.xpath("//button[@type='submit']").click();
        // Cek apakah pesan error muncul
        cy.contains('Invalid email or password').should('be.visible');
      });
    });
  });
