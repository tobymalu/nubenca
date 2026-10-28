import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Objeto `seo` compartido por toda colección de "producto"/contenido.
 * meta_title y meta_description son independientes del H1 editorial y
 * del título corto usado en tarjetas — nunca reutilizar el mismo string
 * para los tres.
 */
const seoSchema = z.object({
  meta_title: z.string(),
  meta_description: z.string(),
  canonical: z.string().url().optional(),
  og_image: z.string().optional(),
  noindex: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      // Título corto para tarjetas/breadcrumbs/listados.
      titulo: z.string(),
      // H1 editorial y persuasivo de la página del artículo — distinto de
      // `titulo` y de `seo.meta_title`.
      h1: z.string(),
      extracto: z.string(),
      fecha_publicacion: z.date(),
      fecha_actualizacion: z.date().optional(),
      autor: z.string().default('Equipo nubenca'),
      // Ruta relativa a un archivo junto al post (ej. "./cover.jpg") —
      // pasa por el pipeline de <Image/> de Astro (webp/avif).
      imagen_portada: image(),
      imagen_portada_alt: z.string(),
      tags: z.array(z.string()).default([]),
      destacado: z.boolean().default(false),
      // Slugs de otros posts del mismo cluster temático, para el bloque
      // "Artículos relacionados" y el enlazado interno entre clusters.
      relacionados: z.array(z.string()).default([]),
      // Preguntas frecuentes opcionales — si existen, [slug].astro renderiza
      // la sección "Preguntas frecuentes" y el schema FAQPage (JSON-LD).
      faq: z
        .array(
          z.object({
            pregunta: z.string(),
            respuesta: z.string(),
          })
        )
        .optional(),
      seo: seoSchema,
    }),
});

export const collections = { blog };
