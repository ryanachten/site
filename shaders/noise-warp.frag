precision mediump float;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
varying vec2 vUv;
uniform float time;

vec2 random2(vec2 st) {
  st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

// TODO: consider using the glsl-noise/simplex library
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)), dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x), mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  // Image warp logic
  // TODO: deduplicate this logic in vertical-warp shader using glsify
  vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
  float hn = noise(newUV.xy * resolution.xy / 100.0);
  vec2 d = vec2(0., normalize(vec2(0.5, 0.5) - newUV.xy).y);
  vec2 uv1 = newUV + d * progress / 5.0 * (1.0 + hn / 2.0);
  vec2 uv2 = newUV - d * (1.0 - progress) / 5.0 * (1.0 + hn / 2.0);
  vec4 t1 = texture2D(texture1, uv1);
  vec4 t2 = texture2D(texture2, uv2);
  vec4 image = mix(t1, t2, progress);

  // Noise mask - Inspired by https://thebookofshaders.com/edit.php#11/splatter.frag
  vec2 st = gl_FragCoord.xy / resolution.xy;
  st.x *= resolution.x / resolution.y;

  vec3 color = vec3(0.0);
  float t = 1.0;

  float complexity = 5.; // originally, 5.
  float speed = .3; // originall .1
  t = 1.0 - cos(time * speed) * complexity;

  // Scale frequency based on resolution to maintain consistent noise across devices
  float minResolution = min(resolution.x, resolution.y);
  float scaleFactor = minResolution / 800.0; // normalize to a base resolution
  float frequency = max(1.0, scaleFactor); // ensure minimum frequency of 1.0
  
  st += noise(st * frequency) * t; // Animate the coordinate space - original noise(st*2.)

  // Adjusted smoothstep values for better visibility on mobile
  color = vec3(1.) * smoothstep(.30, .42, noise(st)); // big drops - original .18,.2,noise(st)
  color += smoothstep(.25, .42, noise(st * 10.)); // splatter - original .15,.2, noise(st*10.)
  color -= smoothstep(.68, .82, noise(st * 10.)); // splatter holes - original .35,.4,noise(st*10.)
  vec4 mask = vec4(color, color.r);

  gl_FragColor = image * mask;
}
