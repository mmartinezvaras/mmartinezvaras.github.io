import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/layout/header';
import { Footer } from './core/layout/footer';
import { TabBar } from './core/layout/tab-bar';
import { I18n } from './core/i18n';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, TabBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  t = inject(I18n).t;
  skip = { es: 'Saltar al contenido', en: 'Skip to content' };

  constructor() {
    // Safari en iOS no aplica :active (la respuesta visual al pulsar) si la página no escucha toques.
    // Un listener pasivo y vacío basta, y no frena el scroll.
    document.addEventListener('touchstart', () => {}, { passive: true });
  }
}
