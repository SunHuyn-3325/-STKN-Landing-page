document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isFirstMove = true;

    // Theo dõi tọa độ chuột thực tế
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Nếu di chuyển lần đầu, đưa con trỏ hồng khớp ngay vị trí chuột mà không cần chờ hiệu ứng lướt (lerp)
        if (isFirstMove) {
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            isFirstMove = false;
        }
    });

    // Thực hiện hoạt ảnh lướt đuôi mượt mà (Lerp)
    function animateCursor() {
        if (!isFirstMove) {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hiệu ứng tương tác phóng to con trỏ khi di chuyển qua các thành phần
    const interactiveElements = document.querySelectorAll(
        'a, .scroll-down-indicator, #scrollTopBtn, .bts-grid-item img, .billboard-wrapper img'
    );
    
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.backgroundColor = 'rgba(255, 0, 191, 0.5)';
        });
        elem.addEventListener('mouseleave', () => {
            cursor.style.width = '14px';
            cursor.style.height = '14px';
            cursor.style.backgroundColor = 'var(--accent-color)';
        });
    });

    // Hiện / ẩn nút cuộn lên đầu trang
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.8) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Thực hiện hành động cuộn lên
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Thêm vào trong DOMContentLoaded, sau phần scrollTopBtn

// Parallax nhẹ cho tô phở
const phoBowl = document.querySelector('.pho-bowl-float');
if (phoBowl) {
    window.addEventListener('scroll', () => {
        const rect = phoBowl.closest('section').getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (sectionCenter - viewCenter) * 0.08;
        phoBowl.style.transform = `translateY(calc(-${offset}px))`;
    });
}