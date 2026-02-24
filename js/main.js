// AOS init
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 700, once: true });
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.classList.add('dark');
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      root.classList.toggle('dark');
      localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Bootstrap validation
  const forms = document.querySelectorAll('form');
  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const status = document.getElementById('formStatus');
        if (status) status.textContent = 'Thanks! Your message has been captured (demo).';
        form.reset();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Plotly demo
  const plotDiv = document.getElementById('plotly-demo');
  if (plotDiv && window.Plotly) {
    const x = ['Q1','Q2','Q3','Q4'];
    const y = [120, 160, 140, 210];
    const data = [{ x, y, type: 'scatter', mode: 'lines+markers', name: 'Revenue' }];
    const layout = { margin: {l: 30, r: 10, t: 10, b: 30} };
    Plotly.newPlot(plotDiv, data, layout, {displayModeBar: false, responsive: true});
    window.addEventListener('resize', () => Plotly.Plots.resize(plotDiv));
  }
});
