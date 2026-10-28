import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { fbm } from './noise'

const TREE_COUNT = 480

interface TreePrototype {
  geometry: THREE.BufferGeometry
  material: THREE.Material
}

function buildTreePrototypes(): TreePrototype[] {
  const group = new THREE.Group()

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.085, 0.8, 5),
    new THREE.MeshStandardMaterial({ color: '#40372a', roughness: 1 })
  )
  trunk.position.y = 0.4
  group.add(trunk)

  const pineMaterial = new THREE.MeshStandardMaterial({ color: '#1c3d30', roughness: 1, flatShading: true })
  for (let i = 0; i < 3; i++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.38 - i * 0.085, 0.8, 6), pineMaterial)
    cone.position.y = 0.68 + i * 0.34
    group.add(cone)
  }

  group.updateMatrixWorld(true)
  const prototypes: TreePrototype[] = []
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      const geometry = object.geometry.clone()
      geometry.applyMatrix4(object.matrixWorld)
      prototypes.push({ geometry, material: object.material as THREE.Material })
    }
  })
  return prototypes
}

/** A pine forest scattered across the near valley floor, instanced so the whole forest costs only two draw calls. */
export function Forest(): JSX.Element {
  const prototypes = useMemo(buildTreePrototypes, [])
  const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([])

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D()
    let count = 0

    for (let i = 0; i < TREE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 145
      const z = 4 + Math.random() * 28
      if (x > -10 && x < 12 && z < 18) continue // leave a clearing in front of the chorten

      const y = -1 + fbm(x * 0.06, z * 0.06, 32) * 1.4 + Math.sin(x * 0.045 + 22) * 0.7
      dummy.position.set(x, y, z)
      const scale = 0.62 + Math.random() * 0.8
      dummy.scale.set(scale, scale, scale)
      dummy.rotation.y = Math.random() * Math.PI * 2
      dummy.updateMatrix()

      for (const mesh of meshRefs.current) {
        mesh?.setMatrixAt(count, dummy.matrix)
      }
      count++
    }

    for (const mesh of meshRefs.current) {
      if (mesh) {
        mesh.count = count
        mesh.instanceMatrix.needsUpdate = true
      }
    }
  }, [])

  return (
    <group>
      {prototypes.map((prototype, index) => (
        <instancedMesh
          key={index}
          ref={(mesh) => {
            meshRefs.current[index] = mesh
          }}
          args={[prototype.geometry, prototype.material, TREE_COUNT]}
        />
      ))}
    </group>
  )
}
