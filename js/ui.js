const commonMenuData = {
    region: {
        items: [
            { val: 'KR', txt: '한국 (KR)', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
            { val: 'US', txt: '미국 (US)', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.55.04-1.09.11-1.62C4.59 11.2 4 12.16 4 13c0 3.31 2.69 6 6 6h2v-1zm8-6h-2c-.55 0-1-.45-1-1V9h-2V7h4v6z' },
            { val: 'JP', txt: '일본 (JP)', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4z' }
        ]
    },
    goal: {
        items: [
            { val: 'ref', txt: '관련성 (Def)', icon: 'M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z' },
            { val: 'hit', txt: '조회수 (Hit)', icon: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' },
            { val: 'trend', txt: '최신순 (New)', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' },
            { val: 'rating', txt: '평점순 (Hot)', icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' }
        ]
    },
    duration: {
        items: [
            { val: 'any', txt: '전체 길이', icon: 'M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z' },
            { val: 'medium', txt: '3~20분', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' },
            { val: 'long', txt: '20분 초과', icon: 'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z' }
        ]
    }
};

const catData = [
    { isGroup: true, label: "Youtube Categories" },
    { val: "0", txt: "전체 (All)", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
    { val: "playlist", txt: "재생목록 (Playlists)", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
    { val: "10", txt: "음악 (Music)", icon: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" },
    { val: "1", txt: "영화/애니 (Film)", icon: "M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" },
    { val: "2", txt: "자동차 (Autos)", icon: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" },
    { val: "15", txt: "동물 (Pets)", icon: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" },
    { val: "17", txt: "스포츠 (Sports)", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.46.04-.92.1-1.36.98 1.37 2.58 2.26 4.4 2.26 2.98 0 5.4-2.42 5.4-5.4 0-1.81-.89-3.42-2.26-4.4.44-.06.9-.1 1.36-.1 4.41 0 8 3.59 8 8s-3.59 8-8 8z" },
    { val: "19", txt: "여행 (Travel)", icon: "M2 12h3v8H2zm19-8H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9 17l-4-4 4-4v3h9v2H9v3z" },
    { val: "20", txt: "게임 (Gaming)", icon: "M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S19.67 9 20.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" },
    { val: "22", txt: "브이로그 (People)", icon: "M15 8c0-1.3-.84-2.4-2-2.81V5c0-1.1-.9-2-2-2S9 3.9 9 5v.19c-1.16.41-2 1.51-2 2.81v6H5v2h14v-2h-2V8zM7 8c0-1.1.9-2 2-2s2 .9 2 2v6H7V8z" },
    { val: "23", txt: "코미디 (Comedy)", icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" },
    { val: "24", txt: "엔터 (Enter)", icon: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03c-.02 1.64-1.35 2.97-3 2.97-1.66 0-3-1.34-3-3z" },
    { val: "25", txt: "뉴스 (News)", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-6h11v6zm0-8H4V6h11v4zm5 8h-4v-6h4v6zm0-8h-4V6h4v4z" },
    { val: "26", txt: "스타일/DIY (Howto)", icon: "M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" },
    { val: "27", txt: "교육 (Edu)", icon: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" },
    { val: "28", txt: "과학/기술 (Tech)", icon: "M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" },

    { isGroup: true, label: "Pro Modes" },
    { val: "mode-work", txt: "노동요 (Work)", icon: "M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" },
    { val: "mode-tech", txt: "기술공부 (Tech)", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-6h11v6zm0-8H4V6h11v4zm5 8h-4v-6h4v6zm0-8h-4V6h4v4z" },
    { val: "mode-diy", txt: "DIY/시공 (Expert)", icon: "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" },
    { val: "mode-invest", txt: "주식/경제 (Invest)", icon: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" }
];



function initParticles() {
    const c = $('particles');
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
        p.style.animationDuration = (Math.random() * 20 + 10) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        c.appendChild(p);
    }
}

function handleThemeChange(input) {
    const color = input.value;
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--brand', color);
    document.documentElement.style.setProperty('--hq-color', color);
    localStorage.setItem('yt_theme_color', color);
    const preview = $('themePreview');
    if (preview) preview.style.background = color;
}

function toggleHeaderMenu() {
    const m = $('headerMenu');
    if (m.classList.contains('visible')) {
        closeMenu();
    } else {
        closeMenu(); // 다른 메뉴 닫기
        m.classList.add('visible');
        $('menuBg').style.display = 'block';
    }
}

// [수정] 공통 메뉴 (1, 2, 3번) - 아이콘 밑에서 열림
function toggleCommonMenu(e, type, btn) {
    if (e) e.stopPropagation();
    const m = $('commonMenu');
    if (m.parentNode !== document.body) document.body.appendChild(m);

    if (m.classList.contains('visible') && m.getAttribute('data-type') === type) {
        closeMenu();
        return;
    }

    closeMenu();

    // 메뉴 렌더링
    const config = commonMenuData[type];
    if (!config) return;

    let html = '';
    const inputEl = document.getElementById(type);
    const curVal = inputEl ? inputEl.value : '';

    config.items.forEach(item => {
        const isActive = curVal === item.val;
        const bgStyle = isActive ? 'background:rgba(255,255,255,0.2);' : '';
        const textStyle = isActive ? 'color:#fff; font-weight:700;' : '';

        let iconHtml = `<svg viewBox="0 0 24 24"><path d="${item.icon}"/></svg>`;

        // 🏳️ 국가 선택 메뉴일 때는 SVG 대신 국기 이미지를 띄웁니다.
        if (type === 'region') {
            iconHtml = `<img src="https://flagcdn.com/w40/${item.val.toLowerCase()}.png" style="width:20px; height:15px; border-radius:2px; margin-right:10px; object-fit:cover;">`;
        }

        html += `
          <div class="menu-list-item" style="${bgStyle}" onclick="selectCommonItem('${type}', '${item.val}')">
            ${iconHtml}
            <span style="${textStyle}">${item.txt}</span>
          </div>`;
    });
    m.innerHTML = html;
    m.setAttribute('data-type', type);

    // [위치 계산]
    const btnRect = btn.getBoundingClientRect();
    const iconEl = btn.querySelector('svg') || btn.querySelector('img');
    const targetRect = iconEl ? iconEl.getBoundingClientRect() : btnRect;

    const menuWidth = 180;
    let leftPos = btnRect.left;
    if (leftPos + menuWidth > window.innerWidth) leftPos = window.innerWidth - menuWidth - 10;
    if (leftPos < 10) leftPos = 10;

    m.style.top = (btnRect.bottom + 12) + 'px';
    m.style.left = leftPos + 'px';

    const originX = (targetRect.left + targetRect.width / 2) - leftPos;

    m.style.setProperty('--origin-x', `${originX}px`);
    m.style.transformOrigin = `${originX}px -10px`;

    requestAnimationFrame(() => m.classList.add('visible'));
    $('menuBg').style.display = 'block';
}

// [메뉴 통합 관리] 공통 항목 선택
function selectCommonItem(type, val) {
    const config = commonMenuData[type];
    if (!config) return;

    const item = config.items.find(i => i.val === val);
    if (item) {
        if (type === 'region') {
            // 🏳️ 국가를 변경했을 때는 국기 이미지만 교체합니다.
            const flagImg = $('regionIcon');
            if (flagImg) flagImg.src = `https://flagcdn.com/w40/${val.toLowerCase()}.png`;
        } else {
            // 다른 메뉴(관련성, 길이)는 기존처럼 글자와 아이콘을 바꿉니다.
            const btnTextId = type === 'goal' ? 'goalText' : 'durText';
            const txtEl = $(btnTextId);
            if (txtEl) txtEl.innerText = item.txt.split(' (')[0];

            const btnIcon = $(type + 'Trigger').querySelector('svg');
            if (btnIcon) btnIcon.innerHTML = `<path d="${item.icon}"/>`;
        }
    }

    const input = document.getElementById(type);
    if (input) {
        input.value = val;
    }

    closeMenu();

    if ($('keyword').value.trim()) {
        searchVideos(true, false, true);
        const label = item ? item.txt : val;
        showToast(`✅ 설정 변경: ${label}`);
    }
}


// [수정] 카테고리 메뉴 (8칸 너비 740px 대응 + 화살표 위치)
function toggleCatMenu(e, btn) {
    if (e) e.stopPropagation();
    const m = $('catMenu');

    // DOM에 없으면 추가
    if (m.parentNode !== document.body) document.body.appendChild(m);

    // 내용 없으면 렌더링
    if (m.innerHTML.trim() === "") renderCatMenu();

    if (m.classList.contains('visible')) {
        closeMenu();
    } else {
        closeMenu(); // 다른 메뉴 닫기

        const btnRect = btn.getBoundingClientRect();
        const iconEl = btn.querySelector('svg');
        const targetRect = iconEl ? iconEl.getBoundingClientRect() : btnRect;

        // [핵심 변경] CSS width와 동일하게 동적 설정 (모바일 최적화)
        const menuWidth = Math.min(420, window.innerWidth - 20);

        // 메뉴창 배치 (버튼 왼쪽 라인 기준)
        let leftPos = btnRect.left;

        // 화면 오른쪽 밖으로 나가는 것 방지
        if (leftPos + menuWidth > window.innerWidth) {
            leftPos = window.innerWidth - menuWidth - 10;
        }
        // 화면 왼쪽 밖으로 나가는 것 방지
        if (leftPos < 10) leftPos = 10;

        m.style.top = (btnRect.bottom + 12) + 'px';
        m.style.left = leftPos + 'px';
        m.style.setProperty('--cat-width', `${menuWidth}px`);

        // 화살표 위치 계산 (아이콘 밑에 정확히 오도록)
        const originX = (targetRect.left + targetRect.width / 2) - leftPos;

        m.style.setProperty('--origin-x', `${originX}px`);
        m.style.transformOrigin = `${originX}px -10px`;

        requestAnimationFrame(() => m.classList.add('visible'));
        $('menuBg').style.display = 'block';
    }
}
// [수정] 렌더링 함수: 모든 필터를 한 줄로 통합 + 활성 상태 동기화
function renderCatMenu() {
    const m = $('catMenu');
    let html = '';

    // 1. 카테고리 데이터 분류
    const fixedItems = catData.filter(d => !d.isGroup && (d.val === '0' || d.val === 'playlist'));
    const normalItems = catData.filter(d => !d.isGroup && d.val !== '0' && d.val !== 'playlist' && !d.val.startsWith('mode-'));
    normalItems.sort((a, b) => a.txt.localeCompare(b.txt));

    const proGroup = catData.find(d => d.isGroup && d.label === 'Pro Modes');
    const proItems = catData.filter(d => !d.isGroup && d.val.startsWith('mode-'));

    // 2. 기본 카테고리
    html += `<div class="cat-group-label">Library & Categories</div>`;
    [...fixedItems, ...normalItems].forEach(d => {
        let isActive = (!currentProMode && d.val === currentCategoryId);
        const activeClass = isActive ? 'active-cat' : '';
        html += `
          <div class="cat-item ${activeClass}" onclick="selectCat('${d.val}')">
            <svg viewBox="0 0 24 24"><path d="${d.icon}"/></svg>
            <span>${d.txt.split('(')[0]}</span>
          </div>`;
    });

    // 3. Pro 모드
    if (proGroup) {
        html += `<div class="cat-group-label" style="margin-top:16px;">${proGroup.label}</div>`;
        proItems.forEach(d => {
            let isActive = (currentProMode && d.val === `mode-${currentProMode}`);
            const activeClass = isActive ? 'active-cat' : '';
            html += `
              <div class="cat-item ${activeClass}" onclick="selectCat('${d.val}')">
              <svg viewBox="0 0 24 24"><path d="${d.icon}"/></svg>
              <span>${d.txt.split('(')[0]}</span>
              </div>`;
        });
    }

    // 4. [한 줄 통합] 하단 필터 영역
    const curGoal = $('goal').value;
    const curDur = $('duration').value;
    const isHq = $('hqMode').checked;

    html += `<div class="cat-footer">`;

    // (1) 정렬 옵션
    commonMenuData.goal.items.forEach(item => {
        const active = (curGoal === item.val) ? 'active' : '';
        const label = item.txt.split(' (')[0];
        html += `<div class="footer-item ${active}" onclick="updateFilter('goal', '${item.val}')">${label}</div>`;
    });

    // (2) 구분선 (시각적 분리)
    html += `<div style="width:1px; height:16px; background:rgba(255,255,255,0.2); margin:0 8px;"></div>`;

    // (3) 길이 옵션
    commonMenuData.duration.items.forEach(item => {
        const active = (curDur === item.val) ? 'active' : '';
        let label = item.txt;
        if (item.val === 'any') label = "전체길이";
        else if (item.val === 'medium') label = "3~20분"; // 유튜브 UI와 완벽 동일하게 맞춤
        else if (item.val === 'long') label = "20분초과"; // 유튜브 UI와 완벽 동일하게 맞춤
        html += `<div class="footer-item ${active}" onclick="updateFilter('duration', '${item.val}')">${label}</div>`;
    });

    // (4) 구분선
    html += `<div style="width:1px; height:16px; background:rgba(255,255,255,0.2); margin:0 8px;"></div>`;

    // (5) HQ 토글
    const hqActive = isHq ? 'active' : '';
    html += `<div class="footer-item ${hqActive}" onclick="updateFilter('hq', null)">✨ HQ</div>`;

    html += `</div>`; // footer end

    // 👇 [추가된 부분] 카테고리 하단에 차단 키워드 목록 렌더링
    if (bannedKeywords && bannedKeywords.length > 0) {
        html += `<div style="grid-column: 1 / -1; margin-top: 16px; padding-top: 16px; border-top: 1px dashed rgba(255,255,255,0.15);">
                    <div style="font-size:12px; color:rgba(255,255,255,0.5); font-weight:700; margin-bottom:12px; text-align:left; padding-left:8px;">🚫 현재 차단된 키워드 (클릭 시 삭제)</div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; padding: 0 8px;">`;

        bannedKeywords.forEach((kw, i) => {
            html += `<div onclick="quickRemoveKeyword(event, ${i})" style="background:rgba(255,59,48,0.1); border:1px solid rgba(255,59,48,0.25); padding:6px 12px; border-radius:16px; font-size:12px; font-weight:600; color:#ffb3b0; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,59,48,0.25)'; this.style.borderColor='#ff3b30';" onmouseout="this.style.background='rgba(255,59,48,0.1)'; this.style.borderColor='rgba(255,59,48,0.25)';">
                        ${escapeHtml(kw)} <span style="font-size:10px; font-weight:900; opacity:0.8; margin-left:4px; color:#ff3b30;">✕</span>
                     </div>`;
        });
        html += `   </div>
                 </div>`;
    }
    // 👆 여기까지 추가됨

    m.innerHTML = `<div class="cat-grid-scroller">${html}</div>`;
}
// [최종 수정] 하단 필터 클릭 처리 함수 (헤더 동기화 + 클릭 씹힘 방지 통합)
function updateFilter(type, val) {
    if (type === 'hq') {
        // HQ 토글 처리
        const chk = $('hqMode');
        chk.checked = !chk.checked;
        showToast(chk.checked ? "✨ 고화질 모드 ON" : "화질 설정 해제");
    } else {
        // Goal, Duration 변경 처리
        const input = $(type);
        if (input) {
            input.value = val;

            // (옵션) 상단 헤더 버튼의 텍스트와 아이콘도 같이 바꿔줌 (혹시 헤더를 다시 켤 경우 대비)
            if (typeof commonMenuData !== 'undefined' && commonMenuData[type]) {
                const config = commonMenuData[type];
                const item = config.items.find(i => i.val === val);
                if (item) {
                    const btnTextId = type === 'region' ? 'regionText' : (type === 'goal' ? 'goalText' : 'durText');
                    if ($(btnTextId)) $(btnTextId).innerText = item.txt.split(' (')[0];
                    const btnIcon = $(type + 'Trigger') ? $(type + 'Trigger').querySelector('svg') : null;
                    if (btnIcon) btnIcon.innerHTML = `<path d="${item.icon}"/>`;
                }
            }
        }
    }

    // 1. UI 즉시 갱신 (활성 상태 표시)
    renderCatMenu();

    // 2. 검색어가 있다면 즉시 재검색 수행
    if ($('keyword').value.trim()) {
        isLoading = false; // ★ [핵심] 이 줄이 있어야 버튼을 연타해도 동작합니다.
        searchVideos(true, false, true);
    }
}
function selectCat(val) {
    const data = catData.find(d => d.val === val);
    if (data) {
        $('curCatText').innerText = data.txt;
        $('curCatIcon').innerHTML = `<path d="${data.icon}"/>`;
    }
    closeMenu();

    const mockSelect = { value: val, options: [{ text: data ? data.txt : '' }], selectedIndex: 0 };
    handleCategoryChange(mockSelect);
    $('catMenu').innerHTML = "";
}

// [수정] 메뉴 닫기 애니메이션 개선
function closeMenu() {
    // 모든 메뉴에서 visible 클래스 제거 -> CSS transition으로 서서히 사라짐
    document.querySelectorAll('.popup-menu').forEach(el => el.classList.remove('visible'));

    $('headerMenu').classList.remove('visible');
    $('menu').classList.remove('visible');

    // 배경은 즉시 닫거나 애니메이션 줄 수 있음 (현재는 즉시 닫음)
    $('menuBg').style.display = 'none';
}

function handleCategoryChange(select) {
    const val = select.value;
    isLiveMode = false; isRadioMode = false; currentProMode = null;

    targetChannelId = null; // ✨ 이 줄을 추가하세요! (카테고리 변경 시 채널 모드 해제)

    if (val === 'btnLive') { isLiveMode = true; showToast("🔴 실시간 라이브 모드"); }
    else if (val === 'btnRadio') { isRadioMode = true; showToast("📻 라디오 믹스 모드"); }
    else if (val.startsWith('mode-')) { setProMode(val.replace('mode-', '')); return; }
    else { currentCategoryId = val; showToast(`📂 카테고리: ${select.options[select.selectedIndex].text}`); }
    triggerSearch();
}

function setProMode(mode) {
    currentProMode = mode;

    // 1. 내부 값 설정을 위한 변수 준비
    let targetCategoryId = '10', targetDuration = 'any', targetGoal = 'ref';

    if (mode === 'work') { targetCategoryId = '10'; targetDuration = 'long'; targetGoal = 'ref'; showToast("🎧 노동요 모드"); }
    else if (mode === 'tech') { targetCategoryId = '28'; targetDuration = 'any'; targetGoal = 'trend'; showToast("💻 기술공부 모드"); }
    else if (mode === 'diy') { targetCategoryId = '26'; targetDuration = 'any'; targetGoal = 'hit'; showToast("🔨 DIY/시공 모드"); }
    else if (mode === 'invest') { targetCategoryId = '25'; targetDuration = 'any'; targetGoal = 'trend'; showToast("📈 주식/경제 모드"); }

    // 2. 실제 데이터 적용
    currentCategoryId = targetCategoryId;
    $('duration').value = targetDuration;
    $('goal').value = targetGoal;

    // ✨ 3. 상단 헤더 UI(텍스트 및 아이콘) 시각적 동기화 로직 추가 ✨
    const syncUI = (type, val, textId) => {
        const item = commonMenuData[type].items.find(i => i.val === val);
        if (item) {
            // 버튼 텍스트 변경 (괄호 내용 제거)
            $(textId).innerText = item.txt.split(' (')[0];
            // 버튼 아이콘 변경
            const btn = $(type + 'Trigger');
            if (btn) {
                const icon = btn.querySelector('svg');
                if (icon) icon.innerHTML = `<path d="${item.icon}"/>`;
            }
        }
    };

    // 준비된 함수로 UI 즉시 갱신
    syncUI('duration', targetDuration, 'durText');
    syncUI('goal', targetGoal, 'goalText');

    // 4. 변경된 설정으로 검색 실행
    triggerSearch();
}

function triggerSearch() { searchVideos(true, false, true); }

let debounceTimer; let selectedSuggestIndex = -1; let currentSuggestions = [];
function handleFocus(el) {
    isSearchSubmitted = false;
    if (!el.value.trim() && searchHistory.length > 0) renderDropdown(searchHistory, 'history');
    else if (el.value.trim()) handleInput(el);
}
function handleInput(el) {
    isSearchSubmitted = false;
    selectedSuggestIndex = -1;
    targetChannelId = null; // 👈 [추가] 검색어를 건드리면 채널 고정 모드 즉시 해제!
    const q = el.value.trim();
    if (debounceTimer) clearTimeout(debounceTimer);
    if (!q) {
        if (searchHistory.length > 0) renderDropdown(searchHistory, 'history');
        else $('suggestBox').classList.remove('visible');
        return;
    }
    debounceTimer = setTimeout(() => fetchSuggestions(q), 300);
}
function clearSearch() {
    const input = $('keyword');
    input.value = '';
    input.focus();
    isSearchSubmitted = false;
    targetChannelId = null; // 👈 [추가] X 버튼으로 지울 때도 채널 고정 모드 즉시 해제!
    if (searchHistory.length > 0) renderDropdown(searchHistory, 'history');
    else $('suggestBox').classList.remove('visible');
}
function handleSearchKeydown(e) {
    const box = $('suggestBox');
    if (!box.classList.contains('visible') || currentSuggestions.length === 0) {
        if (e.key === 'Enter') { searchVideos(true); $('suggestBox').classList.remove('visible'); }
        return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); selectedSuggestIndex++; if (selectedSuggestIndex >= currentSuggestions.length) selectedSuggestIndex = 0; updateSuggestSelection(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selectedSuggestIndex--; if (selectedSuggestIndex < -1) selectedSuggestIndex = currentSuggestions.length - 1; updateSuggestSelection(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (selectedSuggestIndex > -1) { $('keyword').value = currentSuggestions[selectedSuggestIndex].text; searchVideos(true); } else { searchVideos(true); } $('suggestBox').classList.remove('visible'); }
    else if (e.key === 'Escape') { $('suggestBox').classList.remove('visible'); }
}
function updateSuggestSelection() {
    const items = document.querySelectorAll('.s-item');
    items.forEach((item, idx) => { if (idx === selectedSuggestIndex) item.classList.add('selected'); else item.classList.remove('selected'); });
}
function fetchSuggestions(query) {
    const script = document.createElement('script');
    script.src = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURIComponent(query)}&callback=googleSuggestCallback`;
    document.body.appendChild(script);
}
window.googleSuggestCallback = function (data) {
    if (data && data[1]) { const list = data[1].map(item => item[0]); renderDropdown(list, 'suggest'); }
};
function renderDropdown(list, type) {
    if (isSearchSubmitted && type !== 'history') return;
    currentSuggestions = list.map(item => ({ text: item, type: type }));
    const box = $('suggestBox'); const input = $('keyword'); box.innerHTML = '';
    if (!list.length) { box.classList.remove('visible'); return; }
    const rect = input.getBoundingClientRect(); box.style.top = (rect.bottom + 6) + 'px'; box.style.left = rect.left + 'px'; box.style.width = rect.width + 'px';
    list.forEach((text, index) => {
        const div = document.createElement('div'); div.className = 's-item';
        const icon = type === 'history'
            ? `<svg class="s-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/></svg>`
            : `<svg class="s-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>`;
        div.innerHTML = `<div class="s-left">${icon}<span class="s-text">${escapeHtml(text)}</span></div>${type === 'history' ? `<span class="s-del" onclick="delHistoryItem(event, '${escapeHtml(text)}')">삭제</span>` : ''}`;
        div.onclick = (e) => { if (e.target.classList.contains('s-del')) return; $('keyword').value = text; searchVideos(true); box.classList.remove('visible'); };
        box.appendChild(div);
    });
    box.classList.add('visible');
}
function delHistoryItem(e, txt) {
    e.stopPropagation(); searchHistory = searchHistory.filter(h => h !== txt); window.Store.debouncedSave();
    if (searchHistory.length === 0) $('suggestBox').classList.remove('visible'); else renderDropdown(searchHistory, 'history');
}

function renderResults(items, isNew, targetId) {
    const c = $(targetId); if (!c) return;
    if (isNew) c.innerHTML = '';

    let startIdx = 0;
    if (!isNew) {
        if (targetId === 'results') startIdx = currentData.length - items.length;
        else startIdx = myLikes.size - items.length;
    }

    const fragment = document.createDocumentFragment();
    items.forEach((v, i) => {
        const idx = isNew ? i : startIdx + i;

        // [수정] 재생목록일 경우 영상 개수 표시
        const d = v.isPlaylist ? `📚 ${v.itemCount}개` : fmtDur(v.duration || 0);
        const seedStyle = v.isSeed ? 'border:1px solid var(--accent); box-shadow:0 0 20px rgba(168,85,247,0.3);' : '';
        const likeCls = typeof myLikes !== 'undefined' && myLikes.has(v.id) ? 'liked' : '';

        // 인덱스 대신 고유한 비디오 ID를 넘겨서 꼬임 방지
        const clickAction = v.isPlaylist ? `searchPlaylistVideos('${v.id}')` : `playVideo('${v.id}', '${targetId}')`;
        const menuBtnHtml = v.isPlaylist ? '' : `<button class="u-menu-btn" onclick="openMenu(event, '${v.id}')"><svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></button>`;
        const likeBtnHtml = v.isPlaylist ? '' : `<div class="u-like-btn ${likeCls}" onclick="toggleLike(event,'${v.id}',${idx})"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>`;

        // renderResults 내부의 진행률 처리 부분 수정
        let progHtml = '';
        if (!v.isPlaylist && typeof watchProgress !== 'undefined' && watchProgress[v.id]) {
            const wp = watchProgress[v.id];
            const duration = v.duration || wp.d;
            const pct = Math.min(100, Math.max(0, (wp.t / duration) * 100));

            // 시청률이 1% 이상일 때만 표시 (너무 짧은 시청 제외)
            if (pct > 1) {
                // 90% 이상 시청 시 'completed' 클래스 추가 고려
                const isCompleted = pct > 90 ? 'completed' : '';
                progHtml = `
            <div class="u-prog-track">
                <div class="u-prog-bar ${isCompleted}" style="width:${pct}%"></div>
            </div>`;
            }
        }

        const playlistTag = v.isPlaylist ? `<span class="tag-playlist">[PLAYLIST]</span>` : '';
        const verifyBadge = v.isVerified ? `<svg class="u-verified" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path></svg>` : '';
        const hotTag = v.isHot ? `<span class="tag-hot">HOT</span>` : '';
        const newTag = v.isNew ? `<span class="tag-new">NEW</span>` : '';

        // [수정] "구독자" 텍스트 제거하고 숫자만 표시
        const subText = v.subCount ? fmtNum(v.subCount) : (v.subCount === 0 ? '' : '');
        const chImg = v.channelThumb ? v.channelThumb : 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23555\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'12\'/%3E%3C/svg%3E';

        // 리스트 전용 확장 정보 (설명, 퀵 액션)
        const descText = v.description ? `<div class="u-desc">${escapeHtml(v.description)}</div>` : '';
        const quickActions = `
            <div class="quick-actions" onclick="event.stopPropagation()">
                <div class="qa-btn play" onclick="${clickAction}" title="가운데에서 재생"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor;"><path d="M8 5v14l11-7z"/></svg></div>
                <div class="qa-btn" onclick="typeof addToQueue !== 'undefined' && addToQueue('${v.id}')" title="다음에 재생"><svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zm-7-1h2V9h-2v6z"/></svg></div>
                <div class="qa-btn" onclick="toggleLike(event,'${v.id}',${idx})" title="보관함에 저장"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
            </div>`;

        const engTag = (!v.isPlaylist && v.engagement > 2) ? `<span class="tag-hot" style="background:linear-gradient(90deg, #ff9500, #ff5e00); margin-left:4px; color:#fff; border:none; box-shadow:0 0 10px rgba(255,149,0,0.3);">🔥 ${v.engagement}%</span>` : '';
        const maxResThumb = v.thumb ? v.thumb.replace(/mqdefault|hqdefault|sddefault|default/g, 'maxresdefault') : '';

        const tmp = document.createElement('div');
        tmp.innerHTML = `<div class="u-card" id="c-${v.id}" onclick="${clickAction}" style="${seedStyle}; animation-delay: ${idx * 0.03}s;">
      <div class="u-thumb">
        <img src="${v.thumb}" loading="lazy" onmouseover="if('${maxResThumb}') this.src='${maxResThumb}'" onmouseleave="this.src='${v.thumb}'">
        <div class="u-dur">${d}</div>
        ${likeBtnHtml}
        ${menuBtnHtml}
        ${progHtml}
      </div>
      <div class="u-body">
        <div class="u-title">${playlistTag} ${escapeHtml(v.title)}</div>
        <div class="u-info u-channel-row">
            <span class="channel-click-area" onclick="event.stopPropagation(); exploreThisChannel('${v.channelId}', '${escapeHtml(v.channelTitle)}')" style="display:inline-flex; align-items:center; cursor:pointer;" title="채널 검색">
                <img class="u-ch-img" src="${chImg}">
                <span class="u-ch-name" style="text-decoration:none;">${escapeHtml(v.channelTitle)}</span>
                ${verifyBadge}
            </span>
            <span class="u-sub-count" style="margin-right:8px; margin-left: 6px;">${subText}</span>
            ${hotTag} ${newTag} ${engTag}
        </div>
        ${descText}
      </div>
      ${v.isPlaylist ? '' : quickActions}
    </div>`;
        fragment.appendChild(tmp.firstElementChild);
    });
    c.appendChild(fragment);
}

function setViewMode(mode) {
    viewMode = mode;
    const mainC = $('results');
    const likeC = $('likeListContent');

    // 슬라이더 이동 반영
    const toggleContainer = document.querySelector('.view-toggle-container');
    if (toggleContainer) {
        toggleContainer.setAttribute('data-mode', mode);
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        if (mode === 'grid') $('btnGrid').classList.add('active');
        if (mode === 'list') $('btnList').classList.add('active');
    }

    // 클래스 재설정
    [mainC, likeC].forEach(c => {
        if (!c) return;
        c.classList.remove('list-mode');
        if (mode === 'list') c.classList.add('list-mode');
    });
}

// [수정] 좋아요 토글 및 하트 애니메이션 호출
function toggleLike(e, id, i) {
    e.stopPropagation();
    const b = e.currentTarget;

    if (myLikes.has(id)) {
        myLikes.delete(id);
        currentLikesList = currentLikesList.filter(v => v.id !== id); // 보관함 배열 동기화
        b.classList.remove('liked');
        if (isShowingLikes) {
            const card = document.querySelector(`#likesResults #c-${id}`);
            if (card) card.style.display = 'none';
        }
    } else {
        const v = currentData.find(x => x.id === id);
        if (v) {
            myLikes.set(id, v);
            b.classList.add('liked');
            showInstaHeart(b.parentElement); // 하트 효과
        }
    }
    window.Store.debouncedSave();
    updateLikeCount();
}

// [추가] 인스타 하트 애니메이션 생성 함수
function showInstaHeart(container) {
    if (!container) return;
    const heart = document.createElement('div');
    heart.className = 'insta-heart';
    heart.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 800);
}

// 보관함 및 메인 목록 전환 통합 함수
function toggleLikesView() {
    const mainC = $('results');
    const likeC = $('likesResults');
    const seedInfo = $('seedInfo');
    const likeTag = $('likeCountTag');

    // 현재 보관함이 켜져있다면 -> 메인 목록으로 복귀
    if (isShowingLikes) {
        isShowingLikes = false;
        closePlayer(); // ✨ [수정] 메인으로 돌아갈 때 무조건 영상 종료

        likeC.style.display = 'none';
        mainC.style.display = ''; // CSS가 display를 결정하게 맡김
        if (currentQuery.mode === 'radio') seedInfo.style.display = 'block';

        likeTag.classList.remove('active');
        showToast("🏠 메인 목록으로 돌아갑니다.");
    }
    // 현재 메인 목록이라면 -> 보관함으로 진입
    else {
        isShowingLikes = true;
        closePlayer(); // ✨ [수정] 보관함 켤 때 무조건 영상 종료

        mainC.style.display = 'none';
        seedInfo.style.display = 'none';
        likeC.style.display = ''; // CSS가 display를 결정하게 맡김

        likeTag.classList.add('active');

        // 보관함 UI 및 데이터 렌더링
        renderLikesUI();
        showToast("❤️ 보관함 목록");
    }
}
// 보관함 내부 레이아웃 렌더링
function renderLikesUI() {
    const likeC = $('likesResults');

    // 상단 탭 (영상/채널)
    let tabs = `
        <div style="grid-column: 1/-1; display:flex; gap:10px; margin-bottom:20px; justify-content:center; width:100%;">
            <button onclick="renderLikesList('videos')" class="custom-trigger">❤️ 좋아요 영상</button>
            <button onclick="renderLikesList('channels')" class="custom-trigger">⭐ 즐겨찾기 채널</button>
        </div>
        <div id="likedCategoryFilters" class="cat-footer" style="display:none; margin-bottom: 20px; margin-top: 0; padding-top: 0; border-top: none; grid-column: 1/-1;">
            <!-- Category chips will be inserted here -->
        </div>
        <div id="likeListContent" class="view-container ${viewMode === 'list' ? 'list-mode' : ''}" style="grid-column: 1/-1; width:100%;"></div>
    `;

    likeC.innerHTML = tabs;
    renderLikesList('videos', 'all'); // 기본값으로 좋아요 영상 표시
}

// 유튜브 카테고리 매핑 테이블
const categoryMap = {
    '1': '영화/애니', '2': '자동차', '10': '음악', '15': '동물', '17': '스포츠',
    '18': '짧은영화', '19': '여행', '20': '게임', '21': 'Vlog', '22': '코미디',
    '23': '엔터', '24': '뉴스/정치', '25': '스타일', '26': '교육',
    '27': '과학/기술', '28': '사회운동', '29': '비영리'
};

let currentLikedCategory = 'all';

// 보관함 리스트 분류 렌더링 (좋아요 영상 vs 즐겨찾기 채널)
function renderLikesList(type, categoryId = 'all') {
    const container = $('likeListContent');
    const filterContainer = $('likedCategoryFilters');
    closePlayer();

    if (type === 'videos') {
        currentLikedCategory = categoryId;
        currentLikesList = [...myLikes.values()]; // 동기화

        if (currentLikesList.length === 0) {
            if (filterContainer) filterContainer.style.display = 'none';
            container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--sub);">좋아요 표시한 영상이 없습니다.</div>';
        } else {
            // 1. 카테고리별 개수 카운트
            const catCounts = { 'all': currentLikesList.length };
            currentLikesList.forEach(v => {
                const cid = v.categoryId || '10'; // 기본값 10
                catCounts[cid] = (catCounts[cid] || 0) + 1;
            });

            // 2. 카테고리 필터 UI 생성
            if (filterContainer) {
                let filtersHtml = `<div class="footer-item ${currentLikedCategory === 'all' ? 'active' : ''}" onclick="renderLikesList('videos', 'all')">전체 <span>(${catCounts['all']})</span></div>`;

                // 개수 많은 순서대로 정렬 (전체 제외)
                const sortedCategories = Object.keys(catCounts)
                    .filter(cid => cid !== 'all')
                    .sort((a, b) => catCounts[b] - catCounts[a]);

                sortedCategories.forEach(cid => {
                    const catName = categoryMap[cid] || `기타(${cid})`;
                    filtersHtml += `<div class="footer-item ${currentLikedCategory === cid ? 'active' : ''}" onclick="renderLikesList('videos', '${cid}')">${catName} <span>(${catCounts[cid]})</span></div>`;
                });

                filterContainer.innerHTML = filtersHtml;
                filterContainer.style.display = 'flex';
            }

            // 3. 필터링된 배열으로 렌더링
            let filteredList = currentLikesList;
            if (currentLikedCategory !== 'all') {
                filteredList = currentLikesList.filter(v => (v.categoryId || '10') === currentLikedCategory);
            }

            if (filteredList.length === 0) {
                container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--sub);">해당 카테고리에 좋아요 표시한 영상이 없습니다.</div>';
            } else {
                renderResults(filteredList, true, 'likeListContent');
                // 현재 재생 중인 곡이 좋아요 목록에 있으면 강조
                if (queueIndex !== -1 && queue[queueIndex]) {
                    const card = document.querySelector(`#likeListContent #c-${queue[queueIndex].id}`);
                    if (card) card.classList.add('active');
                }
            }
        }
    } else if (type === 'channels') {
        if (filterContainer) filterContainer.style.display = 'none';
        const channels = [...myChannels.values()];
        if (channels.length === 0) {
            container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--sub);">즐겨찾는 채널이 없습니다.</div>';
        } else {
            // 데이터를 불러오는 동안 보여줄 로딩 메시지
            container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--sub);">채널 최신 정보를 불러오는 중... 📡</div>';

            // 저장된 채널들의 실시간 통계 정보를 가져오기 위한 API 호출
            (async () => {
                try {
                    // 최대 50개까지만 한 번에 조회 가능하므로 자름
                    const channelIds = channels.map(c => c.channelId).slice(0, 50).join(',');
                    const cData = await fetchJson(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}&key=${encodeURIComponent(API_KEY)}`);

                    const statsMap = new Map();
                    if (cData && cData.items) {
                        cData.items.forEach(c => {
                            statsMap.set(c.id, c.statistics);
                        });
                    }

                    let h = '';
                    channels.forEach(ch => {
                        const stats = statsMap.get(ch.channelId) || {};
                        const subs = Number(stats.subscriberCount || 0);
                        const vids = Number(stats.videoCount || 0);

                        // 구독자 10만 이상일 때 인증 마크 (기존 영상 목록 조건과 동일)
                        const isVerified = subs > 100000;
                        const verifyBadge = isVerified ? `<svg class="u-verified" viewBox="0 0 24 24" style="width:14px;height:14px;fill:var(--sub);margin-left:4px;flex-shrink:0;"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path></svg>` : '';

                        // 숫자 포맷팅 (1.2K 등)
                        const subsText = subs > 0 ? fmtNum(subs) : '비공개';
                        const vidsText = vids > 0 ? vids.toLocaleString() : '0';

                        h += `
                            <div class="u-card" onclick="searchByChannelId('${ch.channelId}', '${escapeHtml(ch.channelTitle)}')">
                                <div class="u-thumb" style="aspect-ratio:1/1; border-radius:50%; width:100px; margin:16px auto; overflow:hidden; border: 1px solid rgba(255,255,255,0.1);">
                                    <img src="${ch.channelThumb || ''}" style="width:100%; height:100%; object-fit:cover;">
                                </div>
                                <div class="u-body" style="text-align:center; padding-bottom:16px;">
                                    <div class="u-title" style="display:flex; justify-content:center; align-items:center;">
                                        <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:80%;">${escapeHtml(ch.channelTitle)}</span>
                                        ${verifyBadge}
                                    </div>
                                    <div class="u-meta" style="justify-content:center; gap:6px; margin-top:6px;">
                                        <span>구독자 ${subsText}</span>
                                        <span style="opacity:0.3">•</span>
                                        <span>동영상 ${vidsText}개</span>
                                    </div>
                                </div>
                            </div>`;
                    });
                    container.innerHTML = h;
                } catch (error) {
                    console.error("채널 정보 로드 실패", error);
                    container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#ff3333;">채널 정보를 불러오지 못했습니다. 다시 시도해주세요.</div>';
                }
            })();
        }
    }
}
function saveAndBackup() {
    // LocalStorage 저장
    window.Store.debouncedSave();

    console.log("자동 저장 완료 (Local)");
    // 필요 시 exportData()를 호출하여 파일 다운로드를 트리거할 수 있으나, 
    // 사용자 경험을 위해 브라우저 내 저장을 기본으로 하고 종료 전 '백업'을 권장합니다.
}
// [수정] 헤더 좋아요 아이콘 빨간 하트로 복구 (fill 색상 적용)
function updateLikeCount() { $('likeCountTag').innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"></path></svg> <b>${myLikes.size}</b>`; }

// [수정] 통합 메뉴 열기 로직 (미니플레이어 화살표 꼬리 및 위치 완벽 대응)
function openMenu(e, id) {
    e.stopPropagation();
    menuTargetId = id;

    let v = currentData.find(x => x.id === menuTargetId) || queue.find(x => x.id === menuTargetId);
    if (!v) return;

    const isFav = myChannels.has(v.channelId);
    const favText = isFav ? "채널 즐겨찾기 해제" : "채널 즐겨찾기 추가";
    const favIcon = isFav ?
        `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>` :
        `<svg viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`;

    const m = $('menu');

    m.innerHTML = `
      <div class="menu-item" onclick="menuAction('exploreChannel')"><svg viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg> 이 채널 탐색</div>
      <div class="menu-item" onclick="menuAction('toggleChannelFav')">${favIcon} ${favText}</div>
      <div style="height:1px;background:rgba(255,255,255,0.1);margin:4px 0"></div>
      <div class="menu-item" onclick="menuAction('playNext')"><svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg> 바로 다음 재생</div>
      <div class="menu-item" onclick="menuAction('addQueue')"><svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> 대기열 추가</div>
      <div style="height:1px;background:rgba(255,255,255,0.1);margin:4px 0"></div>
      <div class="menu-item" onclick="menuAction('hideVideo')"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg> 이 영상 숨김</div>
      <div class="menu-item" onclick="menuAction('blockChannel')"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg> 채널 차단</div>
      <div style="height:1px;background:rgba(255,255,255,0.1);margin:4px 0"></div>
      <div class="menu-item" onclick="menuAction('copyUrl')"><svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg> 링크 복사</div>
    `;

    // 디스플레이를 먼저 켜서 실제 높이를 측정
    m.style.display = 'block';

    const rect = e.currentTarget.getBoundingClientRect();
    const mRect = m.getBoundingClientRect();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let isMini = e.currentTarget.closest('#mini') !== null;
    let leftPos = rect.left;
    let topPos;
    let originX = rect.width / 2; // 꼬리가 가리킬 X 좌표 (버튼의 중앙)

    // 1. 위/아래 방향 결정
    if (isMini || (rect.bottom + mRect.height + 12 > screenH)) {
        // 미니플레이어에서 눌렀거나, 화면 아래쪽이 좁을 때 -> 메뉴를 버튼 "위로" 띄움
        m.classList.add('menu-up');
        topPos = rect.top - mRect.height - 12;
    } else {
        // 일반 카드에서 눌렀을 때 -> 메뉴를 버튼 "아래로" 띄움
        m.classList.remove('menu-up');
        topPos = rect.bottom + 12;
    }

    // 2. 좌/우 화면 밖으로 나가는 것 방지 & 꼬리 위치 동기화
    if (leftPos + mRect.width > screenW - 10) {
        let diff = (leftPos + mRect.width) - (screenW - 10);
        leftPos -= diff;
        originX += diff; // 메뉴가 왼쪽으로 밀린 만큼 꼬리를 오른쪽으로 당겨줌
    }
    if (leftPos < 10) {
        let diff = 10 - leftPos;
        leftPos += diff;
        originX -= diff;
    }

    m.style.left = leftPos + 'px';
    m.style.top = topPos + 'px';
    m.style.setProperty('--origin-x', originX + 'px');

    $('menuBg').style.display = 'block';
    requestAnimationFrame(() => m.classList.add('visible'));
}
function menuAction(a) {
    let v = currentData.find(x => x.id === menuTargetId) || queue.find(x => x.id === menuTargetId);
    if (!v) return;

    if (a === 'toggleChannelFav') {
        if (myChannels.has(v.channelId)) {
            myChannels.delete(v.channelId);
            showToast("⭐ 즐겨찾기 채널 삭제");
        } else {
            myChannels.set(v.channelId, {
                channelId: v.channelId,
                channelTitle: v.channelTitle,
                channelThumb: v.channelThumb
            });
            showToast("⭐ 즐겨찾기 채널 추가");
        }
        saveAndBackup(); // 자동 저장 실행
    }

    if (a === 'exploreChannel') {
        $('keyword').value = v.channelTitle;
        $('goal').value = 'trend';
        targetChannelId = v.channelId;

        if (isShowingLikes) toggleLikesView();

        searchVideos(true);
        showToast(`📺 '${v.channelTitle}' 채널 검색`);
    }

    if (a === 'addQueue') { queue.push(v); showToast("➕ 대기열에 추가됨"); }

    if (a === 'playNext') {
        if (queueIndex === -1) queue.push(v);
        else queue.splice(queueIndex + 1, 0, v);
        showToast("⏭ 다음 재생 예약됨");
    }

    if (a === 'hideVideo') {
        blockedVideos.add(v.id);
        window.Store.debouncedSave();
        showToast("🚫 영상 숨김");
    }

    if (a === 'blockChannel') {
        if (confirm(`'${v.channelTitle}' 채널을 영구 차단하시겠습니까?`)) {
            blockedChannels.add(v.channelId);
            window.Store.debouncedSave();
            showToast("🚫 채널 차단 완료");
        }
    }

    if (a === 'copyUrl') { navigator.clipboard.writeText(`https://youtu.be/${v.id}`); showToast("🔗 링크 복사됨"); }
    closeMenu();
}

function stopViz() { if (vizAnimId) cancelAnimationFrame(vizAnimId); }
function setTrendAndSearch(k) { $('keyword').value = k; searchVideos(true, true); }
function closeTrendBar() { $('trendBar').classList.remove('visible'); setTimeout(() => $('trendBar').style.display = 'none', 300); }
function cycleOpacity() { opacityLevel = (opacityLevel + 1) % opacityValues.length; localStorage.setItem('yt_opacity_level', opacityLevel); applyOpacity(opacityLevel); }
function applyOpacity(idx, isSilent = false) { const alpha = opacityValues[idx]; const mini = $('mini'); if (mini) mini.style.backgroundColor = `rgba(30, 30, 30, ${alpha})`; if (!isSilent) showToast(`💧 투명도: ${Math.round(alpha * 100)}%`); }
function cycleHeaderOpacity() { headerOpacityLevel = (headerOpacityLevel + 1) % headerAlphas.length; localStorage.setItem('yt_header_opacity_level', headerOpacityLevel); applyHeaderOpacity(headerOpacityLevel); }
function applyHeaderOpacity(idx, isSilent = false) {
    const alpha = headerAlphas[idx];
    // 👇 !important를 이기도록 setProperty 함수로 변경
    document.querySelector('header').style.setProperty('background', `rgba(30, 30, 30, ${alpha})`, 'important');
    if (!isSilent) showToast(`상단바 투명도: ${Math.round(alpha * 100)}%`);
}
function shuffleQueue() {
    if (queue.length <= 1) return showToast("곡 부족"); let currentSong = null; if (queueIndex >= 0 && queueIndex < queue.length) currentSong = queue[queueIndex]; for (let i = queue.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[queue[i], queue[j]] = [queue[j], queue[i]]; } if (currentSong) { const newIdx = queue.findIndex(v => v.id === currentSong.id); if (newIdx !== -1) queueIndex = newIdx; } const targetContainerId = isShowingLikes ? 'likeListContent' : 'results';
    if (!isShowingLikes) {
        currentData = [...queue];
    } else {
        currentLikesList = [...queue]; // 보관함 셔플 시 순서 상태 유지
    }
    renderResults(queue, true, targetContainerId); if (queueIndex >= 0 && queue[queueIndex]) { const activeId = queue[queueIndex].id; const card = document.querySelector(`#${targetContainerId} #c-${activeId}`); if (card) { card.classList.add('active'); preservePlayer(); const pb = $('playerBlock'); if (pb) card.insertAdjacentElement('afterend', pb); } } $('headerMenu').classList.remove('visible'); $('menuBg').style.display = 'none'; showToast("🔀 셔플 완료");
}


function triggerImport() { $('uploadFile').click(); }

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.likes) { myLikes.clear(); data.likes.forEach(v => myLikes.set(v.id, v)); localStorage.setItem('yt_my_likes', JSON.stringify([...myLikes.values()])); }
            if (data.channels) { myChannels.clear(); data.channels.forEach(ch => myChannels.set(ch.channelId, ch)); localStorage.setItem('yt_my_channels', JSON.stringify([...myChannels.values()])); }
            if (data.history) { searchHistory = data.history; localStorage.setItem('yt_history', JSON.stringify(searchHistory)); }
            if (data.blocked) { blockedVideos = new Set(data.blocked); localStorage.setItem('yt_block_v', JSON.stringify([...blockedVideos])); }
            if (data.blockedChannels) { blockedChannels = new Set(data.blockedChannels); localStorage.setItem('yt_block_ch', JSON.stringify([...blockedChannels])); }
            if (data.watchProgress) { watchProgress = data.watchProgress; localStorage.setItem('yt_watch_progress', JSON.stringify(watchProgress)); }

            // 👇 [추가] 차단 키워드 목록 완벽 복구
            if (data.bannedKeywords) {
                bannedKeywords = data.bannedKeywords;
                localStorage.setItem('yt_banned_keywords', JSON.stringify(bannedKeywords));
                if (typeof renderKeywordList === 'function') renderKeywordList(); // 설정창 UI 동기화
            }

            // 👇 [추가 및 보완] 테마, 투명도 및 미니플레이어 ON/OFF 설정 복구
            if (data.settings) {
                opacityLevel = data.settings.opacityLevel || 0; localStorage.setItem('yt_opacity_level', opacityLevel); applyOpacity(opacityLevel, true);
                headerOpacityLevel = data.settings.headerOpacityLevel || 0; localStorage.setItem('yt_header_opacity_level', headerOpacityLevel); applyHeaderOpacity(headerOpacityLevel, true);

                if (data.settings.theme) { $('themePicker').value = data.settings.theme; handleThemeChange($('themePicker')); }

                if (data.settings.miniPlayerEnabled !== undefined) {
                    isMiniPlayerAllowed = data.settings.miniPlayerEnabled;
                    localStorage.setItem('yt_mini_enabled', isMiniPlayerAllowed);
                    if (typeof updateMiniPlayerToggleText === 'function') updateMiniPlayerToggleText();
                } // 👈 [이 괄호를 꼭 닫아주세요!]

                if (data.settings.trendBarEnabled !== undefined) {
                    isTrendBarEnabled = data.settings.trendBarEnabled;
                    localStorage.setItem('yt_trendbar_enabled', isTrendBarEnabled);
                    if (typeof updateTrendBarUI === 'function') updateTrendBarUI();
                }

            }

            updateLikeCount();
            showToast("📂 데이터 및 모든 설정 복구 완료!");
            event.target.value = '';

            if (isShowingLikes) {
                renderLikesUI();
            }

        } catch (err) {
            console.error(err);
            showToast("❌ 파일 오류");
        }
    };
    reader.readAsText(file);
}
let sleepTimerId = null; let sleepMinutes = 0;
function toggleSleepTimer() { if (sleepTimerId) clearTimeout(sleepTimerId); if (sleepMinutes === 0) sleepMinutes = 30; else if (sleepMinutes === 30) sleepMinutes = 60; else sleepMinutes = 0; const btnIcon = $('sleepMenuItem').querySelector('.hm-icon'); const btnText = $('sleepText'); if (sleepMinutes > 0) { btnIcon.style.color = 'var(--accent)'; btnText.innerText = `타이머 (${sleepMinutes}분)`; showToast(`🌙 ${sleepMinutes}분 후 종료`); sleepTimerId = setTimeout(() => { if (player && player.pauseVideo) player.pauseVideo(); sleepMinutes = 0; btnIcon.style.color = '#fff'; btnText.innerText = '취침 타이머'; showToast("🌙 재생 종료"); }, sleepMinutes * 60 * 1000); } else { btnIcon.style.color = '#fff'; btnText.innerText = '취침 타이머'; showToast("해제됨"); } }

// --- 수정된 볼륨 제어 로직 ---
let volTimer = null;
let isVolDragging = false; // 볼륨 슬라이더를 잡고 있는지 확인하는 변수

function toggleVolume() {
    const container = $('volContainer');
    container.classList.toggle('expanded');
    if (container.classList.contains('expanded')) {
        resetVolTimer();
    } else {
        if (volTimer) clearTimeout(volTimer);
    }
}

function setVolume(val) {
    if (player && player.setVolume) {
        player.unMute(); // 볼륨 조절 시 꼬임 방지를 위해 자동으로 음소거 해제
        player.setVolume(val);
    }

    // [핵심 해결] 조절한 볼륨 값을 브라우저(로컬 스토리지)에 즉시 저장!
    localStorage.setItem('yt_volume', val);

    if (!isVolDragging) resetVolTimer();
}

function resetVolTimer() {
    if (volTimer) clearTimeout(volTimer);
    volTimer = setTimeout(() => {
        // 드래그 중이 아닐 때만 볼륨 창을 닫음
        if (!isVolDragging) {
            $('volContainer').classList.remove('expanded');
        }
    }, 3000); // 3초 뒤에 닫힘
}
// 1. 트렌드 바 화면에 그리기
function renderTrendBar(trends) {
    let html = '';
    trends.forEach((t, i) => {
        let rankClass = "t-rank-normal";

        // 1, 2, 3위 메탈릭 효과
        if (i === 0) rankClass = "gmgn-rank rank-1";
        else if (i === 1) rankClass = "gmgn-rank rank-2";
        else if (i === 2) rankClass = "gmgn-rank rank-3";

        // 가져온 데이터에 홑따옴표(')가 있으면 에러가 날 수 있으므로 이스케이프 처리
        const safeText = t.replace(/'/g, "\\'");

        html += `<div class="t-chip" onclick="setTrendAndSearch('${safeText}')">
                    <span class="${rankClass}">${i + 1}</span> ${t}
                 </div>`;
    });

    const tl = document.getElementById('trendList');
    if (tl) tl.innerHTML = html;
}

function updateCardProgressBar(videoId, currentTime, duration) {
    const pct = Math.min(100, (currentTime / duration) * 100);
    if (pct < 1) return;

    // 화면에 있는 모든 해당 영상 카드들(검색결과, 보관함 등)을 찾음
    const cards = document.querySelectorAll(`#c-${videoId}`);

    cards.forEach(card => {
        let progBar = card.querySelector('.u-prog-bar');
        let progTrack = card.querySelector('.u-prog-track');

        if (!progTrack) {
            // 막대가 없으면 썸네일 영역에 새로 생성
            const thumb = card.querySelector('.u-thumb');
            if (thumb) {
                const html = `<div class="u-prog-track"><div class="u-prog-bar" style="width:${pct}%"></div></div>`;
                thumb.insertAdjacentHTML('beforeend', html);
            }
        } else if (progBar) {
            // 막대가 이미 있으면 너비(길이)만 업데이트
            progBar.style.width = pct + '%';
        }
    });
}
// 채널명이나 로고 클릭 시 실행되는 함수
function exploreThisChannel(channelId, channelTitle) {
    $('keyword').value = channelTitle; // 검색창에 채널명 입력
    $('goal').value = 'trend';        // 최신순으로 정렬 변경
    targetChannelId = channelId;      // 채널 ID 고정

    // 현재 보관함(좋아요) 모드라면 메인 목록으로 돌아감
    if (isShowingLikes) toggleLikesView();

    searchVideos(true); // 즉시 검색 실행
    showToast(`📺 '${channelTitle}' 채널의 영상을 탐색합니다.`);
}
// --- 플레이어 스탯 HUD 토글 및 계산 ---
function toggleStatsHUD() {
    const hud = $('statsHUD');

    // 이미 켜져 있으면 닫기
    if (hud.classList.contains('visible')) {
        hud.classList.remove('visible');
        $('menuBg').style.display = 'none';
        return;
    }

    closeMenu(); // 다른 메뉴 닫기

    // 1. 데이터 계산하기 (watchProgress 순회)
    let totalSeconds = 0;
    let completedCount = 0;

    for (const vid in watchProgress) {
        const data = watchProgress[vid];
        if (data && data.t > 0) {
            totalSeconds += data.t;
            // 90% 이상 시청한 영상은 '완독'으로 카운트
            if (data.d > 0 && (data.t / data.d) > 0.9) {
                completedCount++;
            }
        }
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // 2. 누적 시간에 따른 칭호 부여 (게미피케이션)
    let badgeTitle = "뉴비 탐험가 🔰";
    if (hours >= 100) badgeTitle = "로컬 AI 조련사 🤖";
    else if (hours >= 50) badgeTitle = "월스트리트 해커 📈";
    else if (hours >= 20) badgeTitle = "방구석 인테리어 마스터 🛠️";
    else if (hours >= 5) badgeTitle = "사이버펑크 배관공 🔧";

    // 3. 화면에 데이터 뿌리기
    $('statWatchTime').innerText = `${hours}시간 ${minutes}분`;
    $('statCompleted').innerText = `${completedCount}편`;
    $('statLikes').innerText = `${myLikes.size}개`;
    $('statTitleBadge').innerText = badgeTitle;

    // 4. 애니메이션과 함께 띄우기
    $('menuBg').style.display = 'block';

    // 약간의 딜레이를 주어야 CSS transition이 먹힙니다
    requestAnimationFrame(() => {
        hud.classList.add('visible');
    });
}
// --- 설명란 토글 함수 ---
function toggleDescription() {
    const desc = $('vidDesc');
    const btn = $('vidDescToggle');
    const box = $('vidInfoBox');

    if (desc.classList.contains('expanded')) {
        desc.classList.remove('expanded');
        btn.innerText = '더보기...';
        box.style.background = 'rgba(255, 255, 255, 0.1)';
    } else {
        desc.classList.add('expanded');
        btn.innerText = '간략히';
        box.style.background = 'rgba(255, 255, 255, 0.15)';
    }
}

// --- 유튜브 댓글 불러오기 함수 ---
let currentCommentToken = '';
async function loadComments(videoId, isFirst = false) {
    if (!checkKey()) return;
    const btn = $('loadMoreCommentsBtn');
    const list = $('commentsList');

    if (isFirst) {
        list.innerHTML = '<div style="text-align:center; padding:20px; color:var(--sub);">댓글을 불러오는 중... 💬</div>';
        currentCommentToken = '';
    } else {
        btn.innerText = '로딩 중...';
    }

    try {
        let url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&order=relevance&key=${encodeURIComponent(API_KEY)}`;
        if (currentCommentToken) url += `&pageToken=${currentCommentToken}`;

        const res = await fetchJson(url);
        currentCommentToken = res.nextPageToken || '';

        if (isFirst) list.innerHTML = '';

        if (!res.items || res.items.length === 0) {
            if (isFirst) list.innerHTML = '<div style="text-align:center; padding:20px; color:var(--sub);">댓글이 사용 중지되었거나 없습니다.</div>';
            btn.style.display = 'none';
            return;
        }

        let html = '';
        res.items.forEach(item => {
            const c = item.snippet.topLevelComment.snippet;
            const likeCount = c.likeCount > 0 ? fmtNum(c.likeCount) : '';
            const date = new Date(c.publishedAt).toLocaleDateString();

            html += `
            <div class="cmt-item">
                <img class="cmt-avatar" src="${c.authorProfileImageUrl}" loading="lazy">
                <div class="cmt-content">
                    <div class="cmt-author">${escapeHtml(c.authorDisplayName)} <span class="cmt-date">${date}</span></div>
                    <div class="cmt-text">${escapeHtml(c.textOriginal)}</div>
                    <div class="cmt-likes">
                        <svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                        ${likeCount}
                    </div>
                </div>
            </div>`;
        });

        list.insertAdjacentHTML('beforeend', html);

        if (currentCommentToken) {
            btn.style.display = 'block';
            btn.innerText = '댓글 더보기';
        } else {
            btn.style.display = 'none';
        }

    } catch (e) {
        console.error("댓글 로드 에러:", e);
        if (isFirst) list.innerHTML = '<div style="text-align:center; padding:20px; color:var(--sub);">댓글을 불러올 수 없습니다.</div>';
        btn.style.display = 'none';
    }
}
// --- 설명 및 댓글 영역 토글 함수 ---
function toggleExtraInfo(videoId) {
    const container = $('extraInfoContainer');
    const btn = $('extraInfoBtn');
    const list = $('commentsList');

    if (container.classList.contains('visible')) {
        // 열려있으면 숨기기
        container.classList.remove('visible');
        btn.innerText = '보기 ▼';
    } else {
        // 닫혀있으면 보이기
        container.classList.add('visible');
        btn.innerText = '숨기기 ▲';

        // 처음 열었을 때만 유튜브 API로 댓글 로드 (데이터/API 절약)
        if (list && list.getAttribute('data-loaded') === 'false') {
            list.setAttribute('data-loaded', 'true');
            loadComments(videoId, true);
        }
    }
}

// --- 차단 키워드 관리 로직 ---
function openKeywordModal() {
    renderKeywordList();
    $('keywordModal').classList.add('visible');
    closeMenu(); // 가로선 3개 메뉴 닫기
}
function closeKeywordModal() { $('keywordModal').classList.remove('visible'); }

function renderKeywordList() {
    const list = $('keywordList');
    if (bannedKeywords.length === 0) {
        list.innerHTML = `<span style="color:var(--sub); font-size:13px; width:100%; text-align:center;">등록된 차단 키워드가 없습니다.</span>`;
        return;
    }
    list.innerHTML = bannedKeywords.map((kw, i) => `
        <div class="kw-chip">
            ${escapeHtml(kw)} 
            <span class="kw-del-btn" onclick="removeBannedKeyword(${i})" title="삭제">✕</span>
        </div>
    `).join('');
}

function addBannedKeyword() {
    const input = $('newKeywordInput');
    const val = input.value.trim();
    if (!val) return showToast("키워드를 입력하세요.");
    if (bannedKeywords.includes(val)) return showToast("이미 등록된 키워드입니다.");

    bannedKeywords.push(val);
    window.Store.debouncedSave();
    renderKeywordList();
    input.value = '';
    showToast(`🚫 '${val}' 차단됨`);
    if (typeof triggerSilentBackup === 'function') triggerSilentBackup(); // 자동 저장
}

function removeBannedKeyword(index) {
    bannedKeywords.splice(index, 1);
    window.Store.debouncedSave();
    renderKeywordList();
    if (typeof triggerSilentBackup === 'function') triggerSilentBackup();
}
// --- 카테고리 메뉴에서 차단 키워드 즉시 삭제 ---
function quickRemoveKeyword(e, index) {
    e.stopPropagation(); // 메뉴창이 닫히는 것을 방지

    const removedKw = bannedKeywords[index];
    bannedKeywords.splice(index, 1);
    window.Store.debouncedSave();

    // UI 즉시 새로고침
    renderCatMenu();
    if (typeof renderKeywordList === 'function') renderKeywordList();
    if (typeof triggerSilentBackup === 'function') triggerSilentBackup(); // 자동 저장 연동

    showToast(`🚫 '${removedKw}' 차단 해제됨`);

    // 삭제 후, 현재 검색 중인 내용이 있다면 즉시 재검색(필터 해제 반영)
    if ($('keyword').value.trim()) {
        isLoading = false;
        searchVideos(true, false, true);
    }
}
// --- [추가] 하단 트렌드 바 설정 로직 ---
// 1. 상태 변수 (기본값 true)
let isTrendBarEnabled = localStorage.getItem('yt_trendbar_enabled') !== 'false';

// 2. 토글 실행 함수
function toggleTrendBarVisibility() {
    isTrendBarEnabled = !isTrendBarEnabled;
    localStorage.setItem('yt_trendbar_enabled', isTrendBarEnabled);

    updateTrendBarUI();

    if (isTrendBarEnabled) {
        showToast("📈 하단 트렌드 바 켜짐");
        // 꺼져있다가 켜졌는데 데이터가 비어있다면 새로고침
        if ($('trendList') && $('trendList').innerHTML.trim() === '') {
            initTrendBar();
        }
    } else {
        showToast("📉 하단 트렌드 바 꺼짐");
    }
}

// 3. UI 렌더링 함수 (메뉴 텍스트 및 실제 바 숨김/표시)
function updateTrendBarUI() {
    const textSpan = $('trendBarToggleText');
    const icon = textSpan ? textSpan.previousElementSibling : null;
    const trendBar = $('trendBar');

    if (isTrendBarEnabled) {
        if (textSpan) textSpan.innerText = "트렌드 바 ON";
        if (icon) icon.style.color = "var(--accent)";
        // 기존 CSS의 !important를 덮어쓰기 위해 setProperty 사용
        if (trendBar) trendBar.style.setProperty('display', 'flex', 'important');
    } else {
        if (textSpan) textSpan.innerText = "트렌드 바 OFF";
        if (icon) icon.style.color = "var(--sub)";
        if (trendBar) trendBar.style.setProperty('display', 'none', 'important');
    }
}
// --- 💬 설명/댓글 글로벌 온오프 로직 ---
let isExtraInfoEnabled = localStorage.getItem('yt_extrainfo_enabled') !== 'false';

function toggleExtraInfoVisibility() {
    isExtraInfoEnabled = !isExtraInfoEnabled;
    localStorage.setItem('yt_extrainfo_enabled', isExtraInfoEnabled);

    updateExtraInfoUI();

    if (isExtraInfoEnabled) {
        showToast("💬 설명 및 댓글 표시 켜짐");
    } else {
        showToast("💬 설명 및 댓글 숨김 (화면이 깔끔해집니다)");
    }
}

function updateExtraInfoUI() {
    const textSpan = $('extraInfoToggleText');
    if (!textSpan) return;
    const icon = textSpan.previousElementSibling;

    if (isExtraInfoEnabled) {
        textSpan.innerText = "설명/댓글 ON";
        if (icon) icon.style.color = "var(--accent)";
        document.body.classList.remove('hide-extrainfo');
    } else {
        textSpan.innerText = "설명/댓글 OFF";
        if (icon) icon.style.color = "var(--sub)";
        document.body.classList.add('hide-extrainfo');
    }
}

// 앱 시작 시 UI 동기화
window.addEventListener('DOMContentLoaded', () => {
    updateExtraInfoUI();
    updateNetworkHUDUI();
    initNetworkMonitor();
});

// --- 📶 네트워크 HUD 글로벌 온오프 로직 ---
let networkMonitorInterval = null;
let cachedIpInfo = null;
let isFetchingIp = false;

async function fetchIpInfo() {
    if (cachedIpInfo || isFetchingIp) return;
    isFetchingIp = true;
    try {
        const response = await fetch('http://ip-api.com/json/?fields=status,countryCode,query');
        const data = await response.json();
        if (data.status === 'success') {
            const cc = data.countryCode;
            // 국가 코드를 국기 이모지로 변환
            const flag = cc.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
            cachedIpInfo = `<div class="net-stat-item" title="접속 위치 및 IP">🌍 ${flag} ${data.query}</div>`;
        }
    } catch(e) {
        console.error("IP Fetch Error:", e);
    }
    isFetchingIp = false;
}

function toggleNetworkHUD() {
    window.isNetworkBarEnabled = !window.isNetworkBarEnabled;
    localStorage.setItem('yt_network_bar_enabled', window.isNetworkBarEnabled);
    if(window.Store && typeof window.Store.debouncedSave === 'function') {
        window.Store.debouncedSave();
    }
    
    updateNetworkHUDUI();
    
    if (window.isNetworkBarEnabled) {
        showToast("📶 네트워크 모니터 바 켜짐");
    } else {
        showToast("📶 네트워크 모니터 바 꺼짐");
    }
}

function updateNetworkHUDUI() {
    const textSpan = $('networkHUDToggleText');
    const hud = $('networkStatusHUD');
    if (!hud) return;
    
    // 메뉴 상태 업데이트
    if (textSpan) {
        const icon = textSpan.previousElementSibling;
        if (window.isNetworkBarEnabled) {
            textSpan.innerText = "네트워크 상태 ON";
            if (icon) icon.style.color = "var(--accent)";
        } else {
            textSpan.innerText = "네트워크 상태 OFF";
            if (icon) icon.style.color = "var(--sub)";
        }
    }

    // 실제 바 상태 업데이트
    if (window.isNetworkBarEnabled) {
        hud.style.display = 'flex';
        updateNetworkData(); // 즉시 리프레시
    } else {
        hud.style.display = 'none';
    }
}

function initNetworkMonitor() {
    // navigator.connection 의 값이 바뀔 때마다 업데이트 콜백
    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateNetworkData);
    }
    window.addEventListener('online', updateNetworkData);
    window.addEventListener('offline', updateNetworkData);
    
    // 1.5초마다 데이터 패치
    if (networkMonitorInterval) clearInterval(networkMonitorInterval);
    networkMonitorInterval = setInterval(updateNetworkData, 1500);
}

async function updateNetworkData() {
    const hud = $('networkStatusHUD');
    if (!hud || !window.isNetworkBarEnabled) return;
    
    if (!navigator.onLine) {
        hud.className = 'network-hud offline';
        hud.innerHTML = `<div class="net-stat-item">🛑 오프라인 (인터넷 연결 끊김)</div>`;
        cachedIpInfo = null; // 오프라인 시 캐시 초기화
        return;
    }
    
    hud.className = 'network-hud online';
    let html = `<div class="net-stat-item">🟢 온라인</div>`;
    
    // IP / 국가 정보 비동기 로드
    if (!cachedIpInfo) {
        await fetchIpInfo();
    }
    if (cachedIpInfo) {
        html += cachedIpInfo;
    }
    
    if (navigator.connection) {
        const conn = navigator.connection;
        if (conn.downlink) {
            html += `<div class="net-stat-item" title="예상 다운로드 속도">⬇ ${conn.downlink} Mbps</div>`;
        }
        if (conn.rtt) {
            // 통신 지연시간(핑)
            let color = '#30d158'; // green
            if (conn.rtt > 150) color = '#ff9f0a'; // orange
            if (conn.rtt > 300) color = '#ff3b30'; // red
            html += `<div class="net-stat-item" title="지연 속도 (Ping)">⚡ <span style="color: ${color};">${conn.rtt} ms</span></div>`;
        }
        if (conn.effectiveType) {
            html += `<div class="net-stat-item" title="연결 타입">📡 ${conn.effectiveType.toUpperCase()}</div>`;
        }
        if (conn.saveData) {
            html += `<div class="net-stat-item" title="데이터 절약 모드 켜짐 (해상도 등 제한될 수 있음)" style="color:#ff9f0a; font-weight:bold;">💡 절약 모드</div>`;
        }
    }
    
    // RAM 사용량 로드
    try {
        if (window.electronAPI && typeof window.electronAPI.getMemoryUsage === 'function') {
            const mem = await window.electronAPI.getMemoryUsage();
            if (mem && mem.private) {
                const ramMB = (mem.private / 1024).toFixed(1);
                html += `<div class="net-stat-item" title="현재 앱 메모리 점유율">🧠 ${ramMB} MB</div>`;
            }
        }
    } catch(e) { }

    hud.innerHTML = html;
}
