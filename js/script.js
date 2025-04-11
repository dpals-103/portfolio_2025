document.addEventListener('DOMContentLoaded', () => {

    //header
    class Header extends HTMLElement {
        connectedCallback() {
            this.innerHTML =
                `<span class="year">2025</span>
             <a href="/"><strong class="logo">©LEE HYO JU</strong></a>
            <nav>
                <a href="about.html" alt="소개페이지로 이동">About</a>
                <a href="works.html" alt="작업물 페이지로 이동">Works</a>
                <a href="contact.html">Contact</a>
                <button class="theme-btn" alt="어두운테마로 변경" title="Change Dark mode!"><i class="fa-solid fa-moon"></i></button>
                <button class="m-menu">
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_411_529)">
                        <path d="M5.6001 7H26.4001V9H5.6001V7Z" fill="none"/>
                        <path d="M5.6001 15H26.4001V17H5.6001V15Z" fill="none"/>
                        <path d="M5.6001 23H26.4001V25H5.6001V23Z" fill="none"/>
                    </g>
                </svg>
                </button>
            </nav>

            <div class="m-header">
            <a href="/"><strong class="logo">©LEE HYO JU</strong></a>
            <button class="m-menu">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_411_529)">
                        <path d="M5.6001 7H26.4001V9H5.6001V7Z" fill="none" />
                        <path d="M5.6001 15H26.4001V17H5.6001V15Z" fill="none" />
                        <path d="M5.6001 23H26.4001V25H5.6001V23Z" fill="none" />
                    </g>
                </svg>
            </button>
        </div>
           `
        }
    }

    customElements.define('custom-header', Header);


    // mobile menu
    class mobileMenu extends HTMLElement {
        connectedCallback() {
            this.innerHTML =
                `<aside>
            <button class="close-menu">
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.4208 9.99954L0.36676 1.7735L1.63324 0.225586L12 8.70748L22.3668 0.225586L23.6332 1.7735L13.5792 9.99954L23.6332 18.2256L22.3668 19.7735L12 11.2916L1.63324 19.7735L0.36676 18.2256L10.4208 9.99954Z"
                        fill="none" />
                </svg>
            </button>
            <nav>
                <a href="about.html" alt="소개페이지로 이동">About</a>
                <a href="works.html" alt="작업물 페이지로 이동">Works</a>
                <a href="contact.html">Contact</a>
                <button class="theme-btn" alt="어두운테마로 변경" title="Change Dark mode!"><i
                        class="fa-solid fa-moon"></i></button>
            </nav>
            <ul class="contact">
                <li>
                    <span>Phone</span>
                    <span>010-9259-7333</span>
                </li>
                <li>
                    <span>E-mail</span>
                    <a href="mailto:dpals103@gmail.com">dpals103@gmail.com</a>
                </li>
            </ul>
        </aside>
           `
        }
    }

    customElements.define('mobile-menu', mobileMenu);



    //responsive 사이드바 메뉴 토글 기능
    const mobileMenuBtn = document.querySelector('.m-header .m-menu');
    const sideMenu = document.querySelector('mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    mobileMenuBtn.addEventListener('click', () => {
        sideMenu.style.transform = 'translateX(0)';
    });
    closeMenuBtn.addEventListener('click', () => {
        sideMenu.style.transform = 'translateX(100%)';
    });


    // 페이지별 header 좌측 텍스트 변경
    const currentPath = window.location.pathname;
    const headerYear = document.querySelector('custom-header .year');
    const headerLogo = document.querySelector('custom-header .logo');
    const header = document.querySelector('custom-header');

    if (currentPath.endsWith("index.html") || currentPath === "/") {
        headerLogo.style.display = 'none';
    } else {
        headerYear.style.display = 'none';
    }

    // 페이지별 gnb 활성화
    const gnbLink = document.querySelectorAll('custom-header nav > a');

    gnbLink.forEach((link) => {
        const linkPath = new URL(link.href, window.location.origin).pathname; // 절대경로 변환

        if (linkPath === currentPath) {
            link.classList.add('active');
        } else if ((linkPath.includes('work') || linkPath.includes('works')) && (currentPath.includes('work') || currentPath.includes('works'))) {
            link.classList.add('active');
            header.classList.add('fixed');
        }
    });


    // 테마버튼
    const themeBtn = document.querySelector('.theme-btn');
    const themeBtnIco = document.querySelector('.theme-btn > i');
    const root = document.documentElement;

    function applyTheme(darkMode) {
        root.classList.toggle('dark', darkMode);

        if (darkMode) {
            themeBtnIco.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeBtnIco.classList.replace('fa-sun', 'fa-moon');
        }
        themeBtn.setAttribute('title', darkMode ? 'Change light Mode!' : 'Change dark Mode!');
        themeBtn.setAttribute('alt', darkMode ? '밝은 테마로 변경' : '어두운 테마로 변경');
        localStorage.setItem('theme', darkMode ? 'dark' : '');
    }

    // 초기 테마 설정
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark');

    // 버튼 클릭 이벤트
    themeBtn.addEventListener('click', () => {
        const notContainDark = !root.classList.contains('dark'); // Not Dark mode  = true
        applyTheme(notContainDark);
    });



    //페이지업 버튼 구조 생성
    const pageUpBtn = document.createElement("button")
    const pageUpBtnIcon = document.createElement("i")
    pageUpBtn.classList.add('btn-page-up');
    pageUpBtnIcon.classList.add('fa-solid', 'fa-arrow-up');
    pageUpBtn.appendChild(pageUpBtnIcon);


    //work 관련 페이지에 조건문 설정
    if (currentPath.includes("works.html")) {
        header.classList.add('fixed');
        document.querySelector('.works').appendChild(pageUpBtn);

    } else if (/work-\d+\.html$/.test(currentPath)) {

        document.querySelector('.work-detail').appendChild(pageUpBtn);

        // work 상세페이지 페이지네이션 기능 
        const totalPages = 8; // 전체 프로젝트 개수    
        const prevBtn = document.querySelector(".prev-btn")
        const nextBtn = document.querySelector(".next-btn")
        const currentPage = parseInt(currentPath.match(/work-(\d+)/)?.[1] || "1", 10);

        // 이전 페이지 버튼
        if (currentPage > 1) {
            const prevPage = `work-0${currentPage - 1}.html`;
            prevBtn.href = prevPage
        } else {
            prevBtn.style.display = "none";
        }

        // 다음 페이지 버튼
        if (currentPage < totalPages) {
            const nextPage = `work-0${currentPage + 1}.html`;
            nextBtn.href = nextPage
        } else {
            nextBtn.style.display = "none";
        }

    }


    // 스크롤 방향에 따라 헤더 숨겼다 보여주기
    let lastScrollTop = 0;
    let ticking = false;
    const headerSection = document.querySelector('custom-header.fixed');

    function onScroll() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll - lastScrollTop > 10) {
            headerSection.style.transform = "translateY(-100%)";
            headerSection.style.opacity = "0";
        } else if (lastScrollTop - currentScroll > 10) {
            headerSection.style.transform = "translateY(0)";
            headerSection.style.opacity = "1";
        }

        lastScrollTop = currentScroll;
        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            this.requestAnimationFrame(onScroll);
            ticking = true;
        }
    })


    // 스크롤 방향에 따라 페이지업 버튼 보여주기
    function visibleScroll() {
        if (window.scrollY > 100) {
            pageUpBtn.classList.add('visible');
        } else {
            pageUpBtn.classList.remove('visible');
        }
    }

    function pageUp() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.addEventListener('scroll', visibleScroll);
    pageUpBtn.addEventListener('click', pageUp);



});