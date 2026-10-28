import * as THREE from 'three'

const SKY_VERTEX_SHADER = `
  varying vec3 vDirection;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vDirection = worldPosition.xyz - cameraPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const SKY_FRAGMENT_SHADER = `
  varying vec3 vDirection;
  void main() {
    vec3 d = normalize(vDirection);
    float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 zenith = mix(vec3(.20,.29,.40), vec3(.42,.57,.70), smoothstep(.18, .92, h));
    float horizon = 1.0 - smoothstep(-.12, .48, d.y);
    vec3 sky = mix(zenith, vec3(.82,.54,.43), horizon * .78);
    vec3 sunDir = normalize(vec3(-.52, .20, -1.0));
    float sun = max(dot(d, sunDir), 0.0);
    sky += vec3(1.0, .66, .37) * pow(sun, 420.0) * 1.8;
    sky += vec3(.85, .42, .29) * exp(-max(0.0, 1.0 - sun) * 23.0) * .22;
    gl_FragColor = vec4(sky, 1.0);
  }
`

/** A dawn sky dome: cool zenith, warm horizon, and a soft sunrise glow, built entirely from a shader (no texture). */
export function ProceduralSky(): JSX.Element {
  return (
    <mesh renderOrder={-100}>
      <sphereGeometry args={[180, 32, 20]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        depthTest={false}
        vertexShader={SKY_VERTEX_SHADER}
        fragmentShader={SKY_FRAGMENT_SHADER}
      />
    </mesh>
  )
}
