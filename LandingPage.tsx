import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[];
    const mouse = { x: -1000, y: -1000 };

    class Particle {
        x: number;
        y: number;
        radius: number;
        vx: number;
        vy: number;
        color: string;

        constructor(x: number, y: number, radius: number, color:string) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.color = color;
        }

        draw() {
            ctx!.beginPath();
            ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx!.fillStyle = this.color;
            ctx!.fill();
        }

        update() {
            if (this.x < 0 || this.x > canvas!.width) {
                this.vx *= -1;
            }
            if (this.y < 0 || this.y > canvas!.height) {
                this.vy *= -1;
            }
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    const init = () => {
        particles = [];
        const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        for (let i = 0; i < numberOfParticles; i++) {
            const radius = Math.random() * 2 + 1;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const color = 'rgba(129, 140, 248, 0.7)'; // indigo-300
            particles.push(new Particle(x, y, radius, color));
        }
    };
    
    const connect = () => {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const distance = Math.sqrt(
                    Math.pow(particles[a].x - particles[b].x, 2) +
                    Math.pow(particles[a].y - particles[b].y, 2)
                );

                if (distance < 120) {
                    opacityValue = 1 - distance / 120;
                    ctx!.strokeStyle = `rgba(192, 132, 252, ${opacityValue})`; // violet-400
                    ctx!.lineWidth = 1;
                    ctx!.beginPath();
                    ctx!.moveTo(particles[a].x, particles[a].y);
                    ctx!.lineTo(particles[b].x, particles[b].y);
                    ctx!.stroke();
                }
            }
        }
        // Connect to mouse
        for (let i = 0; i < particles.length; i++) {
            const distance = Math.sqrt(
                Math.pow(particles[i].x - mouse.x, 2) +
                Math.pow(particles[i].y - mouse.y, 2)
            );
            if (distance < 250) {
                opacityValue = 1 - distance / 250;
                ctx!.strokeStyle = `rgba(99, 102, 241, ${opacityValue})`; // indigo-500
                ctx!.lineWidth = 1;
                ctx!.beginPath();
                ctx!.moveTo(particles[i].x, particles[i].y);
                ctx!.lineTo(mouse.x, mouse.y);
                ctx!.stroke();
            }
        }
    };

    const animate = () => {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connect();
        animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };

    const handleResize = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    init();
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const topics = [
    "Variables & Data Types",
    "Control Flow",
    "Functions",
    "List Comprehensions",
    "Error Handling",
    "Classes & Objects",
    "Inheritance",
    "Polymorphism",
    "Decorators",
    "File I/O",
    "Data Structures",
    "And much more...",
  ];

  return (
    <div className="flex flex-col min-h-screen space-background relative isolate">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[-1]" />
      
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-400 font-fira-code tracking-wider">
            &lt;CodeQuest /&gt;
          </h1>
          <Button onClick={() => setIsModalOpen(true)} variant="secondary">Login / Register</Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 pt-32 pb-16 flex flex-col items-center text-center">
        <div className="max-w-4xl w-full">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-4 font-fira-code tracking-tighter">
            <span className="text-gradient">CodeQuest</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
            The ultimate gamified journey to master Python. Tackle coding puzzles, earn unique badges, and climb the global leaderboard.
            </p>
            <Button onClick={() => setIsModalOpen(true)} className="px-10 py-4 text-lg">Start Your Quest</Button>
             
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mt-24 mb-24">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <p className="text-3xl font-bold text-gradient">20+</p>
                    <p className="text-md text-gray-400">In-Depth Lessons</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <p className="text-3xl font-bold text-gradient">15+</p>
                    <p className="text-md text-gray-400">Coding Puzzles</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <p className="text-3xl font-bold text-gradient">AI</p>
                    <p className="text-md text-gray-400">Powered Tutor</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <p className="text-3xl font-bold text-gradient">🏆</p>
                    <p className="text-md text-gray-400">Global Leaderboard</p>
                </div>
            </div>

            <div className="text-left space-y-20">
                <div>
                    <h3 className="text-4xl font-bold text-purple-300 mb-8 text-center">Your Adventure Awaits</h3>
                    <ul className="space-y-6">
                        <li className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex items-start transform hover:scale-[1.02] hover:border-indigo-500/50 transition-all duration-300">
                            <div className="flex-shrink-0 bg-white/10 p-3 rounded-full mt-1">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xl font-bold text-purple-300">Interactive Puzzles</h4>
                                <p className="text-gray-400">Tackle hands-on Python problems in our live editor. Get instant, test-by-test feedback to debug and perfect your solutions.</p>
                            </div>
                        </li>
                        <li className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex items-start transform hover:scale-[1.02] hover:border-indigo-500/50 transition-all duration-300">
                            <div className="flex-shrink-0 bg-white/10 p-3 rounded-full mt-1">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xl font-bold text-purple-300">Gamified Progress</h4>
                                <p className="text-gray-400">Earn XP, unlock unique achievement badges for procedural, OOP, and puzzle-solving skills, and watch your progress shine.</p>
                            </div>
                        </li>
                        <li className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex items-start transform hover:scale-[1.02] hover:border-indigo-500/50 transition-all duration-300">
                            <div className="flex-shrink-0 bg-white/10 p-3 rounded-full mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xl font-bold text-purple-300">Compete and Climb</h4>
                                <p className="text-gray-400">Test your skills against a global community. Rise through the ranks on the leaderboard and prove your Python mastery.</p>
                            </div>
                        </li>
                        <li className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex items-start transform hover:scale-[1.02] hover:border-indigo-500/50 transition-all duration-300">
                            <div className="flex-shrink-0 bg-white/10 p-3 rounded-full mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            </div>
                            <div className="ml-6">
                                <h4 className="text-xl font-bold text-purple-300">AI-Powered Tutor</h4>
                                <p className="text-gray-400">Stuck on a problem? Our CodeBot is available 24/7 to explain concepts and guide you.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-4xl font-bold text-purple-300 mb-8 text-center">What You'll Learn</h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {topics.map(topic => (
                            <span key={topic} className="bg-indigo-500/30 text-indigo-200 px-4 py-2 rounded-full font-medium border border-indigo-500/50">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LandingPage;