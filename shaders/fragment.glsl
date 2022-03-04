uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
varying vec2 vUv;
void main() {
  vec4 image1 = texture2D(texture1, vUv);
  vec4 image2 = texture2D(texture2, vUv);
  gl_FragColor = mix(image1, image2, progress);
}
