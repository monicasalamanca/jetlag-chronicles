import { factories } from '@strapi/strapi';

// Read-only for the website: a single type only needs find (writes happen in the admin panel).
export default factories.createCoreRouter('api::home.home', { only: ['find'] });
