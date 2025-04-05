document.addEventListener('DOMContentLoaded', () => {

    //header
    class Header extends HTMLElement {
        connectedCallback() {
            this.innerHTML =
                `<span class="year">2025</span>
             <a href="/"><strong class="logo">©LEE HYO JU</strong></a>
            <nav>
                <a href="about.html">About</a>
                <a href="works.html">Works</a>
                <a href="contact.html">Contact</a>
                <button alt="어두운테마로 변경" title="Change Dark mode!"><i class="fa-solid fa-moon"></i></button>
            </nav>
           `
        }
    }

    customElements.define('custom-header', Header);

    // 페이지별 header 좌측 텍스트 변경
    const currentPath = window.location.pathname;
    const headerYear = document.querySelector('custom-header .year');
    const headerLogo = document.querySelector('custom-header .logo');

    if (currentPath.endsWith("index.html") || currentPath === "/") {
        headerLogo.style.display = 'none';
    } else {
        headerYear.style.display = 'none';
    }

    // 페이지별 gnb 활성화
    const gnbLink = document.querySelectorAll('custom-header nav > a');

    gnbLink.forEach((link) => {
        const linkPath = new URL(link.href, window.location.origin).pathname; // 절대경로 변환
        console.log(linkPath);
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else if (linkPath.includes('work') && currentPath.includes('work')) {
            link.classList.add('active');
        }
    });



    const totalPages = 8; // 전체 프로젝트 개수    
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    const currentPage = parseInt(currentPath.match(/work-(\d+)/)?.[1] || "1", 10);

    // 이전 페이지 버튼
    if (currentPage > 1) {
        const prevPage = `work-0${currentPage - 1}.html`;
        prevBtn.href = prevPage
    } else{
        prevBtn.style.display="none";
    }


    // 다음 페이지 버튼
    if (currentPage < totalPages) {
        const nextPage = `work-0${currentPage + 1}.html`;
        nextBtn.href = nextPage
    } else{
        nextBtn.style.display="none";
    }

});