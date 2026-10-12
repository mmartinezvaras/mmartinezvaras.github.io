import { Component, computed, inject, signal } from '@angular/core';
import { I18n, ui } from '../../core/i18n';
import { Reveal } from '../../core/reveal';
import { site } from '../../data/site';

@Component({
  selector: 'app-contacto',
  imports: [Reveal],
  template: `
    <section class="wrap pt-12 sm:pt-24">
      <p appReveal class="eyebrow">{{ t(text.eyebrow) }}</p>
      <h1 appReveal class="display mt-3" style="--i: 1">{{ t(text.title) }}</h1>
      <p appReveal class="lead mt-5 max-w-2xl" style="--i: 2">{{ t(site.seeking) }} {{ t(site.availability) }}.</p>

      <div class="mt-12 grid gap-5 md:grid-cols-2">
        <!-- min-w-0: sin él, el email largo ensancha la columna y desborda a 390px -->
        <div class="flex min-w-0 flex-col gap-5">
          <ul appReveal class="panel overflow-hidden" [attr.aria-label]="t(text.channels)">
            @for (c of channels; track c.label) {
              <li class="border-b last:border-b-0">
                <a class="row flex min-h-16 items-center gap-4 px-6 py-3" [href]="c.href"
                   [attr.target]="c.external ? '_blank' : null" [attr.rel]="c.external ? 'noopener' : null">
                  <span class="w-20 shrink-0 font-semibold">{{ c.label }}</span>
                  <span class="min-w-0 flex-1 text-muted [overflow-wrap:anywhere]">{{ c.text }}</span>
                  <svg viewBox="0 0 24 24" class="size-4 shrink-0 text-muted" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                  @if (c.external) { <span class="sr-only">{{ t(text.newTab) }}</span> }
                </a>
              </li>
            }
          </ul>

          <!-- flex-1: se estira hasta la altura del bloque "Escríbeme"; el botón queda abajo -->
          <div appReveal class="panel flex flex-1 flex-col px-6 py-8 sm:p-8" style="--i: 1">
            <h2 class="text-2xl">{{ t(text.cvTitle) }}</h2>
            <p class="mb-6 mt-2 text-muted">{{ t(text.cvText) }}</p>
            <div class="mt-auto flex flex-wrap gap-3">
              <a [href]="i18n.cv().main.href" [attr.download]="i18n.cv().main.file" class="btn btn-solid">{{ i18n.cv().main.label }} (PDF)</a>
              <a [href]="i18n.cv().other.href" [attr.download]="i18n.cv().other.file" [attr.hreflang]="i18n.cv().other.lang" [attr.lang]="i18n.cv().other.lang" class="btn btn-ghost">{{ i18n.cv().other.label }}</a>
            </div>
          </div>
        </div>

        <form appReveal class="panel px-6 py-8 sm:p-8" style="--i: 2" novalidate (submit)="$event.preventDefault(); send()">
          <h2 class="text-2xl">{{ t(text.formTitle) }}</h2>
          <p class="mt-2 text-muted">{{ t(text.formText) }}</p>

          <label for="name" class="mt-6 block text-sm font-semibold">{{ t(text.name) }}</label>
          <input id="name" type="text" autocomplete="name" enterkeyhint="next" required
                 class="field mt-2" [attr.aria-invalid]="showErrors() && !name().trim()"
                 [attr.aria-describedby]="showErrors() && !name().trim() ? 'name-error' : null"
                 (input)="name.set(value($event))" />
          @if (showErrors() && !name().trim()) {
            <p id="name-error" class="mt-2 text-sm font-medium">{{ t(text.nameError) }}</p>
          }

          <label for="message" class="mt-5 block text-sm font-semibold">{{ t(text.message) }}</label>
          <textarea id="message" rows="5" required class="field mt-2 resize-y"
                    [attr.aria-invalid]="showErrors() && !message().trim()"
                    [attr.aria-describedby]="showErrors() && !message().trim() ? 'message-error' : null"
                    (input)="message.set(value($event))"></textarea>
          @if (showErrors() && !message().trim()) {
            <p id="message-error" class="mt-2 text-sm font-medium">{{ t(text.messageError) }}</p>
          }

          <button type="submit" class="btn btn-solid mt-6 w-full sm:w-auto">{{ t(text.submit) }}</button>

          <!-- Si el dispositivo no tiene app de correo, el mailto no hace nada: damos la alternativa -->
          <div aria-live="polite">
            @if (sent()) {
              <p class="mt-5 text-[0.9375rem]">
                {{ t(text.notOpened) }} <span class="font-semibold [overflow-wrap:anywhere]">{{ site.email }}</span>.
              </p>
              <button type="button" class="btn btn-ghost mt-3" (click)="copy()">
                {{ t(copied() === 'ok' ? text.copied : text.copy) }}
              </button>
              @if (copied() === 'error') {
                <p class="mt-2 text-sm">{{ t(text.copyError) }}</p>
              }
            }
          </div>
        </form>
      </div>
    </section>
  `
})
export default class Contacto {
  site = site;
  i18n = inject(I18n);
  t = this.i18n.t;
  text = {
    ...ui,
    eyebrow: { es: 'Contacto', en: 'Contact' },
    title: { es: 'Hablemos.', en: "Let's talk." },
    channels: { es: 'Formas de contacto', en: 'Ways to get in touch' },
    cvTitle: { es: 'Mi CV', en: 'My CV' },
    cvText: {
      es: 'Una página con formación, experiencia, proyectos y habilidades.',
      en: 'One page with my education, experience, projects and skills.',
    },
    formTitle: { es: 'Escríbeme', en: 'Write to me' },
    formText: {
      es: 'Se abrirá tu aplicación de correo con el mensaje ya escrito.',
      en: 'Your email app will open with the message ready to send.',
    },
    name: { es: 'Tu nombre', en: 'Your name' },
    nameError: { es: 'Escribe tu nombre.', en: 'Please enter your name.' },
    message: { es: 'Mensaje', en: 'Message' },
    messageError: { es: 'Escribe un mensaje.', en: 'Please write a message.' },
    submit: { es: 'Abrir en mi correo', en: 'Open in my email app' },
    notOpened: { es: '¿No se ha abierto tu correo? Escríbeme a', en: "Didn't your email app open? Write to me at" },
    copy: { es: 'Copiar email', en: 'Copy email' },
    copied: { es: 'Copiado', en: 'Copied' },
    copyError: {
      es: 'No se ha podido copiar. Selecciona el email de arriba y cópialo a mano.',
      en: "Couldn't copy it. Select the email address above and copy it manually.",
    },
    subject: { es: 'Contacto desde tu portfolio', en: 'Message from your portfolio' },
  };
  name = signal('');
  message = signal('');
  showErrors = signal(false);
  sent = signal(false);
  copied = signal<'idle' | 'ok' | 'error'>('idle');

  channels = [
    { label: 'Email', text: site.email, href: 'mailto:' + site.email, external: false },
    { label: 'LinkedIn', text: 'Marcos María Martínez Varas', href: site.linkedin, external: true },
    { label: 'GitHub', text: 'github.com/mmartinezvaras', href: site.github, external: true }
  ];

  private mailto = computed(() => {
    const subject = this.t(this.text.subject) + (this.name() ? ' - ' + this.name() : '');
    const body = this.message() + (this.name() ? '\n\n' + this.name() : '');
    return 'mailto:' + site.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  value(e: Event) {
    return (e.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  send() {
    if (!this.name().trim() || !this.message().trim()) {
      this.showErrors.set(true);
      // Lleva el foco al primer campo vacío
      document.getElementById(!this.name().trim() ? 'name' : 'message')?.focus();
      return;
    }
    this.showErrors.set(false);
    this.sent.set(true);
    window.location.href = this.mailto();
  }

  async copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      this.copied.set('ok');
      setTimeout(() => this.copied.set('idle'), 2500);
    } catch {
      this.copied.set('error');
    }
  }
}
