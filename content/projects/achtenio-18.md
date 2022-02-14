---
name: achtenio
repo: achtenio-18
languages:
  - JavaScript
  - CSS
  - HTML
heroImage: >-
  https://camo.githubusercontent.com/e54fc3b6d87c1ecfc089bea97ed98b316f5e8a25386ae7539e70c62b2963eb04/68747470733a2f2f6d69722d73332d63646e2d63662e626568616e63652e6e65742f70726f6a6563745f6d6f64756c65732f313430302f30306634623736343937353730372e356165353135386461376631312e6a7067
branch: master
---
# R/A Portfolio Site

![Portfolio hero img](https://mir-s3-cdn-cf.behance.net/project_modules/1400/00f4b764975707.5ae5158da7f11.jpg)

## Overview
This portfolio site looks provide an insight into my latest projects as well as information about myself as a designer and developer. The site combines a number of technologies and processes of interest to me; namely use of React, Three.js animations and SVG image filters.

![Portfolio hero img](https://mir-s3-cdn-cf.behance.net/project_modules/1400/38f80364975707.5ae4631a33c9b.jpg)

## Component Structure
The portfolio site is built using a simplistic React component structure. Since the data structure and state management was fairly minimalistic, no need for Redux or the likes was required.

![Portfolio component structure](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4bd05a64975707.5ae51164c1368.png)

Pages required to load external resources, such as images and videos, trigger a loading screen before being displayed. Similarly, a number of pages require the use of Three.js and SVG filter animations, both of which were abstracted into their own components.

![Portfolio landing page](https://mir-s3-cdn-cf.behance.net/project_modules/1400/78794864975707.5ae457d27e029.jpg)

## Landing Page
The landing page presents a carousel (of sorts) transitioning between the different case studies housed on the work page.

![Three.js animation process](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b775ae64975707.5ae50fcd0e163.png)

### Three.js animation
The notion of a carousel was applied to a rotating octahedron, with textures produced from case studies transitioning every 10 seconds. In addition to the mesh of the octahedron rotating, the texture’s UV coordinates are also animated to create a kaleidoscopic effect.

![Portfolio work page](https://mir-s3-cdn-cf.behance.net/project_modules/1400/4fc39564975707.5ae45ac9d1f8e.jpg)

## Work Page
The work page provides an array of thumbnails linking to each of the case studies on the site. These thumbnails were pre-rendered using icosahedron geometry in Cinema 4D. To make these somewhat dynamic, an SVG filter is applied to the images and animated when the user hovers over them.

![SVG filter process](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/37fee364975707.5ae510842c797.png)

### SVG Filter
The SVG filter is comprised of two key steps. First, a turbulence filter using fractal noise is created before being passed along with the source image into a displacement filter. The scale of displacement is incremented each animation frame. The resulting image is then rendered to the screen.

![Portfolio project page](https://mir-s3-cdn-cf.behance.net/project_modules/1400/b7e91464975707.5ae457d27d450.jpg)

## Project Page
Since the majority of my work is already documented thoroughly on Behance or GitHub, the project pages are intended to be primarily visual, linking to other sources of documentation if the viewer is interested in further information.

Both the Three.js and SVG filter animations are use on project pages. The Three.js animation acts as a header for the pages, while the SVG filter is applied to each of the images on hover.

Ryan Achten, 2018
