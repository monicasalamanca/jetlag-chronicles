import { factories } from '@strapi/strapi';

// Read-only for the website: only find/findOne are exposed (writes happen in the admin panel).
export default factories.createCoreRouter('api::author.author', { only: ['find', 'findOne'] });
