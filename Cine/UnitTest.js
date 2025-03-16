/*Estaba probando cosas de UnitTest de JavaScript
He copiado cosillas de por ahí con ayuda de IA pero no entiendo como lanzarlo asi es que me lo dejo
asi para mas adelante.
*/


const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load the HTML content for testing (you might need to adjust the path)
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');
const { window } = new JSDOM(html, { runScripts: 'dangerously' });
const { document } = window;
global.document = document;
global.window = window;
global.localStorage = window.localStorage;
global.alert = (message) => console.log(message); // Replace global alert

// Load your script (assuming it's in the same directory as this test file)
const scriptContent = fs.readFileSync(path.resolve(__dirname, './ventaEntradas.js'), 'utf-8');
eval(scriptContent); // Eval will execute your script

describe('Cine Ticket System', () => {
  beforeEach(() => {
    // Reset variables before each test
    aVendidas1 = [];
    aVendidas2 = [];
    aVendidas3 = [];
    vendidas = [];
    asientos = [];
    numButacas = 0;
    sala = 0;
    butacaSel = 0;
    peli = "";
    contenedor.innerHTML=""; //Clear HTML
    localStorage.clear()
  });

  describe('seleccionarPeli', () => {
    it('Deberia de inicializar las variables correctamente para la pelicula 1', () => {
      const button = document.createElement('button');
      button.id = 'peli1';
      document.body.appendChild(button);

      button.addEventListener('click', seleccionarPeli);
      const event = new window.Event('click');
      button.dispatchEvent(event);

      expect(sala).toBe("1");
      expect(peli).toBe("Que bello es vivir");
      expect(numButacas).toBe(50);
      expect(butacaSel).toBe(0);
      expect(vendidas).toEqual([]);
    });

    it('Deberia de inicializar las variables correctamente para la pelicula 2', () => {
      const button = document.createElement('button');
      button.id = 'peli2';
      document.body.appendChild(button);

      button.addEventListener('click', seleccionarPeli);
      const event = new window.Event('click');
      button.dispatchEvent(event);

      expect(sala).toBe("2");
      expect(peli).toBe("Solo en casa");
      expect(numButacas).toBe(120);
      expect(butacaSel).toBe(0);
      expect(vendidas).toEqual([]);
    });

    it('Deberia de inicializar las variables correctamente para la pelicula 3', () => {
      const button = document.createElement('button');
      button.id = 'peli3';
      document.body.appendChild(button);

      button.addEventListener('click', seleccionarPeli);
      const event = new window.Event('click');
      button.dispatchEvent(event);

      expect(sala).toBe("3");
      expect(peli).toBe("Cuento de Navidad");
      expect(numButacas).toBe(60);
      expect(butacaSel).toBe(0);
      expect(vendidas).toEqual([]);
    });

    it('Deberia de cargar los asientos vendidos en peli 1 ', () => {
      aVendidas1 = [1, 2, 3];
      const button = document.createElement('button');
      button.id = 'peli1';
      document.body.appendChild(button);
      button.addEventListener('click', seleccionarPeli);

      const event = new window.Event('click');
      button.dispatchEvent(event);

      expect(vendidas).toEqual([1, 2, 3]);
    });
  });

  describe('seleccionar', () => {
    it('deberia de añadir el asiento a vendidas y asientos cuando selecciona un asiento libre ', () => {
      const button = document.createElement('button');
      button.id = 'butaca1';
      button.className = 'libre';
      button.addEventListener('click', seleccionar);

      const event = new window.Event('click');
      Object.defineProperty(event, 'target', { value: button });
      button.dispatchEvent(event);

      expect(vendidas).toEqual([1]);
      expect(asientos).toEqual([1]);
      expect(button.className).toBe('seleccionado');
      expect(butacaSel).toBe(1);
    });

    it('deberia de quitar el asiento de vendidas y asientos cuando deselecciona un asiento seleccionado ', () => {
      vendidas = [1];
      asientos = [1];
      butacaSel = 1;
      const button = document.createElement('button');
      button.id = 'butaca1';
      button.className = 'seleccionado';
      button.addEventListener('click', seleccionar);

      const event = new window.Event('click');
      Object.defineProperty(event, 'target', { value: button });
      button.dispatchEvent(event);

      expect(vendidas).toEqual([]);
      expect(asientos).toEqual([]);
      expect(button.className).toBe('libre');
      expect(butacaSel).toBe(0);
    });
  });

  describe('confirmarVenta', () => {
    it('deberia actualizar aVendidas1 cuando sala es 1 y hay asientos seleccionados', () => {
      sala = "1";
      vendidas = [1, 2, 3];
      asientos=[1,2,3];
      butacaSel = 3;
      confirmarVenta();
      expect(aVendidas1).toEqual([1, 2, 3]);
    });

    it('deberia actualizar aVendidas2 cuando sala es 2 y hay asientos seleccionados', () => {
      sala = "2";
      vendidas = [1, 2, 3];
      asientos=[1,2,3];
      butacaSel = 3;
      confirmarVenta();
      expect(aVendidas2).toEqual([1, 2, 3]);
    });

    it('deberia actualizar aVendidas3 cuando sala es 3 y hay asientos seleccionados', () => {
      sala = "3";
      vendidas = [1, 2, 3];
      asientos=[1,2,3];
      butacaSel = 3;
      confirmarVenta();
      expect(aVendidas3).toEqual([1, 2, 3]);
    });

    it('Deberia de sacar una alerta cuando se seleccionan mas de 5 asientos', () => {
      butacaSel = 6;
      const alertSpy = jest.spyOn(global, 'alert');
      confirmarVenta();
      expect(alertSpy).toHaveBeenCalledWith("No se pueden comprar más de 5 localidades");
      alertSpy.mockRestore(); // Restore the original alert
    });
    it('Deberia de sacar la alerta cuando no hay asientos seleccionados', () => {
        butacaSel = 0;
        const alertSpy = jest.spyOn(global, 'alert');
        confirmarVenta();
        expect(alertSpy).toHaveBeenCalledWith("No ha seccionado ninguna localidad");
        alertSpy.mockRestore(); // Restore the original alert
      });

    it('deberia llamar a imprimirTicket si es un numero valido de asientos', () => {
        butacaSel = 3;
        asientos=[1,2,3];
        sala="1";
        const imprimirTicketSpy = jest.spyOn(window, 'imprimirTicket');
        confirmarVenta();
        expect(imprimirTicketSpy).toHaveBeenCalled();
        imprimirTicketSpy.mockRestore();
    });
  });

  describe('imprimirTicket', () => {
    it('Debería configurar los datos correctos en localStorage y restablecer las matrices', () => {
        butacaSel = 3;
        asientos=[1,2,3];
        peli="Test";
        const originalWindowOpen = window.open;
        window.open = jest.fn();
        imprimirTicket();
        window.open = originalWindowOpen;

        expect(localStorage.getItem('pelicula')).toBe("Test");
        expect(localStorage.getItem('asientos')).toBe('1,2,3');
        expect(localStorage.getItem('importe')).toBe('9');
        expect(asientos).toEqual([]);
        expect(vendidas).toEqual([]);
    });
    it('Debería configurar los datos correctos en localStorage y restablecer las matrices', () => {
        butacaSel = 1;
        asientos=[1];
        peli="Test";
        const originalWindowOpen = window.open;
        window.open = jest.fn();
        imprimirTicket();
        window.open = originalWindowOpen;
    
        expect(localStorage.getItem('pelicula')).toBe("Test");
        expect(localStorage.getItem('asientos')).toBe('1');
        expect(localStorage.getItem('importe')).toBe('3');
        expect(asientos).toEqual([]);
        expect(vendidas).toEqual([]);
    });
});
});
