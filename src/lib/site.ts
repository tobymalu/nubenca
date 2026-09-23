/**
 * Datos de marca centralizados. Todo componente que necesite nombre,
 * contacto o links de nubenca debe importar de aquí — nunca hardcodear
 * estos valores en un componente individual.
 *
 * ⚠️ PENDIENTE: los valores marcados con TODO son placeholders de
 * desarrollo. Hay que reemplazarlos por los datos reales antes de lanzar
 * a producción (teléfono, WhatsApp, email).
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
  gtmId: 'GTM-WZLM9RPH',
} as const;

export function whatsappUrl(message: string = SITE.whatsapp.defaultMessage): string {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Arma el mensaje de WhatsApp a partir de los datos del LeadForm.
 * Se usa tanto al enviar el form como en /gracias (leyendo los mismos
 * datos desde la querystring) para no duplicar la redacción del mensaje.
 */
export function buildDiagnosticoMessage(params: {
  nombre?: string | null;
  telefono?: string | null;
  interes?: string | null;
}): string {
  const nombre = params.nombre?.trim();
  const telefono = params.telefono?.trim();
  const interes = params.interes?.trim();

  if (!nombre || !telefono) return SITE.whatsapp.defaultMessage;

  const interesTexto = interes ? interes.toLowerCase() : 'una cobertura';
  return `Hola, soy ${nombre}. Me interesa ${interesTexto} y quiero agendar mi diagnóstico de 15 minutos. Mi WhatsApp: ${telefono}.`;
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

export type PartnerLink = {
  href: string;
  label: string;
};

/** Socios comerciales — se muestran en el footer (no en el footer minimal). */
export const PARTNER_LINKS: PartnerLink[] = [
  { href: 'https://www.vallartamagico.com', label: 'Vallarta Mágico' },
  { href: 'https://www.praben.com', label: 'Praben' },
  { href: 'https://www.islamarietas.com', label: 'Islas Marietas' },
];
