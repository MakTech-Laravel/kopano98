import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Lightweight Three.js atmosphere for the Launchpad hero.
 * Particles + soft gold orb — disposed cleanly on unmount.
 */
export function HeroScene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;

        if (!mount) {
            return;
        }

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        const width = mount.clientWidth || window.innerWidth;
        const height = mount.clientHeight || 420;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, 0.35);
        scene.add(ambient);

        const keyLight = new THREE.PointLight(0xb8943f, 1.4, 18);
        keyLight.position.set(2.5, 1.5, 4);
        scene.add(keyLight);

        const fillLight = new THREE.PointLight(0x334155, 1.1, 16);
        fillLight.position.set(-3, -1, 2);
        scene.add(fillLight);

        const orbGeo = new THREE.IcosahedronGeometry(1.35, 1);
        const orbMat = new THREE.MeshStandardMaterial({
            color: 0xb8943f,
            metalness: 0.35,
            roughness: 0.45,
            emissive: 0x74602a,
            emissiveIntensity: 0.08,
            wireframe: true,
            transparent: true,
            opacity: 0.38,
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(2.1, 0.15, 0);
        scene.add(orb);

        const coreGeo = new THREE.SphereGeometry(0.5, 24, 24);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0xb8943f,
            metalness: 0.4,
            roughness: 0.4,
            emissive: 0xb8943f,
            emissiveIntensity: 0.12,
            transparent: true,
            opacity: 0.55,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.copy(orb.position);
        scene.add(core);

        const count = reduceMotion ? 80 : 260;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 14;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }

        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3),
        );
        const particlesMat = new THREE.PointsMaterial({
            color: 0xc9a85a,
            size: 0.028,
            transparent: true,
            opacity: 0.4,
            depthWrite: false,
        });
        const particles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particles);

        let frame = 0;
        let raf = 0;
        let disposed = false;

        const onResize = () => {
            if (!mount || disposed) {
                return;
            }

            const nextWidth = mount.clientWidth;
            const nextHeight = mount.clientHeight;

            camera.aspect = nextWidth / Math.max(nextHeight, 1);
            camera.updateProjectionMatrix();
            renderer.setSize(nextWidth, nextHeight);
        };

        window.addEventListener('resize', onResize);

        const animate = () => {
            if (disposed) {
                return;
            }

            frame += 1;
            const t = frame * 0.008;

            if (!reduceMotion) {
                orb.rotation.x = t * 0.35;
                orb.rotation.y = t * 0.55;
                core.rotation.y = -t * 0.25;
                particles.rotation.y = t * 0.08;
                orb.position.y = Math.sin(t * 0.9) * 0.18;
                core.position.y = orb.position.y;
            }

            renderer.render(scene, camera);
            raf = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            disposed = true;
            window.cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
            orbGeo.dispose();
            orbMat.dispose();
            coreGeo.dispose();
            coreMat.dispose();
            particlesGeo.dispose();
            particlesMat.dispose();
            renderer.dispose();

            if (renderer.domElement.parentNode === mount) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="pointer-events-none absolute inset-0 opacity-80"
            aria-hidden
        />
    );
}
