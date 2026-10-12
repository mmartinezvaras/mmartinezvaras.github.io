import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { I18n } from './i18n';
import { site } from '../data/site';

describe('I18n', () => {
  beforeEach(() => {
    document.documentElement.lang = 'es';
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('empieza en español y traduce objetos { es, en }', () => {
    const i18n = TestBed.inject(I18n);
    expect(i18n.lang()).toBe('es');
    expect(i18n.t({ es: 'Hola', en: 'Hello' })).toBe('Hola');
    expect(i18n.t('GitHub')).toBe('GitHub');
  });

  it('al cambiar a inglés actualiza <html lang>, guarda la elección y cambia el CV principal', () => {
    const i18n = TestBed.inject(I18n);
    i18n.toggle();
    expect(i18n.lang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
    expect(i18n.t({ es: 'Hola', en: 'Hello' })).toBe('Hello');
    expect(i18n.cv().main.href).toBe(site.cvEn);
    // El secundario pasa a ser el CV en español, con su idioma marcado
    expect(i18n.cv().other).toEqual({ href: site.cv, file: site.cvFileName, label: 'CV en español', lang: 'es' });
  });
});
