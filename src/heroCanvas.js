// CINEMATIC ARCHITECTURAL HERO VIDEO CANVAS RENDERER
export function initHeroCanvas(canvasId, imagePath) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  
  const img = new Image();
  img.src = imagePath;

  let width = canvas.width = canvas.parentElement.clientWidth;
  let height = canvas.height = canvas.parentElement.clientHeight;

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  });

  // Particle System for Golden Hour Dust & Light Rays
  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: -Math.random() * 0.3 - 0.1,
    opacity: Math.random() * 0.5 + 0.2
  }));

  let time = 0;

  function render() {
    time += 0.003;

    ctx.clearRect(0, 0, width, height);

    if (img.complete && img.naturalWidth > 0) {
      // Ken Burns Slow Architectural Dolly & Pan
      const scale = 1.05 + Math.sin(time * 0.4) * 0.035;
      const offsetX = Math.cos(time * 0.3) * (width * 0.015);
      const offsetY = Math.sin(time * 0.35) * (height * 0.015);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;

      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawW = width * scale;
        drawH = (width / imgAspect) * scale;
      } else {
        drawH = height * scale;
        drawW = (height * imgAspect) * scale;
      }

      drawX = (width - drawW) / 2 + offsetX;
      drawY = (height - drawH) / 2 + offsetY;

      // Draw Base Photographic Asset
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Subtle Dynamic Light Sweep (Golden Hour Sunbeam Movement)
      const gradX = width * (0.6 + Math.sin(time * 0.2) * 0.15);
      const gradY = height * (0.3 + Math.cos(time * 0.2) * 0.1);
      const lightGrad = ctx.createRadialGradient(gradX, gradY, 20, gradX, gradY, width * 0.65);
      lightGrad.addColorStop(0, 'rgba(235, 185, 135, 0.18)');
      lightGrad.addColorStop(0.5, 'rgba(185, 139, 94, 0.06)');
      lightGrad.addColorStop(1, 'rgba(15, 22, 20, 0.4)');

      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);
    }

    // Render Atmospheric Floating Particles
    ctx.fillStyle = 'rgba(235, 205, 165, 0.6)';
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(235, 210, 170, ${p.opacity * (0.6 + Math.sin(time + p.x) * 0.4)})`;
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  img.onload = () => {
    render();
  };
  if (img.complete) render();

  return () => cancelAnimationFrame(animationFrameId);
}
