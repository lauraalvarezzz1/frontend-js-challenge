import { Component } from '@angular/core';

@Component({
  selector: 'app-app-page-not-found',
  template: `
    <h1>¡Oh, vaya! Parece que no podemos encontrar lo que buscas</h1>
    <p>Por favor, asegurate de que la dirección URL que buscas es correcta.</p>
    <div class="button__container">
      <a class="app-button app-button--primary" routerLink="/"
        >Volver al inicio</a
      >
    </div>
  `,
  styles: [
    `
      h1,
      p {
        text-align: center;
        margin-bottom: 2rem;
      }
      .app-button {
        width: 100%;
      }
      @media screen and (min-width: 768px) {
        .button__container {
          display: flex;
          justify-content: center;
        }
        .app-button {
          width: 40%;
          max-width: 450px;
          font-size: 1.2rem;
        }
      }
      @media screen and (min-width: 1440px) {
        .app-button {
          font-size: 1.6rem;
        }
      }
    `,
  ],
})
export class AppPageNotFoundComponent {}
