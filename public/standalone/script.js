// HT EA Mobile - vanilla JS phase controller
(function () {
  const phases = {
    loading: document.getElementById('phase-loading'),
    login: document.getElementById('phase-login'),
    dashboard: document.getElementById('phase-dashboard'),
  };

  function showPhase(name) {
    Object.entries(phases).forEach(([key, el]) => {
      if (!el) return;
      el.hidden = key !== name;
    });
  }

  /* ---------- Phase 1: Loading ---------- */
  const fill = document.getElementById('progress-fill');
  const pct = document.getElementById('progress-pct');
  const start = Date.now();
  const tick = setInterval(() => {
    const p = Math.min(100, ((Date.now() - start) / 3000) * 100);
    fill.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
    if (p >= 100) {
      clearInterval(tick);
      phases.loading.classList.add('fade-out');
      setTimeout(() => showPhase('login'), 600);
    }
  }, 30);

  /* ---------- Phase 2: Login ---------- */
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('login-username').value.trim().toLowerCase();
    const p = document.getElementById('login-password').value;
    if (u === 'viking' && p === 'ht ea bot') {
      loginError.hidden = true;
      showPhase('dashboard');
    } else {
      loginError.textContent = 'ACCESS DENIED — Invalid credentials';
      loginError.hidden = false;
    }
  });
  document.getElementById('get-access').addEventListener('click', () => {
    alert('Redirecting to purchase…');
  });

  /* ---------- Phase 3: Dashboard ---------- */
  // Broker toggle
  const brokerToggle = document.getElementById('broker-toggle');
  brokerToggle.addEventListener('click', () => {
    const on = brokerToggle.classList.toggle('on');
    brokerToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
  });

  // Connect
  const status = document.getElementById('broker-status');
  document.getElementById('connect-btn').addEventListener('click', () => {
    const code = document.getElementById('login-code').value.trim();
    const pw = document.getElementById('broker-pw').value;
    const acct = document.getElementById('account-type').value;
    if (!code || !pw) {
      status.textContent = 'Enter login code and password';
      status.hidden = false;
      return;
    }
    status.textContent = `Connected to Just Market (${acct}) — ${code}`;
    status.hidden = false;
  });

  // Session segmented control
  const seg = document.getElementById('session-seg');
  seg.addEventListener('click', (e) => {
    const target = e.target.closest('.hte-seg-btn');
    if (!target) return;
    seg.querySelectorAll('.hte-seg-btn').forEach((b) => b.classList.remove('active'));
    target.classList.add('active');
  });

  // Algo master switch
  const algo = document.getElementById('algo-btn');
  algo.addEventListener('click', () => {
    const isOn = algo.classList.contains('on');
    algo.classList.toggle('on', !isOn);
    algo.classList.toggle('off', isOn);
    algo.textContent = isOn ? 'DE-LAUNCH ALGO TRADING' : 'LAUNCH ALGO TRADING';
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    showPhase('login');
  });
})();
