// 标记 JS 可用：入场动画只在 html.js 存在时生效（禁用 JS 时内容始终可见）
document.documentElement.classList.add('js');

// 移动端菜单开关
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('is-open');
});

// 点击菜单项后自动收起（移动端）
navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navMenu.classList.remove('is-open');
  }
});

// 滚动入场动画
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
