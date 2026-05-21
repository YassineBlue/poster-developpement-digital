 const { jsPDF } = window.jspdf;

  // Fond matrice

  const canvas = document.getElementById('matrix');

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const fontSize = 18;

  const columns = canvas.width / fontSize;
  const drops = Array.from({length: columns}, () => 1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF41';

    
    ctx.font = fontSize + "px monospace";
    for(let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    }
  }

  setInterval(drawMatrix, 50);
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    
    canvas.height = window.innerHeight;
  });

  // Télécharger PDF lisible
  document.getElementById('downloadPdfBtn').addEventListener('click', () => {
    
    const container = document.querySelector('.container');
    
    html2canvas(container, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      
      pdf.save('poster_developpement_digital.pdf');
      
    });
    
  });
