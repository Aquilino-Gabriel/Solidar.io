// Menu hambúrguer
const burger = document.querySelector('[data-burger]');
const nav = document.querySelector('[data-nav]');
if (burger && nav) {
burger.addEventListener('click', () => {
nav.classList.toggle('open');
burger.setAttribute('aria-expanded', nav.classList.contains('open'));
});
}


// Dropdown por teclado (acessível)
document.querySelectorAll('[data-has-dropdown] > a').forEach(link => {
link.addEventListener('keydown', (e) => {
if (e.key === 'ArrowDown') {
const dd = link.parentElement.querySelector('.dropdown a');
dd?.focus();
}
});
});


// Validação visual de formulário
const form = document.querySelector('form[data-validate]');
if (form) {
form.querySelectorAll('.field .input, .field .select, .field .textarea').forEach(el => {
el.addEventListener('blur', () => {
const field = el.closest('.field');
if (!el.checkValidity()) field?.classList.add('invalid'); else field?.classList.remove('invalid');
});
});


form.addEventListener('submit', (e) => {
if (!form.checkValidity()) {
e.preventDefault();
toast('Por favor, corrija os campos destacados.', 'warn');
}
});
}


// Toasts
const stack = document.createElement('div');
stack.className = 'toast-stack';
document.body.appendChild(stack);
function toast(msg, type = 'info') {
const t = document.createElement('div');
t.className = `toast ${type}`;
t.textContent = msg;
stack.appendChild(t);
setTimeout(() => { t.remove(); }, 3500);
}


// Modal (exemplo)
const openModalBtn = document.querySelector('[data-open-modal]');
const modalBackdrop = document.querySelector('[data-modal]');
if (openModalBtn && modalBackdrop) {
openModalBtn.addEventListener('click', () => modalBackdrop.classList.add('open'));
modalBackdrop.addEventListener('click', (e) => {
if (e.target === modalBackdrop || e.target.closest('[data-close]')) modalBackdrop.classList.remove('open');
});
}
