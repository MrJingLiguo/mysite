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

// 复制 QQ 号
const copyBtn = document.getElementById('copyQQ');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const qq = document.getElementById('qqNumber').textContent.trim();
    const original = copyBtn.textContent;
    try {
      await navigator.clipboard.writeText(qq);
      copyBtn.textContent = '✓ 已复制';
    } catch {
      // 剪贴板 API 不可用时的兜底：选中文本让用户手动 Ctrl+C
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('qqNumber'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyBtn.textContent = '已选中，请 Ctrl+C';
    }
    setTimeout(() => { copyBtn.textContent = original; }, 2000);
  });
}
