"use client";

export function BackgroundDecorations() {
  return (
    <>
      {/* Global Decorative Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* CENTERED AMBIENT GLOWS (plasma morph effect in center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] md:w-[850px] h-[350px] sm:h-[500px] md:h-[850px] rounded-full bg-primary/8 blur-[80px] sm:blur-[100px] md:blur-[160px] animate-pulse-slow" />
        <div className="absolute top-[46%] left-[54%] -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] md:w-[700px] h-[300px] sm:h-[450px] md:h-[700px] rounded-full bg-secondary/6 blur-[70px] sm:blur-[90px] md:blur-[140px] animate-float" />
        <div className="absolute top-[54%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] rounded-full bg-tertiary/6 blur-[60px] sm:blur-[80px] md:blur-[120px] animate-float-reverse" />

        {/* CENTERED DETAILED CYBERPUNK/TECHNICAL GEOMETRIC SHAPES */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[650px] md:h-[650px] flex items-center justify-center">
          
          {/* Detailed SVG Radar Ticks and Concentric Scanners */}
          <svg className="absolute w-[100%] h-[100%] animate-spin-slow opacity-40" viewBox="0 0 100 100">
            {/* Outer dotted radar line */}
            <circle cx="50" cy="50" r="49" fill="none" stroke="var(--color-primary)" strokeWidth="0.25" strokeDasharray="1 4" opacity="0.6" />
            
            {/* Radar major tick lines at 30-degree intervals */}
            <g opacity="0.5" stroke="var(--color-primary)" strokeWidth="0.25">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = i * 30;
                return (
                  <line
                    key={`major-${angle}`}
                    x1="50"
                    y1="1.5"
                    x2="50"
                    y2="4.5"
                    transform={`rotate(${angle} 50 50)`}
                  />
                );
              })}
            </g>

            {/* Radar minor tick lines at 15-degree intervals */}
            <g opacity="0.3" stroke="var(--color-secondary)" strokeWidth="0.15">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = i * 15;
                if (angle % 30 === 0) return null;
                return (
                  <line
                    key={`minor-${angle}`}
                    x1="50"
                    y1="2"
                    x2="50"
                    y2="3.5"
                    transform={`rotate(${angle} 50 50)`}
                  />
                );
              })}
            </g>

            {/* Compass degree text readouts inside outer ring */}
            <g opacity="0.45" fill="var(--color-primary)" fontSize="1.8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              <text x="50" y="8">000°</text>
              <text x="92" y="51.2" transform="rotate(90 92 51.2)">090°</text>
              <text x="50" y="94.5">180°</text>
              <text x="8" y="51.2" transform="rotate(-90 8 51.2)">270°</text>
            </g>

            {/* Segmented warning ring */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-secondary)" strokeWidth="0.4" strokeDasharray="15 8 2 8" opacity="0.5" />
            {/* Fine grid circle */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-outline)" strokeWidth="0.15" strokeDasharray="1 1" opacity="0.3" />
            {/* Intermittent dash tracker */}
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--color-tertiary)" strokeWidth="0.5" strokeDasharray="30 15 5 15" opacity="0.6" />
          </svg>

          {/* Rotating Radar Sweep Beam */}
          <svg className="absolute w-[98%] h-[98%] animate-[spin_8s_linear_infinite] pointer-events-none opacity-[0.08]" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* 45-degree sector sweep */}
            <path d="M 50 50 L 50 4 A 46 46 0 0 1 82.5 17.5 Z" fill="url(#radarSweepGrad)" />
          </svg>

          <svg className="absolute w-[95%] h-[95%] animate-spin-reverse-slow opacity-30" viewBox="0 0 100 100">
            {/* Inner detailed ticks */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-primary)" strokeWidth="0.3" strokeDasharray="4 8" opacity="0.5" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="var(--color-secondary)" strokeWidth="0.2" strokeDasharray="8 4" opacity="0.4" />
          </svg>

          {/* SATELLITES (Orbiting Tech Dots) */}
          {/* Fast Orbit Dot */}
          <div className="absolute w-[92%] h-[92%] animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60 shadow-[0_0_10px_rgba(var(--color-primary),0.8)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary/50 shadow-[0_0_8px_rgba(var(--color-secondary),0.6)]" />
          </div>
          {/* Reverse Orbit Dot */}
          <div className="absolute w-[78%] h-[78%] animate-spin-reverse-slow">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-tertiary/70 shadow-[0_0_10px_rgba(var(--color-tertiary),0.8)]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/80 shadow-[0_0_6px_rgba(var(--color-primary),0.7)]" />
          </div>
          {/* Faint Middle Satellite Path with orbiting dot */}
          <div className="absolute w-[64%] h-[64%] animate-[spin_12s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/90 shadow-[0_0_6px_rgba(var(--color-primary),0.8)]" />
          </div>

          {/* Outer Segmented Circle (Reverse Rotation) */}
          <div className="absolute w-[95%] h-[95%] border border-dashed border-primary/20 rounded-full animate-spin-reverse-slow opacity-90" />
          
          {/* Middle Dotted Circle (Forward Rotation) */}
          <div className="absolute w-[80%] h-[80%] border border-dotted border-secondary/25 rounded-full animate-spin-slow" />

          {/* Concentric Tech Squares */}
          <div className="absolute w-[68%] h-[68%] border border-dashed border-primary/10 rotate-[15deg] animate-spin-slow" />
          <div className="absolute w-[68%] h-[68%] border border-dotted border-secondary/10 -rotate-[15deg] animate-spin-reverse-slow" />

          {/* Pulsing Concentric Rings */}
          <div className="absolute w-[60%] h-[60%] border border-tertiary/15 rounded-full animate-pulse-ring" />
          <div className="absolute w-[42%] h-[42%] border border-primary/15 rounded-full" />
          <div className="absolute w-[24%] h-[24%] border border-secondary/10 rounded-full" />
          
          {/* Center Tech Crosshair Marker */}
          <div className="absolute flex items-center justify-center w-12 h-12">
            <div className="absolute w-8 h-[1px] bg-primary/35" />
            <div className="absolute h-8 w-[1px] bg-primary/35" />
            <div className="absolute w-3 h-3 rounded-full border border-primary/50 bg-surface/90 shadow-[0_0_10px_rgba(var(--color-primary),0.4)]" />
            <div className="absolute w-1 h-1 rounded-full bg-secondary/80 animate-ping" />
          </div>

          {/* Telemetry data tags orbiting around */}
          <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-[0.25em] text-primary/45 uppercase whitespace-nowrap bg-background/60 px-1.5 py-0.5 rounded border border-outline/10 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            SYS_STATE: ONLINE
          </div>
          <div className="absolute -bottom-[12%] left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-[0.25em] text-secondary/45 uppercase whitespace-nowrap bg-background/60 px-1.5 py-0.5 rounded border border-outline/10 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
            NET_PING: 14MS
          </div>
          <div className="absolute top-1/2 -left-[14%] -translate-y-1/2 -rotate-90 text-[8px] font-mono tracking-[0.25em] text-tertiary/45 uppercase whitespace-nowrap bg-background/60 px-1.5 py-0.5 rounded border border-outline/10">
            LOAD: 1.02GFLOP
          </div>
          <div className="absolute top-1/2 -right-[14%] -translate-y-1/2 rotate-90 text-[8px] font-mono tracking-[0.25em] text-primary/45 uppercase whitespace-nowrap bg-background/60 px-1.5 py-0.5 rounded border border-outline/10">
            PORT: 3002 // DEV
          </div>

          {/* Rotating Tech Corner Accents / Brackets */}
          <div className="absolute w-[70%] h-[70%] border border-transparent border-t-primary/35 border-l-primary/35 rounded-[28%] animate-spin-slow opacity-80" />
          <div className="absolute w-[70%] h-[70%] border border-transparent border-b-secondary/35 border-r-secondary/35 rounded-[28%] animate-spin-slow opacity-80" />

          {/* Technical Outer Grid Corner Lines (Framing) */}
          <div className="absolute inset-0 border border-outline/10 rounded-3xl opacity-75">
            {/* Custom corners */}
            <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
            <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
            <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
            <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
            
            {/* Border crosshairs for grid border */}
            <div className="absolute top-1/2 left-[-4px] -translate-y-1/2 w-2 h-[1px] bg-primary/40" />
            <div className="absolute top-1/2 right-[-4px] -translate-y-1/2 w-2 h-[1px] bg-primary/40" />
            <div className="absolute left-1/2 top-[-4px] -translate-x-1/2 h-2 w-[1px] bg-primary/40" />
            <div className="absolute left-1/2 bottom-[-4px] -translate-x-1/2 h-2 w-[1px] bg-primary/40" />
          </div>
        </div>

        {/* CENTERED DOT MATRIX */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] md:w-[700px] h-[350px] sm:h-[500px] md:h-[700px] opacity-[0.25] dark:opacity-[0.32] pointer-events-none flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="overflow-visible animate-pulse-slow">
            <defs>
              <pattern id="dotPattern" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="var(--color-primary)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" style={{
              WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)",
              maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)"
            }} />
          </svg>
        </div>

        {/* SYMMETRICAL FLOATING TECH TARGETS (Only visible on large screens) */}
        {/* Left Target */}
        <div className="hidden lg:flex absolute top-1/2 left-[12%] -translate-y-1/2 flex-col items-center gap-1.5 opacity-45 animate-float">
          <div className="w-9 h-9 border border-primary/35 rounded-md rotate-45 flex items-center justify-center">
            <div className="w-3.5 h-3.5 border border-secondary/35 rounded-full" />
          </div>
          <div className="text-[9px] font-mono tracking-widest text-primary/40">LAT: 04.92</div>
          {/* Animated visualizer */}
          <div className="flex gap-[2px] mt-1 items-end h-2.5">
            <div className="w-[1.5px] h-1.5 bg-primary/40 animate-[pulse_1s_ease-in-out_infinite]" />
            <div className="w-[1.5px] h-2.5 bg-primary/60 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: "0.2s" }} />
            <div className="w-[1.5px] h-1 bg-primary/30 animate-[pulse_0.8s_ease-in-out_infinite]" style={{ animationDelay: "0.4s" }} />
            <div className="w-[1.5px] h-2 bg-primary/50 animate-[pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: "0.1s" }} />
          </div>
        </div>

        {/* Right Target */}
        <div className="hidden lg:flex absolute top-1/2 right-[12%] -translate-y-1/2 flex-col items-center gap-1.5 opacity-45 animate-float-reverse">
          <div className="w-9 h-9 border border-secondary/35 rounded-md flex items-center justify-center">
            <div className="w-3.5 h-3.5 border border-primary/35 rotate-45" />
          </div>
          <div className="text-[9px] font-mono tracking-widest text-secondary/40">LNG: 106.84</div>
          {/* Animated visualizer */}
          <div className="flex gap-[2px] mt-1 items-end h-2.5">
            <div className="w-[1.5px] h-2 bg-secondary/50 animate-[pulse_1.3s_ease-in-out_infinite]" style={{ animationDelay: "0.3s" }} />
            <div className="w-[1.5px] h-1 bg-secondary/30 animate-[pulse_0.9s_ease-in-out_infinite]" style={{ animationDelay: "0.1s" }} />
            <div className="w-[1.5px] h-2.5 bg-secondary/60 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: "0.5s" }} />
            <div className="w-[1.5px] h-1.5 bg-secondary/40 animate-[pulse_1.1s_ease-in-out_infinite]" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>

        {/* Small Floating Crosshairs */}
        <div className="absolute top-[28%] left-[32%] w-3 h-3 opacity-35 flex items-center justify-center animate-float">
          <div className="absolute w-3.5 h-[1px] bg-primary" />
          <div className="absolute h-3.5 w-[1px] bg-primary" />
        </div>
        <div className="absolute bottom-[28%] right-[32%] w-3 h-3 opacity-35 flex items-center justify-center animate-float-reverse">
          <div className="absolute w-3.5 h-[1px] bg-secondary" />
          <div className="absolute h-3.5 w-[1px] bg-secondary" />
        </div>

        <div className="absolute top-[18%] right-[28%] w-3 h-3 opacity-30 flex items-center justify-center animate-float">
          <div className="absolute w-3 h-[1px] bg-tertiary" />
          <div className="absolute h-3 w-[1px] bg-tertiary" />
        </div>
        <div className="absolute bottom-[18%] left-[28%] w-3 h-3 opacity-30 flex items-center justify-center animate-float-reverse">
          <div className="absolute w-3 h-[1px] bg-primary" />
          <div className="absolute h-3 w-[1px] bg-primary" />
        </div>

        {/* Symmetrical screen edge decoration metrics */}
        <div className="fixed top-6 left-12 hidden md:block text-[8px] font-mono tracking-widest text-primary/40 pointer-events-none z-0">
          SYS_ACTIVE // MODE_SECURE // CAL_PASS: OK
        </div>
        <div className="fixed top-6 right-12 hidden md:block text-[8px] font-mono tracking-widest text-secondary/40 pointer-events-none z-0">
          UI_CORE: v1.0.8 // LIVE // PORT: 3002
        </div>

        {/* HUD Corner Borders at screen edges */}
        <div className="fixed top-4 left-4 w-6 h-6 border-t border-l border-primary/25 pointer-events-none z-0" />
        <div className="fixed top-4 right-4 w-6 h-6 border-t border-r border-primary/25 pointer-events-none z-0" />
        <div className="fixed bottom-4 left-4 w-6 h-6 border-b border-l border-primary/25 pointer-events-none z-0" />
        <div className="fixed bottom-4 right-4 w-6 h-6 border-b border-r border-primary/25 pointer-events-none z-0" />

        {/* PCB Circuit Line Vectors at viewport corners (fixed placement) */}
        <svg className="fixed top-4 left-4 w-32 h-32 opacity-[0.08] pointer-events-none stroke-primary fill-none stroke-[0.5] z-0 hidden md:block" viewBox="0 0 100 100">
          <path d="M 0 10 H 40 L 60 30 V 80 H 100" />
          <circle cx="100" cy="80" r="1.2" fill="var(--color-primary)" />
          <circle cx="40" cy="10" r="0.8" fill="var(--color-primary)" />
        </svg>

        <svg className="fixed top-4 right-4 w-32 h-32 opacity-[0.08] pointer-events-none stroke-secondary fill-none stroke-[0.5] z-0 hidden md:block" viewBox="0 0 100 100">
          <path d="M 100 10 H 60 L 40 30 V 80 H 0" />
          <circle cx="0" cy="80" r="1.2" fill="var(--color-secondary)" />
          <circle cx="60" cy="10" r="0.8" fill="var(--color-secondary)" />
        </svg>

        <svg className="fixed bottom-4 left-4 w-32 h-32 opacity-[0.08] pointer-events-none stroke-secondary fill-none stroke-[0.5] z-0 hidden md:block" viewBox="0 0 100 100">
          <path d="M 0 90 H 40 L 60 70 V 20 H 100" />
          <circle cx="100" cy="20" r="1.2" fill="var(--color-secondary)" />
          <circle cx="40" cy="90" r="0.8" fill="var(--color-secondary)" />
        </svg>

        <svg className="fixed bottom-4 right-4 w-32 h-32 opacity-[0.08] pointer-events-none stroke-primary fill-none stroke-[0.5] z-0 hidden md:block" viewBox="0 0 100 100">
          <path d="M 100 90 H 60 L 40 70 V 20 H 0" />
          <circle cx="0" cy="20" r="1.2" fill="var(--color-primary)" />
          <circle cx="60" cy="90" r="0.8" fill="var(--color-primary)" />
        </svg>

        {/* Side Status Indicators */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden xl:flex pointer-events-none z-0 opacity-30">
          <div className="text-[7px] font-mono tracking-[0.25em] text-primary/80 uppercase -rotate-90 origin-left">LOC: SYSTEM_MAPPED</div>
          <div className="w-[1px] h-16 bg-primary/20 ml-2 my-2" />
          <div className="flex flex-col gap-1 text-[6px] font-mono text-primary/60 ml-1">
            <div>DB_CONN: OK</div>
            <div>API_LAT: 28MS</div>
            <div>MEM_USE: 42%</div>
            <div>SYS_CPU: 12.8%</div>
          </div>
        </div>
        
        <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden xl:flex pointer-events-none z-0 opacity-30 items-end">
          <div className="flex flex-col gap-1 text-[6px] font-mono text-secondary/60 mr-1 items-end">
            <div>SEC_LVL: A1</div>
            <div>SSL_STS: ACTIVE</div>
            <div>FPS_CURR: 60</div>
            <div>MEM_CACHE: 4.8M</div>
          </div>
          <div className="w-[1px] h-16 bg-secondary/20 mr-2 my-2" />
          <div className="text-[7px] font-mono tracking-[0.25em] text-secondary/80 uppercase rotate-90 origin-right">PORT: 3002 // PROD</div>
        </div>
      </div>

      {/* Grid Pattern Overlay (Soft Line Grid - with Radial Mask to focus strictly in center) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.38]"
        style={{
          backgroundImage: "linear-gradient(var(--color-outline) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.12) 100%)",
          maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.12) 100%)",
        }}
      ></div>
    </>
  );
}
