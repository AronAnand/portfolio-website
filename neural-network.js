/**
 * Professional Neural Network Visualization
 * Refined Three.js neural network with subtle, sophisticated aesthetics
 */

class NeuralNetwork {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.nodes = [];
        this.connections = [];
        this.mousePosition = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.scrollY = 0;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clock = new THREE.Clock();

        // Professional Configuration - Subtle & Sophisticated
        this.config = {
            nodeCount: 60,  // Fewer nodes for cleaner look
            connectionDistance: 4,
            nodeSize: { min: 0.03, max: 0.08 },  // Much smaller nodes
            colors: {
                // Professional deep blue/silver palette
                primary: 0x4f6d7a,     // Muted blue-grey
                secondary: 0x6b8e9f,   // Lighter blue-grey
                accent: 0x8fa8b8,      // Silver accent
                connection: 0x3d5a6c,  // Deep connection color
                highlight: 0x90a4ae    // Subtle highlight
            },
            spread: { x: 25, y: 14, z: 12 },
            mouseInfluence: 1.5,  // Reduced mouse effect
            pulseSpeed: 0.001,    // Slower, more professional
            driftSpeed: 0.0003    // Very slow drift
        };

        this.init();
    }

    init() {
        if (!this.checkWebGL()) {
            console.warn('WebGL not supported');
            return;
        }

        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createNodes();
        this.createConnections();
        this.setupEventListeners();
        this.animate();
    }

    checkWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    createScene() {
        this.scene = new THREE.Scene();
        // Subtle fog for depth
        this.scene.fog = new THREE.FogExp2(0x0a1628, 0.025);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            50,  // Narrower FOV for more professional look
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        this.camera.position.z = 15;
    }

    createRenderer() {
        const canvas = document.getElementById('neural-canvas');

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
    }

    createNodes() {
        const colors = [
            this.config.colors.primary,
            this.config.colors.secondary,
            this.config.colors.accent
        ];

        for (let i = 0; i < this.config.nodeCount; i++) {
            const size = THREE.MathUtils.randFloat(
                this.config.nodeSize.min,
                this.config.nodeSize.max
            );

            // Simple, clean sphere
            const geometry = new THREE.SphereGeometry(size, 12, 12);
            const color = colors[Math.floor(Math.random() * colors.length)];

            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.6  // More subtle opacity
            });

            const node = new THREE.Mesh(geometry, material);

            // Distribute nodes organically
            node.position.x = THREE.MathUtils.randFloatSpread(this.config.spread.x);
            node.position.y = THREE.MathUtils.randFloatSpread(this.config.spread.y);
            node.position.z = THREE.MathUtils.randFloatSpread(this.config.spread.z);

            node.userData = {
                originalPosition: node.position.clone(),
                velocity: new THREE.Vector3(
                    THREE.MathUtils.randFloatSpread(0.005),  // Very slow movement
                    THREE.MathUtils.randFloatSpread(0.005),
                    THREE.MathUtils.randFloatSpread(0.003)
                ),
                pulsePhase: Math.random() * Math.PI * 2,
                baseSize: size,
                color: color,
                baseOpacity: 0.4 + Math.random() * 0.3
            };

            // Subtle glow ring instead of sphere
            const ringGeometry = new THREE.RingGeometry(size * 1.5, size * 2, 16);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.1,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.lookAt(this.camera.position);
            node.add(ring);

            this.nodes.push(node);
            this.scene.add(node);
        }
    }

    createConnections() {
        this.connectionGroup = new THREE.Group();
        this.scene.add(this.connectionGroup);
    }

    updateConnections() {
        // Clear existing connections
        while (this.connectionGroup.children.length > 0) {
            const line = this.connectionGroup.children[0];
            line.geometry.dispose();
            line.material.dispose();
            this.connectionGroup.remove(line);
        }

        // Create subtle connections
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = this.nodes[i].position.distanceTo(this.nodes[j].position);

                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - (distance / this.config.connectionDistance)) * 0.15;

                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        this.nodes[i].position,
                        this.nodes[j].position
                    ]);

                    const material = new THREE.LineBasicMaterial({
                        color: this.config.colors.connection,
                        transparent: true,
                        opacity: opacity,
                        blending: THREE.AdditiveBlending
                    });

                    const line = new THREE.Line(geometry, material);
                    this.connectionGroup.add(line);
                }
            }
        }
    }

    setupEventListeners() {
        // Smooth mouse tracking
        let targetX = 0, targetY = 0;

        window.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth) * 2 - 1;
            targetY = -(e.clientY / window.innerHeight) * 2 + 1;

            // Smooth interpolation
            this.mousePosition.x += (targetX - this.mousePosition.x) * 0.05;
            this.mousePosition.y += (targetY - this.mousePosition.y) * 0.05;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mousePosition.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
                this.mousePosition.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            }
        });

        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        });

        window.addEventListener('resize', () => {
            this.onResize();
        });
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();

        // Very subtle camera movement
        this.targetRotation.x = this.mousePosition.y * 0.08;
        this.targetRotation.y = this.mousePosition.x * 0.08;

        this.camera.rotation.x += (this.targetRotation.x - this.camera.rotation.x) * 0.02;
        this.camera.rotation.y += (this.targetRotation.y - this.camera.rotation.y) * 0.02;

        // Gentle scroll parallax
        const scrollOffset = this.scrollY * 0.002;
        this.camera.position.z = 15 + scrollOffset * 0.5;

        // Update nodes with organic movement
        this.nodes.forEach((node, index) => {
            const userData = node.userData;

            // Organic drift using sine waves
            const driftX = Math.sin(time * 0.2 + index * 0.5) * this.config.driftSpeed;
            const driftY = Math.cos(time * 0.15 + index * 0.3) * this.config.driftSpeed;
            const driftZ = Math.sin(time * 0.1 + index * 0.7) * this.config.driftSpeed * 0.5;

            node.position.x += userData.velocity.x + driftX;
            node.position.y += userData.velocity.y + driftY;
            node.position.z += userData.velocity.z + driftZ;

            // Soft boundary with elastic return
            const bounds = this.config.spread;
            ['x', 'y', 'z'].forEach((axis, i) => {
                const bound = [bounds.x, bounds.y, bounds.z][i] / 2;
                if (Math.abs(node.position[axis]) > bound) {
                    const returnForce = (node.position[axis] - Math.sign(node.position[axis]) * bound) * 0.01;
                    node.position[axis] -= returnForce;
                    userData.velocity[axis] *= 0.95;
                }
            });

            // Very subtle mouse influence
            const mouseX = this.mousePosition.x * (this.config.spread.x / 3);
            const mouseY = this.mousePosition.y * (this.config.spread.y / 3);

            const dx = mouseX - node.position.x;
            const dy = mouseY - node.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.config.mouseInfluence && distance > 0.1) {
                const force = (this.config.mouseInfluence - distance) * 0.0002;
                userData.velocity.x += dx * force;
                userData.velocity.y += dy * force;
            }

            // Very slow damping
            userData.velocity.x *= 0.995;
            userData.velocity.y *= 0.995;
            userData.velocity.z *= 0.995;

            // Subtle breathing effect
            userData.pulsePhase += this.config.pulseSpeed;
            const pulse = Math.sin(userData.pulsePhase) * 0.15 + 0.85;

            node.material.opacity = userData.baseOpacity * pulse;
            node.scale.setScalar(0.95 + pulse * 0.1);

            // Update ring to face camera
            if (node.children[0]) {
                node.children[0].lookAt(this.camera.position);
                node.children[0].material.opacity = 0.05 + pulse * 0.05;
            }
        });

        // Update connections every 5th frame
        if (Math.floor(time * 60) % 5 === 0) {
            this.updateConnections();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        window.neuralNetwork = new NeuralNetwork();
    }
});
