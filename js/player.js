// --- 리얼 스펙트럼 비주얼라이저 (Web Audio API & 마이크 우회) ---
function startVisualizer() {
    // TODO
}
function stopVisualizer() {
    if (typeof stopViz === 'function') stopViz();
}

// --- 📌 항상 위 고정 (PIP) 모드 로직 ---
let isAlwaysOnTop = false;
let isPipLocked = false; // 🚨 핵심: 중복 실행(더블 클릭) 방지용 자물쇠

async function toggleAlwaysOnTop() {
    if (isPipLocked) return; // 자물쇠가 잠겨있으면 중복 명령 무시
    isPipLocked = true; // 실행 시작과 동시에 자물쇠 잠금

    try {
        if (window.electronAPI) {
            isAlwaysOnTop = await window.electronAPI.toggleAlwaysOnTop();
        }
        updateAlwaysOnTopUI();

        if (isAlwaysOnTop) {
            document.body.classList.add('is-pip');
            showToast("📌 PIP 모드 켜짐 (우측 하단 미니창)");
        } else {
            document.body.classList.remove('is-pip');
            showToast("📌 원래 화면으로 복구");
        }
    } catch (err) {
        console.error("PIP 모드 전환 실패:", err);
    } finally {
        // 0.5초 뒤에 자물쇠 해제 (이 시간 동안 겹쳐서 들어오는 ESC 신호는 모두 방어함)
        setTimeout(() => { isPipLocked = false; }, 500);
    }
}

// --- 🚨 유튜브 iframe 포커스 트랩 방어 (ESC 강제 인식) 통합 ---
if (window.electronAPI) {
    window.electronAPI.onTriggerEscape(async () => {
        if (document.body.classList.contains('is-pip')) {
            await toggleAlwaysOnTop();
        } else if (document.body.classList.contains('is-fullscreen')) {
            document.body.classList.remove('is-fullscreen');
            showToast("전체화면 해제");
        }
    });
}

// UI(텍스트, 색상) 업데이트 함수
function updateAlwaysOnTopUI() {
    const textSpan = $('alwaysOnTopToggleText');
    if (!textSpan) return;
    const icon = textSpan.previousElementSibling;
    if (isAlwaysOnTop) {
        textSpan.innerText = "항상 위 고정 ON";
        if (icon) icon.style.color = "var(--accent)";
    } else {
        textSpan.innerText = "항상 위 고정 OFF";
        if (icon) icon.style.color = "var(--sub)";
    }
}



// --- 시네마 딥 포커스 모드 로직 ---
let isCinemaMode = false;

function toggleCinemaMode() {
    isCinemaMode = !isCinemaMode;
    closeMenu(); // 열려있는 우측 상단 메뉴 닫기

    const overlay = $('cinemaOverlay');
    const textSpan = $('cinemaToggleText');

    if (isCinemaMode) {
        document.body.classList.add('cinema-on');
        if (overlay) overlay.classList.add('active');
        if (textSpan) textSpan.innerText = "시네마 모드 끄기";
        showToast("🍿 시네마 딥 포커스 모드 ON");

        // 영상이 일시정지 상태라면 센스있게 자동 재생
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();

        }
    } else {
        document.body.classList.remove('cinema-on');
        if (overlay) overlay.classList.remove('active');
        if (textSpan) textSpan.innerText = "시네마 모드 켜기";
        showToast("💡 시네마 모드 OFF");
    }
}


const tag = document.createElement('script'); tag.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(tag);

function goToPlayback() {
    const p = $('playerBlock');
    if (p) {
        const videoFrame = p.querySelector('.player-frame');
        // 영상 영역이 있으면 영상 중앙으로, 없으면 전체 블록 중앙으로 이동
        if (videoFrame) {
            videoFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            p.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}
function playVideo(target, containerId) {
    if (player && player.getCurrentTime && queueIndex !== -1) {
        const prevVideo = queue[queueIndex];
        const cur = Math.floor(player.getCurrentTime());
        const dur = Math.floor(player.getDuration());

        if (dur > 0) {
            watchProgress[prevVideo.id] = { t: cur, d: dur };
            window.Store.debouncedSave();
            updateCardProgressBar(prevVideo.id, cur, dur);
        }
    }
    if (!containerId) containerId = isShowingLikes ? 'likeListContent' : 'results';
    let targetList = isShowingLikes ? currentLikesList : currentData;

    let idx = -1;
    if (typeof target === 'string') {
        idx = targetList.findIndex(v => v.id === target);
    } else {
        idx = target;
    }

    if (idx < 0 || idx >= targetList.length) return;

    queue = targetList;
    queueIndex = idx;
    const v = queue[idx];

    // PWA: 로크 스크린 미디어 컨트롤(MediaSession API) 연동
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: v.title,
            artist: v.channelTitle,
            artwork: [
                { src: v.thumb, sizes: '512x512', type: 'image/jpeg' }
            ]
        });
        navigator.mediaSession.setActionHandler('play', function() { if (player && player.playVideo) player.playVideo(); });
        navigator.mediaSession.setActionHandler('pause', function() { if (player && player.pauseVideo) player.pauseVideo(); });
        navigator.mediaSession.setActionHandler('previoustrack', function() { prev(); });
        navigator.mediaSession.setActionHandler('nexttrack', function() { next(); });
    }

    const titleText = escapeHtml(v.title) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    $('marqueeWrap').innerHTML = `<div class="mn-title">${titleText}</div><div class="mn-title">${titleText}</div>`;

    $('miniSub').innerText = v.channelTitle;

    $('marqueeWrap').classList.remove('paused');
    $('miniThumb').classList.remove('paused');

    if (isMiniPlayerAllowed) {
        $('mini').classList.add('visible');
    }

    updatePlayBtnIcon(true);

    const mnBtn = document.querySelector('.mn-menu-btn');
    if (mnBtn) mnBtn.setAttribute('onclick', `openMenu(event, '${v.id}')`);

    $('ambient-bg').style.background = `url(${v.thumb}) center/cover no-repeat fixed`;
    $('miniThumb').classList.add('playing');
    $('miniThumb').innerHTML = `<img src="${v.thumb}">`;

    document.querySelectorAll('.u-card.active').forEach(e => e.classList.remove('active'));
    const card = document.querySelector(`#${containerId} #c-${v.id}`);
    if (card) card.classList.add('active');

    const oldP = $('playerBlock'); if (oldP) oldP.remove();
    const pb = document.createElement('div'); pb.id = 'playerBlock'; pb.className = 'player-block';

    // [핵심] 설명란 및 댓글 섹션 HTML 주입
    const viewText = v.viewCount ? `조회수 ${fmtNum(v.viewCount)}회` : '';
    const cmtCountText = v.commentCount ? `댓글 ${Number(v.commentCount).toLocaleString()}개` : '댓글';

    pb.innerHTML = `
  <div class="player-frame" id="customPlayerFrame" style="width:100%; aspect-ratio:16/9; background:#000;">
      <iframe id="playerHost" allow="fullscreen; autoplay; encrypted-media; picture-in-picture" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" style="width:100%; height:100%; border:none;"></iframe>
  </div>
  
  <div class="info-toggle-bar" onclick="toggleExtraInfo('${v.id}')">
      <span style="display:flex; align-items:center; gap:8px;">
          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:var(--sub);"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>
          설명 및 댓글
      </span>
      <button class="info-toggle-btn" id="extraInfoBtn">보기 ▼</button>
  </div>
  
  <div id="extraInfoContainer">
      <div class="vid-info-box" id="vidInfoBox" onclick="toggleDescription()">
          <div style="font-weight:700; margin-bottom:8px;">${viewText}</div>
          <div class="vid-desc" id="vidDesc">${escapeHtml(v.description)}</div>
          <div class="desc-toggle" id="vidDescToggle">더보기</div>
      </div>
      <div class="cmt-section" id="commentsSection">
          <div class="cmt-header">${cmtCountText}</div>
          <div id="commentsList" data-loaded="false"></div>
          <button id="loadMoreCommentsBtn" class="load-more-btn" style="display:none;" onclick="loadComments('${v.id}')">댓글 더보기</button>
      </div>
  </div>
`;

    if (card) {
        if (viewMode === 'grid') {
            const siblings = Array.from($(containerId).children);
            const myIdx = siblings.indexOf(card);
            const baseTop = card.offsetTop;
            let lastInRow = card;
            for (let i = myIdx + 1; i < siblings.length; i++) {
                if (siblings[i].offsetTop > baseTop + 20) break;
                lastInRow = siblings[i];
            }
            lastInRow.insertAdjacentElement('afterend', pb);
        } else {
            card.insertAdjacentElement('afterend', pb);
        }
    } else {
        $(containerId).prepend(pb);
    }

    setTimeout(() => {
        // 전체 블록(pb)이 아닌 영상 프레임 부분만 찾아서 중앙으로 스크롤합니다.
        const videoFrame = pb.querySelector('.player-frame');
        if (videoFrame) videoFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);

    if (player) { player.destroy(); player = null; }

    // 1. 영상을 불러오기 전, 이어보기 시간(startTime)을 먼저 계산합니다.
    let startTime = 0;
    if (watchProgress[v.id] && watchProgress[v.id].t > 0) {
        const total = v.duration || watchProgress[v.id].d;
        if (total > 0 && (watchProgress[v.id].t / total) < 0.95) {
            startTime = watchProgress[v.id].t;
            showToast(`🔄 이어보기: ${fmtDur(startTime)}`);
        }
    }

    // 2. iframe에 직접 넣을 유튜브 영상 주소(src)를 조립합니다. (광고 최소화를 위해 nocookie 도메인 사용)
    const originUrl = encodeURIComponent(window.location.origin);
    let iframeSrc = `https://www.youtube-nocookie.com/embed/${v.id}?enablejsapi=1&autoplay=1&playsinline=1&controls=1&disablekb=0&rel=0&modestbranding=1&fs=1&iv_load_policy=3&origin=${originUrl}`;
    if (startTime > 0) iframeSrc += `&start=${startTime}`;

    // 3. pb.innerHTML에 src가 완성된 iframe을 삽입합니다.
    pb.innerHTML = `
  <div class="player-frame" id="customPlayerFrame" style="width:100%; aspect-ratio:16/9; background:#000;">
      <iframe id="playerHost" src="${iframeSrc}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" style="width:100%; height:100%; border:none;"></iframe>
  </div>
      
      <div class="info-toggle-bar" onclick="toggleExtraInfo('${v.id}')">
          <span style="display:flex; align-items:center; gap:8px;">
              <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:var(--sub);"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>
              설명 및 댓글
          </span>
          <button class="info-toggle-btn" id="extraInfoBtn">보기 ▼</button>
      </div>
      
      <div id="extraInfoContainer">
          <div class="vid-info-box" id="vidInfoBox" onclick="toggleDescription()">
              <div style="font-weight:700; margin-bottom:8px;">${viewText}</div>
              <div class="vid-desc" id="vidDesc">${escapeHtml(v.description)}</div>
              <div class="desc-toggle" id="vidDescToggle">더보기</div>
          </div>
          <div class="cmt-section" id="commentsSection">
              <div class="cmt-header">${cmtCountText}</div>
              <div id="commentsList" data-loaded="false"></div>
              <button id="loadMoreCommentsBtn" class="load-more-btn" style="display:none;" onclick="loadComments('${v.id}')">댓글 더보기</button>
          </div>
      </div>
    `;

    if (card) {
        if (viewMode === 'grid') {
            const siblings = Array.from($(containerId).children);
            const myIdx = siblings.indexOf(card);
            const baseTop = card.offsetTop;
            let lastInRow = card;
            for (let i = myIdx + 1; i < siblings.length; i++) {
                if (siblings[i].offsetTop > baseTop + 20) break;
                lastInRow = siblings[i];
            }
            lastInRow.insertAdjacentElement('afterend', pb);
        } else {
            card.insertAdjacentElement('afterend', pb);
        }
    } else {
        $(containerId).prepend(pb);
    }

    setTimeout(() => {
        const videoFrame = pb.querySelector('.player-frame');
        if (videoFrame) videoFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);

    if (player) { player.destroy(); player = null; }

    // 4. iframe에 이미 영상 정보(src)가 들어있으므로, events만 연결하여 초기화합니다.
    player = new YT.Player('playerHost', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onStateChange,
            'onError': onPlayerError
        }
    });
} // <-- playVideo 함수 끝
function onPlayerError(e) { if ([100, 101, 150, 153].includes(e.data)) { showToast(`⚠️ 재생 불가. 스킵합니다.`); setTimeout(() => next(), 1000); } }



function onStateChange(e) {
    // ... (기존 변수들)
    const marquee = $('marqueeWrap');
    const thumb = $('miniThumb');

    if (e.data === 1) { // 🟢 재생 중 (PLAYING)
        // 🚨 핵심 해결책: 재생이 시작되는 순간 볼륨을 다시 한번 꽉 잡아줍니다.
        const savedVol = localStorage.getItem('yt_volume');
        if (savedVol !== null && e.target && e.target.setVolume) {
            e.target.unMute();
            e.target.setVolume(Number(savedVol));
        }

        updatePlayBtnIcon(true);
        startTimer();
        startVisualizer();
        thumb.classList.add('playing');
        thumb.classList.remove('paused');
        marquee.classList.remove('paused');

        resetPlayerIdle();

    } else if (e.data === 2 || e.data === 0) { // ⏸️ 일시정지 또는 ⏹️ 종료
        updatePlayBtnIcon(false);
        stopTimer();
        stopVisualizer();
        thumb.classList.add('paused');
        marquee.classList.add('paused');

        // 🔥 핵심: 일시정지 중에는 커스텀 컨트롤러가 숨지 않고 계속 보이도록 강제 고정!
        const frame = $('customPlayerFrame');
        if (frame) {
            frame.classList.add('active-controls');
            frame.style.cursor = 'default';
            clearTimeout(playerIdleTimer); // 숨김 타이머 강제 취소
        }

        if (e.data === 0) next();
    }
}

function next() { let nextIdx = queueIndex + 1; if (nextIdx < queue.length) playVideo(nextIdx); else showToast("마지막 곡입니다."); }
function prev() { if (queueIndex > 0) playVideo(queueIndex - 1); }
function togglePlay() { if (!player || !player.getPlayerState) return; player.getPlayerState() === 1 ? player.pauseVideo() : player.playVideo(); }
function closePlayer() { if (player) { player.destroy(); player = null; } $('playerBlock')?.remove(); stopTimer(); stopViz(); $('ambient-bg').style.background = '#000'; $('miniThumb').classList.remove('playing'); $('mini').classList.remove('visible'); }

let timer = null;
// 1️⃣ 재생 버튼 아이콘 동기화 로직 업데이트 (미니플레이어 + 커스텀플레이어 둘 다 변경)
function updatePlayBtnIcon(isPlaying) {
    const btn = $('playBtn'); // 하단 미니플레이어
    const cBtn = $('cPlayBtn'); // 새로 만든 커스텀 플레이어

    const pauseSvg = `<svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>`;
    const playSvg = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;

    if (btn) btn.innerHTML = isPlaying ? pauseSvg : playSvg;
    if (cBtn) cBtn.innerHTML = isPlaying ? pauseSvg : playSvg;
}

// 2️⃣ 진행률 바 및 시간 텍스트 업데이트 (startTimer 덮어쓰기)
function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        if (player && player.getCurrentTime) {
            const cur = player.getCurrentTime();
            const dur = player.getDuration();

            if (dur) {
                // 미니플레이어 진행률 업데이트
                if ($('seekFill')) $('seekFill').style.width = (cur / dur * 100) + '%';
                // 커스텀 플레이어 진행률 업데이트
                if ($('cProgressFill')) $('cProgressFill').style.width = (cur / dur * 100) + '%';

                // 커스텀 플레이어 시간 텍스트 업데이트
                if ($('cTimeDisp')) $('cTimeDisp').innerText = `${fmtDur(cur)} / ${fmtDur(dur)}`;

                // 이어보기 저장
                if (dur > 0 && cur > 5) {
                    const currentVideo = queue[queueIndex];
                    if (currentVideo) {
                        watchProgress[currentVideo.id] = { t: Math.floor(cur), d: Math.floor(dur) };
                        window.Store.debouncedSave();
                    }
                }
            }
        }
    }, 500);
}

// 3️⃣ 커스텀 영상 재생/탐색 로직
function seekCustomVideo(e) {
    if (!player || !player.getDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const dur = player.getDuration();
    if (dur) player.seekTo(dur * pos, true);
}

// 4️⃣ 커스텀 전체화면 로직 (웹 풀스크린 방식 - 100% 작동)
function toggleCustomFullScreen(e) {
    if (e) e.stopPropagation(); // 클릭 씹힘 방지

    // body에 is-fullscreen 클래스를 넣었다 뺐다 스위치 역할
    document.body.classList.toggle('is-fullscreen');

    if (document.body.classList.contains('is-fullscreen')) {
        showToast("📺 전체화면 모드 (ESC 또는 다시 더블클릭하여 해제)");
    } else {
        showToast("전체화면 해제");
    }
}

// 💡 보너스: ESC 키를 눌러서 전체화면을 빠져나올 수 있게 방어 코드 추가
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('is-fullscreen')) {
        document.body.classList.remove('is-fullscreen');
        showToast("전체화면 해제");
    }
});

// 5️⃣ 시네마틱 마우스 숨김 로직 (가만히 있으면 컨트롤러와 커서 숨김)
let playerIdleTimer;
function resetPlayerIdle() {
    const frame = $('customPlayerFrame');
    if (!frame) return;

    // 마우스를 움직이면 컨트롤러와 커서를 다시 표시
    frame.classList.add('active-controls');
    frame.style.cursor = 'default';
    clearTimeout(playerIdleTimer);

    // 3초간 가만히 있으면 다시 숨김 (재생 중일 때만)
    playerIdleTimer = setTimeout(() => {
        if (player && typeof player.getPlayerState === 'function' && player.getPlayerState() === 1) {
            frame.classList.remove('active-controls');
            frame.style.cursor = 'none'; // 몰입감을 위해 마우스 커서도 아예 숨김!
        }
    }, 3000);
}
function stopTimer() { if (timer) clearInterval(timer); }
function seekVideo(e) { if (!player || !player.getDuration) return; const rect = e.currentTarget.getBoundingClientRect(); const pos = (e.clientX - rect.left) / rect.width; const dur = player.getDuration(); if (dur) player.seekTo(dur * pos, true); }

function toggleMiniPlayerVisibility() {
    isMiniPlayerAllowed = !isMiniPlayerAllowed;
    localStorage.setItem('yt_mini_enabled', isMiniPlayerAllowed);

    updateMiniPlayerToggleText();

    const mini = $('mini');
    if (isMiniPlayerAllowed) {
        if (queueIndex !== -1) mini.classList.add('visible');
        showToast("미니플레이어 켜짐");
    } else {
        mini.classList.remove('visible');
        showToast("미니플레이어 꺼짐");
    }
}

function updateMiniPlayerToggleText() {
    const text = $('miniPlayerToggleText');
    const icon = text.previousElementSibling;
    if (isMiniPlayerAllowed) {
        text.innerText = "미니플레이어 ON";
        icon.style.color = "var(--accent)";
    } else {
        text.innerText = "미니플레이어 OFF";
        icon.style.color = "var(--sub)";
    }
}
// 4️⃣ 커스텀 전체화면 로직 (맥 네이티브 통신 버전)
async function toggleCustomFullScreen(e) {
    if (e) e.stopPropagation(); // 클릭 씹힘 방지

    try {
        // main.js에 맥 네이티브 전체화면 토글을 요청하고 결과를 받음
        let isNowFullScreen = false;
        if (window.electronAPI) {
            isNowFullScreen = await window.electronAPI.toggleFullscreen();
        } else {
            isNowFullScreen = !document.body.classList.contains('is-fullscreen');
        }

        // CSS UI도 맞춰서 변경 (다른 UI 숨기기 및 영상 꽉 채우기)
        if (isNowFullScreen) {
            document.body.classList.add('is-fullscreen');
            showToast("📺 맥 전체화면 켜짐 (ESC로 해제)");
        } else {
            document.body.classList.remove('is-fullscreen');
            showToast("전체화면 해제");
        }
    } catch (err) {
        console.error("네이티브 전체화면 요청 실패:", err);
    }
}


// 헤더 메뉴 아코디언 열기/닫기 제어
function toggleMenuFold(el) {
    const currentGroup = el.parentElement;

    // 깔끔함을 위해 클릭한 항목 외에 다른 열려있는 그룹은 닫아줍니다.
    document.querySelectorAll('.hm-group').forEach(group => {
        if (group !== currentGroup) {
            group.classList.remove('open');
        }
    });

    // 현재 클릭한 그룹의 상태(open 클래스)를 토글합니다.
    currentGroup.classList.toggle('open');
}
function onPlayerReady(e) {
    const savedVol = localStorage.getItem('yt_volume');
    if (savedVol !== null) {
        e.target.unMute();
        e.target.setVolume(Number(savedVol));
    }
    // [추가] 모바일 사파리 등에서 iframe 교체 후 자동재생이 씹히는 현상 방어
    if (e.target && e.target.playVideo) {
        setTimeout(() => {
            e.target.playVideo();
        }, 150);
    }
}
let nativeVolSyncTimer = null; // 상단 변수 영역에 추가해 주세요.

function onStateChange(e) {
    const marquee = $('marqueeWrap');
    const thumb = $('miniThumb');

    if (e.data === 1) { // 🟢 재생 중
        // 1. 영상 시작 순간 볼륨 한 번 더 강제 고정 (초기화 버그 방어)
        const savedVol = localStorage.getItem('yt_volume');
        if (savedVol !== null && e.target && e.target.setVolume) {
            e.target.unMute();
            e.target.setVolume(Number(savedVol));
        }

        // 2. 유튜브 플레이어 기본 볼륨바 <-> 미니플레이어 볼륨바 실시간 동기화
        if (nativeVolSyncTimer) clearInterval(nativeVolSyncTimer);
        nativeVolSyncTimer = setInterval(() => {
            // 유저가 하단 미니플레이어 볼륨을 드래그 중이 아닐 때만 체크
            if (player && typeof player.getVolume === 'function' && !isVolDragging) {
                const nativeVol = player.getVolume();
                const currentSavedVol = Number(localStorage.getItem('yt_volume') || 100);

                // 유튜브 화면에서 볼륨을 바꿨다면? -> 로컬스토리지와 미니플레이어에 반영
                if (nativeVol !== currentSavedVol) {
                    localStorage.setItem('yt_volume', nativeVol);
                    const slider = $('volSlider');
                    if (slider) slider.value = nativeVol;
                }
            }
        }, 500); // 0.5초마다 볼륨 변화 감지

        updatePlayBtnIcon(true);
        startTimer();
        startVisualizer();
        thumb.classList.add('playing');
        thumb.classList.remove('paused');
        marquee.classList.remove('paused');

    } else if (e.data === 2 || e.data === 0) { // ⏸️ 일시정지 또는 ⏹️ 종료
        // 영상이 멈추면 볼륨 감지 타이머도 멈춤
        if (nativeVolSyncTimer) clearInterval(nativeVolSyncTimer);

        updatePlayBtnIcon(false);
        stopTimer();
        stopVisualizer();
        thumb.classList.add('paused');
        marquee.classList.add('paused');

        if (e.data === 0) next();
    }
}
