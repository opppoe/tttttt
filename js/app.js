window.addEventListener('load', () => {
    updateLikeCount();
    initParticles();
    applyOpacity(opacityLevel, true);
    applyHeaderOpacity(headerOpacityLevel, true);
    updateMiniPlayerToggleText();
    updateTrendBarUI();
    const savedTheme = localStorage.getItem('yt_theme_color');
    if (savedTheme) { $('themePicker').value = savedTheme; handleThemeChange($('themePicker')); }

    // 👇 앱 켤 때 저장된 볼륨 막대기 위치 동기화 (이 두 줄 추가!)
    const savedVol = localStorage.getItem('yt_volume');
    if (savedVol !== null) $('volSlider').value = savedVol;
    initHeaderState();
    makeMiniDraggable();
});

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    const code = e.code;
    if (code === 'Space' || code === 'KeyK') { e.preventDefault(); togglePlay(); }
    else if (code === 'KeyJ') { if (player && player.getCurrentTime) player.seekTo(player.getCurrentTime() - 10, true); }
    else if (code === 'KeyL') { if (player && player.getCurrentTime) player.seekTo(player.getCurrentTime() + 10, true); }
    else if (code === 'KeyM') { if (player && player.isMuted) player.isMuted() ? player.unMute() : player.mute(); }
    else if (code === 'KeyF') { e.preventDefault(); toggleCustomFullScreen(e); } // 👈 추가된 부분
});
// --- 유튜브 기본 전체화면 버튼 감지 및 앱 동기화 로직 (수정됨) ---
document.addEventListener('fullscreenchange', () => {
    // 유튜브 내부에서 전체화면 버튼을 눌렀을 때 (일렉트론이 알아서 창을 꽉 채워줌)
    if (document.fullscreenElement) {
        document.body.classList.add('is-fullscreen');
    }
    // ESC를 누르거나 다시 화면을 줄였을 때
    else {
        document.body.classList.remove('is-fullscreen');
    }
});
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

const observer = new IntersectionObserver((e) => {
    if (e[0].isIntersecting && !isLoading && !isShowingLikes) {
        // [중요] 스크롤 시 재생목록 모드인지, 일반 검색 모드인지 구분하여 로드
        if (isPlaylistMode && playlistPageToken) {
            searchPlaylistVideos(currentPlaylistId, true);
        } else if (!isPlaylistMode && nextPageToken) {
            searchVideos(false);
        }
    }
}, { threshold: 0.1 });
observer.observe($('scrollAnchor'));

function showToast(msg) {
    const t = $('toast'); t.innerHTML = msg; t.classList.add('show');
    if (t.timer) clearTimeout(t.timer); t.timer = setTimeout(() => t.classList.remove('show'), 2500);
}

// --- 🚑 꼬인 HTML 자동 복구 및 그림자 구출 로직 ---
window.addEventListener('DOMContentLoaded', () => {
    // 1. 실수로 중복 입력된 트렌드 바 껍데기를 해체해서 영상들을 밖으로 꺼냅니다.
    const trendBars = document.querySelectorAll('#trendBar');
    if (trendBars.length > 1) {
        const brokenContainer = trendBars[0];
        while (brokenContainer.firstChild) {
            brokenContainer.parentNode.insertBefore(brokenContainer.firstChild, brokenContainer);
        }
        brokenContainer.remove();
        console.log("🛠️ 꼬여있던 HTML 태그 자동 복구 완료!");
    }

    // 2. 바닥 그림자가 무조건 영상 썸네일 위로 오도록 안전한 위치로 이동시킵니다.
    const shadow = document.getElementById('bottomShadow');
    if (shadow) {
        document.body.appendChild(shadow);
    }
});

// 1. 데이터 저장소 추가
let myChannels = new Map();
try {
    const c = localStorage.getItem('yt_my_channels');
    if (c) JSON.parse(c).forEach(ch => myChannels.set(ch.channelId, ch));
} catch (e) { }
// 스크롤 진행률 표시줄 로직 (혜성 + 무지개)
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // 스크롤 가능한 영역이 없으면 0으로 처리 (에러 방지)
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    const progressBar = $('scrollProgressBar') || document.getElementById('scrollProgressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});
// --- 미니 플레이어 드래그 앤 드롭 로직 (위치 기억 기능 추가) ---
function makeMiniDraggable() {
    const mini = $('mini');
    if (!mini) return;

    let startX = 0, startY = 0;
    let dragX = 0, dragY = 0;
    let isDragging = false;
    let hasDragged = false;

    // 1️⃣ 앱을 켤 때, 이전에 저장해둔 위치가 있다면 불러오기
    try {
        const savedPos = JSON.parse(localStorage.getItem('yt_mini_pos'));
        if (savedPos) {
            dragX = savedPos.x || 0;
            dragY = savedPos.y || 0;
            mini.style.setProperty('--drag-x', `${dragX}px`);
            mini.style.setProperty('--drag-y', `${dragY}px`);
        }
    } catch (e) { console.error("위치 불러오기 실패", e); }

    mini.addEventListener('mousedown', (e) => {
        // 컨트롤 영역 클릭 시 드래그 방지
        if (e.target.closest('button') || e.target.closest('.mn-vol-container') || e.target.closest('.mn-progress-pill')) {
            return;
        }
        e.preventDefault();

        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
        hasDragged = false;

        mini.style.transition = 'none';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged = true;

        dragX += dx;
        dragY += dy;
        startX = e.clientX;
        startY = e.clientY;

        mini.style.setProperty('--drag-x', `${dragX}px`);
        mini.style.setProperty('--drag-y', `${dragY}px`);
    }

    function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;

        mini.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';

        // 2️⃣ 마우스를 뗄 때, 최종 위치를 로컬 스토리지에 저장하기
        localStorage.setItem('yt_mini_pos', JSON.stringify({ x: dragX, y: dragY }));

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        setTimeout(() => { hasDragged = false; }, 50);
    }

    mini.addEventListener('click', (e) => {
        if (hasDragged) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
}
// --- 🌙 자동 몰입(Idle) 모드 전체 로직 ---



// 2. 타이머 초기화 및 실행 함수
function resetIdleTimer() {
    // 🎯 이 모드가 꺼져있다면 아예 타이머를 작동시키지 않음
    if (!isAutoIdleEnabled) return;

    // 이미 어두운 상태였다면 다시 밝게 복구
    if (document.body.classList.contains('is-idle')) {
        document.body.classList.remove('is-idle');
    }

    if (idleTimer) clearTimeout(idleTimer);

    // 영상이 재생 중일 때만 작동
    const isVideoPlaying = player && player.getPlayerState && player.getPlayerState() === 1;

    // 4초 뒤 실행
    idleTimer = setTimeout(() => {
        const isMenuOpen = document.getElementById('menuBg').style.display === 'block';
        if (!isMenuOpen && isVideoPlaying) {
            document.body.classList.add('is-idle');
        }
    }, IDLE_TIMEOUT);
}

// 3. 토글 실행 함수 (ON/OFF)
function toggleAutoIdleMode() {
    isAutoIdleEnabled = !isAutoIdleEnabled;
    localStorage.setItem('yt_auto_idle', isAutoIdleEnabled);

    updateAutoIdleToggleUI();

    if (isAutoIdleEnabled) {
        showToast("🌙 자동 몰입 모드 켜짐 (4초 후 발동)");
        resetIdleTimer(); // 켜는 즉시 타이머 가동
    } else {
        showToast("💡 자동 몰입 모드 꺼짐");
        if (idleTimer) clearTimeout(idleTimer);
        document.body.classList.remove('is-idle'); // 끄는 즉시 밝게 복구
    }
}

// 4. 우측 메뉴 UI 텍스트 및 색상 변경
function updateAutoIdleToggleUI() {
    const textSpan = document.getElementById('autoIdleToggleText');
    if (!textSpan) return;
    const icon = textSpan.previousElementSibling;

    if (isAutoIdleEnabled) {
        textSpan.innerText = "자동 몰입 모드 ON";
        if (icon) icon.style.color = "var(--accent)";
    } else {
        textSpan.innerText = "자동 몰입 모드 OFF";
        if (icon) icon.style.color = "var(--sub)";
    }
}

// 5. 마우스, 키보드, 스크롤 감지 시 타이머 초기화 이벤트 연결
['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'].forEach(evt => {
    window.addEventListener(evt, resetIdleTimer, { passive: true });
});

// 6. 앱 시작 시 UI 동기화 및 최초 1회 실행
window.addEventListener('DOMContentLoaded', updateAutoIdleToggleUI);
resetIdleTimer();
