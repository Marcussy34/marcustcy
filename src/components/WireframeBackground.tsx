"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type WireframeBackgroundProps = {
  color?: string;
  opacity?: number;
  speed?: number;
  shapeCount?: number;
  className?: string;
};

const WireframeBackground: React.FC<WireframeBackgroundProps> = ({
  color = "#22c55e",
  opacity = 0.15,
  speed = 0.3,
  shapeCount = 8,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create wireframe material
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity,
    });

    // Shape geometries
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.7, 0.3, 8, 12),
      new THREE.BoxGeometry(1, 1, 1),
    ];

    // Create shapes with random positions and properties
    interface ShapeData {
      mesh: THREE.LineSegments;
      rotationSpeed: THREE.Vector3;
      floatSpeed: number;
      floatOffset: number;
      baseY: number;
    }

    const shapes: ShapeData[] = [];

    for (let i = 0; i < shapeCount; i++) {
      const geoIndex = Math.floor(Math.random() * geometries.length);
      const geometry = geometries[geoIndex];
      const edges = new THREE.EdgesGeometry(geometry);
      const wireframe = new THREE.LineSegments(edges, material.clone());

      // Random scale
      const scale = 1 + Math.random() * 3;
      wireframe.scale.setScalar(scale);

      // Random position in a wider area
      wireframe.position.x = (Math.random() - 0.5) * 60;
      wireframe.position.y = (Math.random() - 0.5) * 40;
      wireframe.position.z = (Math.random() - 0.5) * 20 - 10;

      // Random initial rotation
      wireframe.rotation.x = Math.random() * Math.PI;
      wireframe.rotation.y = Math.random() * Math.PI;
      wireframe.rotation.z = Math.random() * Math.PI;

      // Vary opacity slightly per shape
      (wireframe.material as THREE.LineBasicMaterial).opacity =
        opacity * (0.5 + Math.random() * 0.5);

      scene.add(wireframe);

      shapes.push({
        mesh: wireframe,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: wireframe.position.y,
      });
    }

    // Clock for animation
    const clock = new THREE.Clock();

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime() * speed;

      shapes.forEach((shape) => {
        // Rotation
        shape.mesh.rotation.x += shape.rotationSpeed.x * speed;
        shape.mesh.rotation.y += shape.rotationSpeed.y * speed;
        shape.mesh.rotation.z += shape.rotationSpeed.z * speed;

        // Floating motion
        shape.mesh.position.y =
          shape.baseY + Math.sin(elapsed * shape.floatSpeed + shape.floatOffset) * 1.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();

      shapes.forEach((shape) => {
        shape.mesh.geometry.dispose();
        (shape.mesh.material as THREE.Material).dispose();
      });

      geometries.forEach((geo) => geo.dispose());
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, opacity, speed, shapeCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    />
  );
};

export default WireframeBackground;
