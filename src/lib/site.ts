/**
 * Datos de marca centralizados. Todo componente que necesite nombre,
 * contacto o links de nubenca debe importar de aquí — nunca hardcodear
 * estos valores en un componente individual.
 *
 * ⚠️ PENDIENTE: los valores marcados con TODO son placeholders de
 * desarrollo. Hay que reemplazarlos por los datos reales antes de lanzar
 * a producción (teléfono, WhatsApp, email, GTM ID).
 */

export const SITE = {
  name: 'nubenca',
  tagline: 'Gestión de riesgos boutique para quienes no tienen tiempo que perder',
  // Dominio real de producción — debe coincidir con `site` en astro.config.mjs
  url: 'https://nubenca.com',
  // TODO: confirmar el email real de contacto (¿hola@nubenca.com?)
  email: 'hola@nubenca.com',
  phone: {
    // TODO: teléfono real, formato de despliegue
    display: '(33) 0000 0000',
    // TODO: mismo teléfono en formato E.164 para el atributo href="tel:"
    e164: '+523300000000',
  },
  whatsapp: {
    // TODO: número real de WhatsApp, sin "+" ni espacios (formato wa.me)
    number: '523300000000',
    defaultMessage:
      'Hola, me gustaría agendar un diagnóstico de 15 minutos con nubenca.',
  },
  social: {
    // TODO: completar o quitar las redes que no apliquen
    instagram: '',
    linkedin: '',
  },
  // TODO: ID real del contenedor de Google Tag Manager
  gtmId: 'GTM-XXXXXXX',
} as const;

export function whatsappUrl(message: string = SITE.whatsapp.defaultMessage): string {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Endpoint de Formspree para el registro de leads (LeadForm.astro). */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/moevwakr';

export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/diagnostico', label: 'Diagnóstico' },
];
