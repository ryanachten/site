# Simple steps for SEO using Nuxt and AWS

## Lighthouse and Core Web Vitals
A site's Core Web Vitals [play a role](https://www.searchenginejournal.com/ranking-factors/core-web-vitals/) in terms of how a site gets ranked in a Google search.

Using Lighthouse scores as a starting point, we can see where we need to make improvements to our Nuxt application. Out of the box, the Nuxt application has scores of 100 for all metrics except performance, which sat at around 80 without any tuning - pretty good considering the site in question has some heavy Three.js and WebGL animations at play.

Following Lighthouse advice, the following changes were made:
- Use `.webp` format instead of `.jpg`
  - Uses better compression than .jpg and is now well supported by modern browsers 
- Move `.svg` code out of component into static resources
  - In our case, adding this inline in the component code bloated the .js bundle *a lot*. The svg was doing nothing dynamic, so it makes more sense to deliver this as a static resource
- Use display swap for Google Fonts
  - Using [Nuxt Google Fonts](https://google-fonts.nuxtjs.org/), this is as simple as adding `googleFonts: { display: 'swap', ... }` 
- Add [modern](https://nuxtjs.org/docs/configuration-glossary/configuration-modern/) build to Nuxt
  - To prevent delivering polyfills to modern browsers which don't need it

## Google Search Console optimisations
- Add Route53 domain to Amplify
- Add TXT record with Google Search Console site verification token to Route53 domain
  - Ensure this sits on the same subdomain as the website, otherwise Google Search Console doesn't seem to pick it up
