import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: `Blog | ${siteConfig.name}`,
    description: 'Artículos, tutoriales y reflexiones sobre análisis de datos, ciencia de datos y más.',
};