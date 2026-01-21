"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isReady, setIsReady] = useState(false);

  // Wait for container to have dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkDimensions = () => {
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkDimensions()) return;

    // Use ResizeObserver to wait for valid dimensions
    const observer = new ResizeObserver(() => {
      if (checkDimensions()) {
        observer.disconnect();
      }
    });
    observer.observe(container);

    // Fallback timeout
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    
    const container = containerRef.current;
    if (!container) return;

    // Get actual dimensions, fallback to window size if needed
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      width / height,
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
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create wireframe material
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity,
    });

    // Developer-themed shape geometries
    const geometries: THREE.BufferGeometry[] = [];
    
    // 1. Binary Orb - Globe-like sphere (tech data visualization)
    geometries.push(new THREE.SphereGeometry(1, 12, 8));
    
    // 2. Code Block - Elongated terminal window shape
    geometries.push(new THREE.BoxGeometry(1.6, 1, 0.1, 2, 2, 1));
    
    // 3. Circuit Grid - Flat segmented plane (PCB/circuit board)
    geometries.push(new THREE.PlaneGeometry(1.5, 1.5, 4, 4));
    
    // 4. Data Cube - Cube with inner structure
    geometries.push(new THREE.BoxGeometry(1, 1, 1, 2, 2, 2));
    
    // 5. Helix/Data Stream - Spiral tube
    const helixCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0.5, -0.5, 0.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.5, 0.5, -0.5),
      new THREE.Vector3(0, 1, 0),
    ]);
    geometries.push(new THREE.TubeGeometry(helixCurve, 20, 0.08, 6, false));
    
    // 6. Terminal Frame - Beveled rectangle (monitor outline)
    const frameShape = new THREE.Shape();
    frameShape.moveTo(-0.8, -0.5);
    frameShape.lineTo(0.8, -0.5);
    frameShape.lineTo(0.8, 0.5);
    frameShape.lineTo(-0.8, 0.5);
    frameShape.lineTo(-0.8, -0.5);
    const frameHole = new THREE.Path();
    frameHole.moveTo(-0.65, -0.35);
    frameHole.lineTo(0.65, -0.35);
    frameHole.lineTo(0.65, 0.35);
    frameHole.lineTo(-0.65, 0.35);
    frameHole.lineTo(-0.65, -0.35);
    frameShape.holes.push(frameHole);
    geometries.push(new THREE.ExtrudeGeometry(frameShape, { depth: 0.1, bevelEnabled: false }));
    
    // 7. Ethereum Diamond - The iconic ETH logo shape
    const ethGeometry = new THREE.BufferGeometry();
    const ethVertices = new Float32Array([
      // Top pyramid
      0, 1.2, 0,      // top point
      -0.7, 0, 0.4,   // front left
      0.7, 0, 0.4,    // front right
      0, 1.2, 0,      // top point
      0.7, 0, 0.4,    // front right
      0.7, 0, -0.4,   // back right
      0, 1.2, 0,      // top point
      0.7, 0, -0.4,   // back right
      -0.7, 0, -0.4,  // back left
      0, 1.2, 0,      // top point
      -0.7, 0, -0.4,  // back left
      -0.7, 0, 0.4,   // front left
      // Bottom pyramid
      0, -1.2, 0,     // bottom point
      0.7, 0, 0.4,    // front right
      -0.7, 0, 0.4,   // front left
      0, -1.2, 0,     // bottom point
      0.7, 0, -0.4,   // back right
      0.7, 0, 0.4,    // front right
      0, -1.2, 0,     // bottom point
      -0.7, 0, -0.4,  // back left
      0.7, 0, -0.4,   // back right
      0, -1.2, 0,     // bottom point
      -0.7, 0, 0.4,   // front left
      -0.7, 0, -0.4,  // back left
    ]);
    ethGeometry.setAttribute('position', new THREE.BufferAttribute(ethVertices, 3));
    geometries.push(ethGeometry);

    // Create shapes with random positions and properties
    interface ShapeData {
      mesh: THREE.LineSegments;
      rotationSpeed: THREE.Vector3;
      floatSpeed: number;
      floatOffset: number;
      baseY: number;
    }

    const shapes: ShapeData[] = [];
    
    // Store positions to prevent overlap
    const placedPositions: { x: number; y: number; z: number; radius: number }[] = [];
    const MIN_DISTANCE = 12; // Minimum distance between shape centers
    
    // Helper to check if position is valid (no overlap)
    const isValidPosition = (x: number, y: number, z: number, radius: number): boolean => {
      for (const pos of placedPositions) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        const dz = z - pos.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < MIN_DISTANCE + radius + pos.radius) {
          return false;
        }
      }
      return true;
    };

    for (let i = 0; i < shapeCount; i++) {
      const geoIndex = Math.floor(Math.random() * geometries.length);
      const geometry = geometries[geoIndex];
      const edges = new THREE.EdgesGeometry(geometry);
      const wireframe = new THREE.LineSegments(edges, material.clone());

      // Random scale - larger for better visibility
      const scale = 2 + Math.random() * 4;
      wireframe.scale.setScalar(scale);
      
      // Find a valid position without overlap
      let x = 0, y = 0, z = 0;
      let attempts = 0;
      const maxAttempts = 50;
      
      do {
        x = (Math.random() - 0.5) * 100;
        y = (Math.random() - 0.5) * 60;
        z = (Math.random() - 0.5) * 30 - 15;
        attempts++;
      } while (!isValidPosition(x, y, z, scale * 2) && attempts < maxAttempts);
      
      wireframe.position.set(x, y, z);
      placedPositions.push({ x, y, z, radius: scale * 2 });

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
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      
      if (width <= 0 || height <= 0) return;

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
  }, [color, opacity, speed, shapeCount, isReady]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}
      style={{ width: '100%', height: '100%', minHeight: '100%' }}
      aria-hidden="true"
    />
  );
};

export default WireframeBackground;
