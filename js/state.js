// --- [고도화 1, 2] 캐시 저장소 및 필터링 키워드 설정 ---
const apiCache = new Map(); // API 응답을 임시 저장할 메모리 공간
let bannedKeywords = JSON.parse(localStorage.getItem('yt_banned_keywords')) || [
    "#shorts", "쇼츠", "틱톡", "tiktok", "릴스", "reels",
    "충격", "경악", "논란", "폭로", "결국", "단독"
];

// --- [고도화 3] 안정성을 위한 로컬 에러 로깅 시스템 ---
function logErrorToFile(msg, err) {
    try {
        const timestamp = new Date().toISOString();
        const errorDetail = err && err.message ? err.message : err;
        const logMsg = `[${timestamp}] ${msg} : ${errorDetail}\n`;
        // 메인 프로세스에 로그 작성 요청
        if (window.electronAPI) {
            window.electronAPI.appendErrorLog(logMsg);
        }
        console.error(logMsg); // 개발자 도구에도 출력
    } catch (e) {
        console.error("로깅 실패:", e);
    }
}
// <script> 태그 시작 직후에 넣으세요
(function () {
    // 1. WebDriver 속성 제거 (봇으로 오해받는 것을 방지)
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });

    // 2. 언어 및 플랫폼 정보를 일반 크롬과 동일하게 위장
    Object.defineProperty(navigator, 'languages', { get: () => ['ko-KR', 'ko', 'en-US', 'en'] });
    Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });

    // 3. 일렉트론 특유의 객체들이 웹사이트에 노출되지 않도록 보호
    if (window.process && window.process.type === 'renderer') {
        // 보안을 위해 렌더러에서는 nodeJS 기능을 숨기는 것이 좋습니다.
    }
})();
// 1. 상태 변수를 가장 먼저 선언! (에러 해결의 핵심)
var isAutoIdleEnabled = localStorage.getItem('yt_auto_idle') !== 'false';
var idleTimer = null;
var IDLE_TIMEOUT = 4000; // 4초

window.onerror = function (m) { showToast("알림: " + m); return false; };

const $ = (id) => document.getElementById(id);
const escapeHtml = (t) => (t || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const fmtNum = (n) => { n = Number(n); return n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : n; };
const parseDuration = (d) => { if (!d) return 0; const m = d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/); if (!m) return 0; return (parseInt(m[1] || 0) * 3600) + (parseInt(m[2] || 0) * 60) + parseInt(m[3] || 0); };
const fmtDur = (s) => { s = Math.max(0, s | 0); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), z = s % 60; const p = n => String(n).padStart(2, '0'); return h > 0 ? `${h}:${p(m)}:${p(z)}` : `${m}:${p(z)}`; };

// --- [배포용 다중 API 키 자동 스위칭 로직] ---
let apiKeys = [];
let currentKeyIndex = 0;
let API_KEY = "";

try {
    const stored = localStorage.getItem('yt_api_keys');
    if (stored) {
        apiKeys = JSON.parse(stored);
        if (apiKeys.length > 0) API_KEY = apiKeys[0];
    }
} catch (e) { }
let currentData = [], queue = [], queueIndex = -1, nextPageToken = null, currentQuery = {}, viewMode = 'grid', myLikes = new Map(), player = null;
let menuTargetId = "";
let targetChannelId = null;
// [상태 변수] 재생목록 모드 및 페이징 관리
let isPlaylistMode = false;
let currentPlaylistId = null;
let playlistPageToken = null; // 재생목록 전용 다음 페이지 토큰

let blockedVideos = new Set(JSON.parse(localStorage.getItem('yt_block_v') || '[]'));
let blockedChannels = new Set(JSON.parse(localStorage.getItem('yt_block_ch') || '[]'));
let searchHistory = JSON.parse(localStorage.getItem('yt_history') || '[]');
let watchProgress = JSON.parse(localStorage.getItem('yt_watch_progress') || '{}');
let isLoading = false; let vizAnimId = null;
let radioSeedId = null, radioSeedObj = null, radioSeedChannelId = null;
let lastSearchResults = [];
let isShowingLikes = false;
let isSearchSubmitted = false;
let opacityLevel = parseInt(localStorage.getItem('yt_opacity_level') || '0');
const opacityValues = [0.9, 0.2, 0.4, 0.6, 0.8];
let headerOpacityLevel = parseInt(localStorage.getItem('yt_header_opacity_level') || '0');
const headerAlphas = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
let currentCategoryId = '10';
let currentProMode = null;
let isLiveMode = false;
let isRadioMode = false;
let isMiniPlayerAllowed = localStorage.getItem('yt_mini_enabled') !== 'false';
let isNetworkBarEnabled = localStorage.getItem('yt_network_bar_enabled') === 'true'; // [추가] 네트워크 바
let currentLikesList = []; // [추가] 보관함 상태 동기화를 위한 배열
try { const l = localStorage.getItem('yt_my_likes'); if (l) JSON.parse(l).forEach(v => myLikes.set(v.id, v)); } catch (e) { }
