import type { Core } from '@strapi/strapi';
import { errors } from '@strapi/utils';
import { publishProblems, type PostDraft } from './post-rules';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // Refuse to publish a post that would break the site (no author, place story without a country,
    // photos without alt text). The editor sees the message in the admin panel.
    strapi.documents.use(async (context, next) => {
      if (context.uid === 'api::post.post' && context.action === 'publish') {
        const { documentId, locale } = context.params as { documentId: string; locale?: string };
        const draft = await strapi.documents('api::post.post').findOne({
          documentId,
          locale,
          status: 'draft',
          populate: { country: { fields: ['id'] }, author: { fields: ['id'] } },
        });
        const problems = draft ? publishProblems(draft as PostDraft) : [];
        if (problems.length > 0) throw new errors.ValidationError(`Can't publish yet. ${problems.join(' ')}`);
      }
      return next();
    });
  },

  bootstrap() {},
};
