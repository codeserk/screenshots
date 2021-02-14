varying vec4 vColor;
varying float z;

uniform vec3 color;

void main() {
  // Fake colors for now
  float z2 = 0.1 + ( 1000. - z ) / 1000. * vColor.x;
  gl_FragColor = vec4( z2, 0.4, 0.4, 1. );

}
