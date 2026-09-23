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
  schema: z.object({
    // Título corto para tarjetas/breadcrumbs/listados.
    titulo: z.string(),
    // H1 editorial y persuasivo de la página del artículo — distinto de
    // `titulo` y de `seo.meta_title`.
    h1: z.string(),
    extracto: z.string(),
    fecha_publicacion: z.date(),
    fecha_actualizacion: z.date().optional(),
    autor: z.string().default('Equipo nubenca'),
    // TODO: migrar a la función `image()` del loader (con foto real) para
    // que pase por el pipeline de <Image/> de Astro (webp/avif). Por ahora
    // es una ruta a un placeholder en /public mientras no hay fotografía
    // real de marca.
    imagen_portada: z.string(),
    imagen_portada_alt: z.string(),
    tags: z.array(z.string()).default([]),
    destacado: z.boolean().default(false),
    seo: seoSchema,
  }),
});

export const collections = { blog };
