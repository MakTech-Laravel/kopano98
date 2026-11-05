import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type AtmosphereSceneProps = {
    /** Particle density multiplier (1 = banner default). */
    density?: number;
    className?: string;
};

/**
 * Soft Three.js particle field for navy page bands.
 * Lighter than HeroScene — safe to mount on every marketing page.
 */
export function AtmosphereScene({
    density = 1,
    className = 'pointer-events-none absolute inset-0 opacity-70',
}: AtmosphereSceneProps) {
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
        const height = mount.clientHeight || 280;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 80);
        camera.position.z = 5.5;

        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
            powerPreference: 'low-power',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, 0.25);
        scene.add(ambient);

        const glow = new THREE.PointLight(0xb8943f, 0.9, 14);
        glow.position.set(1.8, 0.8, 3);
        scene.add(glow);

        const count = Math.round((reduceMotion ? 48 : 140) * density);
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }

        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3),
        );
        const particlesMat = new THREE.PointsMaterial({
            color: 0xc9a85a,
            size: 0.026,
            transparent: true,
            opacity: 0.38,
            depthWrite: false,
        });
        const particles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particles);

        const ringGeo = new THREE.TorusGeometry(1.1, 0.012, 8, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xb8943f,
            transparent: true,
            opacity: 0.22,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(2.4, 0.1, -0.4);
        ring.rotation.x = Math.PI * 0.42;
        scene.add(ring);

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
            const t = frame * 0.006;

            if (!reduceMotion) {
                particles.rotation.y = t * 0.12;
                particles.rotation.x = Math.sin(t * 0.4) * 0.05;
                ring.rotation.z = t * 0.25;
                ring.position.y = Math.sin(t * 0.8) * 0.12;
            }

            renderer.render(scene, camera);
            raf = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            disposed = true;
            window.cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
            particlesGeo.dispose();
            particlesMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            renderer.dispose();

            if (renderer.domElement.parentNode === mount) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [density]);

    return <div ref={mountRef} className={className} aria-hidden />;
}
