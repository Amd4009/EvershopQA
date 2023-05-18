import faker from 'faker';
describe('Shopping Feature with Login', () => {
    beforeEach(() => {
        cy.visit('https://demo.evershop.io/');
        cy.wait(1200);
    });

    it('Login then shopping ', () => {
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
            cy.visit('https://demo.evershop.io/account/');
            //cek isi cart setelah login
            cy.visit('https://demo.evershop.io/cart');
            cy.wait(3000);

        });

        // masuk ke kategori Men dan pilih produk pertama
        cy.xpath("//a[normalize-space()='Men']").click();
        cy.wait(1000);
        cy.xpath("//img[@alt='Edge gameday shoes']").click();
        // pilih variasi product
        cy.xpath("//a[normalize-space()='L']").click();
        cy.xpath("//a[normalize-space()='Red']").click();
        cy.wait(2500);
        // Input jumlah produk (1 pc)
        cy.xpath("//input[@placeholder='Qty']").clear().type('1');
        cy.wait(2000);
        cy.xpath("//button[@type='button']").click(); // klik add to cart
        cy.wait(4000);
        cy.xpath("//div[contains(text(), 'JUST ADDED TO YOUR CART')]").should('be.visible'); // verifikasi product berhasil masuk cart 

        // masuk kategori kids dan pilih produk kedua
        cy.xpath("//a[normalize-space()='Kids']").click();
        cy.wait(1500);
        cy.xpath("//span[normalize-space()='Continental 80 shoes']").click();
        cy.xpath("//a[normalize-space()='Pink']").click();
        cy.wait(2500);
        cy.xpath("//input[@placeholder='Qty']").clear().type('1');
        cy.xpath("//a[normalize-space()='L']").click();
        cy.wait(2000);
        cy.xpath("//span[normalize-space()='ADD TO CART']").click(); // klik add to cart
        cy.wait(4000);
        cy.xpath("//div[contains(text(), 'JUST ADDED TO YOUR CART')]").should('be.visible'); // verifikasi product berhasil masuk cart

        // masuk kategori women dan pilih produk ketiga
        cy.xpath("//a[@class='nav-link hover:underline'][contains(.,'Women')]").click();
        cy.wait(1500);
        cy.xpath("//img[@alt='Nike odyssey react flyknit 2']").click();
        cy.xpath("//input[@placeholder='Qty']").clear().type('1');
        cy.wait(2000);
        cy.xpath("//a[normalize-space()='S']").click();
        cy.xpath("//a[normalize-space()='Blue']").click();
        cy.wait(2800);
        cy.xpath("//span[normalize-space()='ADD TO CART']").click(); // klik add to cart
        cy.wait(4000);
        cy.xpath("//div[contains(text(), 'JUST ADDED TO YOUR CART')]").should('be.visible'); // verifikasi product berhasil masuk cart

        // Menambahkan jumlah item produk 
        cy.visit('https://demo.evershop.io/cart');
        cy.wait(2000);
        cy.xpath("//a[contains(.,'Edge gameday shoes')]").click();
        cy.url().should('contain', 'gameday');
        // pilih varian product
        cy.wait(2000);
        cy.xpath("//input[@placeholder='Qty']").clear().type('3');
        cy.xpath("//a[normalize-space()='S']").click();
        cy.wait(2000);
        cy.xpath("//a[normalize-space()='Red']").click();
        cy.wait(4000);
        cy.xpath("//button[@type='button']").click(); // klik add to cart
        cy.wait(4000);
        cy.xpath("//div[contains(text(), 'JUST ADDED TO YOUR CART')]").should('be.visible'); // verifikasi product berhasil masuk cart

        // Remove item from shopping cart
        cy.visit('https://demo.evershop.io/cart');
        cy.wait(2000);
        cy.xpath("(//span[contains(text(),'Remove')])[1]").click();
        cy.wait(3200);

        // Checkout items
        cy.url().should('contain', 'cart');
        cy.xpath("//a[contains(@class,'button primary')]").click();
        cy.url().should('contain', 'checkout');
        cy.wait(2200);
        // input details for checkout
        cy.xpath("//input[@placeholder='Full name']").type('John Constantine');
        cy.wait(2000);
        cy.xpath("//input[@placeholder='Telephone']").type('08319898700');
        cy.wait(1200);
        // random fake address saja
        const randomAddress = faker.address.streetAddress(); // Menghasilkan alamat acak
        cy.xpath("//input[contains(@name,'address[address_1]')]").type(randomAddress);

        const randomCity = faker.address.city(); // Menghasilkan nama kota acak
        cy.xpath("//input[contains(@name,'address[city]')]").type(randomCity);
        cy.wait(1700);

        // Memilih dropdown negara secara acak
        cy.xpath('//select[contains(@name,"address[country]")]')
            .then($countryDropdown => {
                const countryOptions = $countryDropdown.find('option');
                const nonAlgeriaOptions = countryOptions.not(':contains("Algeria")'); // Mengabaikan opsi negara Algeria
                const randomCountryIndex = Math.floor(Math.random() * nonAlgeriaOptions.length);
                const selectedCountryValue = nonAlgeriaOptions[randomCountryIndex].value;

                cy.wrap($countryDropdown).select(selectedCountryValue);

                // Memilih dropdown province secara acak setelah memilih negara
                cy.wait(1800); // Tambahkan penundaan jika diperlukan untuk memuat pilihan province yang dinamis

                cy.xpath('//select[contains(@name,"address[province]")]')
                    .then($provinceDropdown => {
                        const provinceOptions = $provinceDropdown.find('option');
                        const randomProvinceIndex = Math.floor(Math.random() * provinceOptions.length);
                        const selectedProvinceValue = provinceOptions[randomProvinceIndex].value;

                        cy.wrap($provinceDropdown).select(selectedProvinceValue);
                    });


                // isi post code
                const randomPostcode = faker.address.zipCode();
                cy.xpath("//input[contains(@name,'address[postcode]')]").type(randomPostcode);
                cy.wait(6000); // delay 6 detik agar pilihan shipping muncul
                // milih shipping method secara acak saja dah
                cy.get('span.radio-unchecked').then(($elements) => {
                    const length = $elements.length;
                    const randomIndex = Math.floor(Math.random() * length);
                    cy.get('span.radio-unchecked').eq(randomIndex).click();
                });
                cy.xpath("//button[@type='button']").click(); // Click continue to payment

                // choose payment
                cy.wait(4500);
                cy.xpath("(//*[name()='svg'])[10]").click();
                cy.wait(3500);
                cy.xpath("//button[@type='button'][contains(.,'Place Order')]").click();
                // verifikasi paymen method berhasil 
                cy.wait(2100);
                cy.url().should('contain', '/checkout/success/');


            });

    });

});



