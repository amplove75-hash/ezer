const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const header = $('.site-header');
const menuToggle = $('.menu-toggle');
const nav = $('.nav');
const themeToggle = $('.theme-toggle');
const topButton = $('#topButton');
const toast = $('#toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  topButton.classList.toggle('show', window.scrollY > 600);
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '✕' : '☰';
});

$$('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

let savedTheme = null;
try { savedTheme = localStorage.getItem('ezer-theme'); } catch (_) {}
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('ezer-theme', next); } catch (_) {}
  showToast(next === 'dark' ? '다크 모드로 전환했어요.' : '라이트 모드로 전환했어요.');
});

$('#copyBtn').addEventListener('click', async () => {
  const text = `Ezer Coach (이재열)\nAI Educator · 에제르 멘토링\n전화: 010-4752-5112\n이메일: amplove@naver.com\n프로필: https://zrr.kr/lHVT6r`;
  try {
    await navigator.clipboard.writeText(text);
    showToast('연락처를 복사했어요.');
  } catch {
    showToast('복사 기능을 사용할 수 없습니다.');
  }
});

$('#shareBtn').addEventListener('click', async () => {
  const data = {
    title: 'Ezer Coach | AI Educator',
    text: 'AI와 코딩을 쉽고 재미있게 연결하는 교육 전문가 Ezer Coach입니다.',
    url: location.href
  };
  try {
    if (navigator.share) await navigator.share(data);
    else {
      await navigator.clipboard.writeText(location.href);
      showToast('현재 페이지 주소를 복사했어요.');
    }
  } catch (error) {
    if (error.name !== 'AbortError') showToast('공유 기능을 사용할 수 없습니다.');
  }
});

$('#contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `[강의 문의] ${data.get('organization') || '교육기관'} - ${data.get('topic') || '교육 프로그램'}`;
  const body = [
    `기관·학교명: ${data.get('organization') || ''}`,
    `담당자명: ${data.get('name') || ''}`,
    `연락처: ${data.get('phone') || ''}`,
    `교육 대상: ${data.get('audience') || ''}`,
    `희망 주제: ${data.get('topic') || ''}`,
    '',
    '문의 내용:',
    data.get('message') || ''
  ].join('\n');
  location.href = `mailto:amplove@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
$('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$('.reveal').forEach((element) => observer.observe(element));

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
