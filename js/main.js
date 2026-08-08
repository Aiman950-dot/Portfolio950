// Mobile menu toggle
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  burgerBtn.setAttribute('aria-expanded', 'false');
}));

// Role typing effect
const roles = ["Full-Stack Developer", "UI/UX Designer", "Problem Solver"];
const roleEl = document.getElementById('role-typed');
let rIdx = 0, cIdx = 0, deleting = false;
function tickRole(){
  if(!roleEl) return;
  const current = roles[rIdx];
  if(!deleting){
    cIdx++;
    roleEl.textContent = current.slice(0, cIdx);
    if(cIdx === current.length){ deleting = true; setTimeout(tickRole, 1400); return; }
  } else {
    cIdx--;
    roleEl.textContent = current.slice(0, cIdx);
    if(cIdx === 0){ deleting = false; rIdx = (rIdx+1) % roles.length; }
  }
  setTimeout(tickRole, deleting ? 40 : 70);
}
if(roleEl) {
  tickRole();
}

// Terminal typing effect
const termScript = [
  { t: 'whoami', out: 'Aiman Malik — Full-Stack Developer & UI/UX Designer' },
  { t: 'cat stack.json', out: '{\n  "languages": ["Python","JavaScript","PHP"],\n  "frameworks": ["Django","FastAPI","React.js"],\n  "design": ["Figma","Design Systems"]\n}' },
  { t: 'ls projects/', out: 'lawazana/  ecommerce-platform/  safe-city-mardan/  kws-line/  final-year-project/' },
  { t: './contact.sh --reach-out', out: 'Ready when you are — see the form below ↓' }
];
const termBody = document.getElementById('termBody');
let scriptIdx = 0, charIdx = 0;

function rebindTermRefs() {
  // Safe helper in case other scripts reference it
}

function typeCommandSimple(){
  if(!termBody) return;
  if(scriptIdx >= termScript.length){
    setTimeout(() => {
      scriptIdx = 0; charIdx = 0;
      termBody.innerHTML = '<div class="line"><span class="prompt">guest@aiman</span>:<span class="path">~</span>$ <span id="term-typed"></span><span class="term-cursor" id="termCursor"></span></div>';
      rebindTermRefs();
      typeCommandSimple();
    }, 2600);
    return;
  }
  const cmd = termScript[scriptIdx].t;
  const target = document.getElementById('term-typed');
  const cur = document.getElementById('termCursor');
  if(charIdx <= cmd.length){
    if(target) target.textContent = cmd.slice(0, charIdx);
    charIdx++;
    setTimeout(typeCommandSimple, 55);
  } else {
    if(cur) cur.style.display = 'none';
    const outLine = document.createElement('div');
    outLine.className = 'line out';
    outLine.textContent = termScript[scriptIdx].out;
    termBody.appendChild(outLine);
    scriptIdx++; charIdx = 0;
    setTimeout(() => {
      const nextLine = document.createElement('div');
      nextLine.className = 'line';
      nextLine.innerHTML = '<span class="prompt">guest@aiman</span>:<span class="path">~</span>$ <span id="term-typed"></span><span class="term-cursor" id="termCursor"></span>';
      termBody.appendChild(nextLine);
      typeCommandSimple();
    }, 850);
  }
}
if(termBody) {
  typeCommandSimple();
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if(revealEls.length > 0) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// Case study toggles
document.querySelectorAll('.case-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if(target) {
      const isOpen = target.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
    }
  });
});

// Contact form — Web3Forms (free service, no server to host).
const WEB3FORMS_ACCESS_KEY = "c95ac774-c8d0-4ec1-9742-1fcf636bb884";
const form = document.getElementById('contact-form');
const okMsg = document.getElementById('cf-ok');
const errMsg = document.getElementById('cf-err');
const submitBtn = document.getElementById('cf-submit');

if(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(okMsg) okMsg.classList.remove('show');
    if(errMsg) errMsg.classList.remove('show');

    if(WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE"){
      if(errMsg) {
        errMsg.innerHTML = "Contact form is not active yet! <br/><strong>To receive real-time emails:</strong> Go to <a href='https://web3forms.com' target='_blank' style='color:#ea4335; text-decoration:underline; font-weight:600;'>web3forms.com</a>, enter your email (<strong>aimanmalikaman@gmail.com</strong>) to get a free Access Key, and paste it at the top of <code>js/main.js</code> (line 108).";
        errMsg.classList.add('show');
      }
      return;
    }

    if(submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "New portfolio contact from " + form.name.value,
      name: form.name.value,
      email: form.email.value,
      inquiry_type: form.inquiry_type.value,
      message: form.message.value
    };

    try{
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if(data.success){
        if(okMsg) okMsg.classList.add('show');
        form.reset();
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch(err){
      if(errMsg) errMsg.classList.add('show');
    } finally {
      if(submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    }
  });
}
