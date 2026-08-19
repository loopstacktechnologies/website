import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        about: resolve(__dirname, 'about.html'),
        process: resolve(__dirname, 'our-process.html'),
        careers: resolve(__dirname, 'careers.html'),
        technologies: resolve(__dirname, 'technologies.html'),
        blog: resolve(__dirname, 'blog.html'),
        webDev: resolve(__dirname, 'web-development.html'),
        mobileApps: resolve(__dirname, 'mobile-apps.html'),
        cloudDevops: resolve(__dirname, 'cloud-devops.html'),
        uiUx: resolve(__dirname, 'ui-ux-design.html'),
        apiIntegrations: resolve(__dirname, 'api-integrations.html'),
        caseStudies: resolve(__dirname, 'case-studies.html'),
        featuredProjects: resolve(__dirname, 'featured-projects.html'),
        clientReviews: resolve(__dirname, 'client-reviews.html'),
      },
    },
  },
});
