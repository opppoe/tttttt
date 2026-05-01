async function fetchJson(url, isForceRefresh = false, retries = 2) {
    // 1. 캐시 확인: 강제 새로고침이 아니고, 이미 캐시에 데이터가 있다면 API 호출 없이 즉시 반환
    if (!isForceRefresh && apiCache.has(url)) {
        return apiCache.get(url);
    }

    // 2. 자동 재시도 로직 (네트워크 에러 방어)
    for (let i = 0; i <= retries; i++) {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                let errorReason = '';
                try {
                    const errData = await res.json();
                    if (errData.error && errData.error.errors && errData.error.errors.length > 0) {
                        errorReason = errData.error.errors[0].reason;
                    }
                } catch (e) { }

                // 할당량 초과 에러 감지
                const isQuotaError = (res.status === 403 && (errorReason === 'quotaExceeded' || errorReason === 'dailyLimitExceeded')) || res.status === 429;

                if (isQuotaError) {
                    if (currentKeyIndex < apiKeys.length - 1) {
                        const oldKey = apiKeys[currentKeyIndex];
                        currentKeyIndex++;
                        API_KEY = apiKeys[currentKeyIndex];
                        showToast(`🔄 API 쿼터 초과. 다음 키로 전환 (${currentKeyIndex + 1}/${apiKeys.length})`);

                        const urlObj = new URL(url);
                        urlObj.searchParams.set('key', API_KEY);
                        return fetchJson(urlObj.toString(), isForceRefresh, retries);
                    } else {
                        if (confirm("🚨 등록된 모든 API 키의 할당량이 초과되었습니다.\n\n새로운 API Key를 입력하시겠습니까?\n(여러 개는 쉼표로 구분)")) {
                            const newKey = prompt("새로운 API Key (쉼표로 여러 개 입력 가능):");
                            if (newKey && newKey.trim()) {
                                apiKeys = newKey.split(',').map(s => s.trim()).filter(s => s);
                                localStorage.setItem('yt_api_keys', JSON.stringify(apiKeys));
                                currentKeyIndex = 0;
                                API_KEY = apiKeys[0];
                                location.reload();
                                return;
                            }
                        }
                        throw new Error("모든 API 키 할당량 초과");
                    }
                } else {
                    throw new Error(`HTTP Error: ${res.status}`);
                }
            }

            const data = await res.json();

            // 3. 캐시 저장: 성공한 응답은 10분간 보관 후 자동 삭제
            apiCache.set(url, data);
            setTimeout(() => apiCache.delete(url), 1000 * 60 * 10);

            return data;

        } catch (err) {
            logErrorToFile(`API 호출 실패 (${i}/${retries}) - URL: ${url}`, err);

            // 마지막 재시도였거나, 할당량이 완전히 끝났다면 에러 던짐
            if (i === retries || err.message === "모든 API 키 할당량 초과") {
                throw err;
            }
            // 재시도 전 대기 (1초, 2초... 점진적으로 늘어남)
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

function checkKey() {
    if (API_KEY) return true;
    openApiKeyModal(false);
    return false;
}

function openApiKeyModal(isEdit = false) {
    $('apiKeyInput').value = apiKeys.join(', ');
    $('apiCancelBtn').style.display = isEdit ? 'block' : 'none';
    $('apiKeyModal').classList.add('visible');
    if (isEdit) closeMenu();
}

function closeApiKeyModal() {
    $('apiKeyModal').classList.remove('visible');
}

function saveApiKey() {
    const val = $('apiKeyInput').value.trim();
    if (!val) return showToast("❌ API 키를 입력해주세요!");

    apiKeys = val.split(',').map(s => s.trim()).filter(s => s);
    localStorage.setItem('yt_api_keys', JSON.stringify(apiKeys));

    currentKeyIndex = 0;
    API_KEY = apiKeys[0];

    closeApiKeyModal();
    showToast("✅ API 키가 성공적으로 장전되었습니다.");
    triggerSearch();
}

function preservePlayer() { const p = $('playerBlock'); if (p) $('safeZone').appendChild(p); }

let lastLoadedSource = '';
async function searchVideos(isNew, autoPlayFirst = false, isForceRefresh = false) {
    if (!checkKey()) return;

    let q;
    if (isNew) {
        q = $('keyword').value.trim();

        if (currentProMode === 'invest' && !q) {
            q = "주식 경제 속보";
            $('keyword').value = q;
            showToast("📈 투자 모드: 실시간 시황 자동 검색");
        }

        if (currentProMode === 'diy' && !q) {
            q = "셀프 인테리어 꿀팁";
            $('keyword').value = q;
        }
        if (!q) return showToast("검색어를 입력하세요.");
    } else {
        q = currentQuery.q;
    }

    if (debounceTimer) clearTimeout(debounceTimer);

    if (isNew) {
        isSearchSubmitted = true;
        $('suggestBox').classList.remove('visible');
        isLoading = false;
        isPlaylistMode = false;
        currentPlaylistId = null;
        playlistPageToken = null;
    }

    const isHq = $('hqMode').checked ? 'HQ' : 'STD';

    if (isLoading) return;
    isLoading = true;
    if (isShowingLikes) toggleLikesView();

    if (isNew && q) {
        searchHistory = searchHistory.filter(h => h !== q);
        searchHistory.unshift(q);
        if (searchHistory.length > 15) searchHistory.pop();
        window.Store.debouncedSave();
    }

    if (isNew) {
        currentQuery = { q, mode: isRadioMode ? 'radio' : 'search' };
        nextPageToken = null; currentData = [];
        radioSeedId = null; radioSeedChannelId = null; radioSeedObj = null;
        lastLoadedSource = 'api';
        closePlayer();
        $('results').innerHTML = ""; $('seedInfo').style.display = 'none';
        let skel = ''; for (let i = 0; i < 12; i++) skel += `<div class="skel shimmer"></div>`;
        $('results').innerHTML = skel;
    }

    try {
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=${encodeURIComponent(API_KEY)}`;

        const goal = $('goal').value;
        const isHqChecked = $('hqMode').checked;
        let searchQuery = q;

        if (isRadioMode && isNew) {
            const seedUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(q)}&videoCategoryId=10&key=${encodeURIComponent(API_KEY)}`;
            // 새로고침 시 캐시를 무시하도록 매개변수 전달
            const seedData = await fetchJson(seedUrl, isForceRefresh);
            if (!seedData.items?.length) { $('results').innerHTML = '<div class="center-msg">검색 결과 없음</div>'; isLoading = false; return; }

            const sItem = seedData.items[0];
            radioSeedId = sItem.id.videoId;
            radioSeedChannelId = sItem.snippet.channelId;
            radioSeedObj = {
                id: radioSeedId, title: sItem.snippet.title, channelTitle: sItem.snippet.channelTitle,
                thumb: sItem.snippet.thumbnails.medium?.url, isSeed: true, channelId: radioSeedChannelId
            };
            let cleanTitle = sItem.snippet.title.replace(/\(.*\)|\[.*\]/g, "").trim();
            const radioQ = `${cleanTitle} ${sItem.snippet.channelTitle} mix`;
            currentQuery.radioQuery = radioQ;
            $('seedInfo').innerHTML = `📡 <b>${escapeHtml(sItem.snippet.title)}</b> 라디오 믹스`;
            $('seedInfo').style.display = 'block';
            url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&key=${encodeURIComponent(API_KEY)}&videoCategoryId=10&q=${encodeURIComponent(radioQ)}`;
        }
        else {
            if (targetChannelId) {
                url += `&channelId=${targetChannelId}`;
            }

            if (currentProMode === 'work' && !searchQuery.toLowerCase().includes('playlist')) searchQuery += " playlist";
            if (currentProMode === 'invest' && !searchQuery) searchQuery = "주식 경제 속보";

            let order = 'relevance';
            if (goal === 'trend' || goal === 'speed') order = 'date';
            else if (goal === 'hit') order = 'viewCount';
            else if (goal === 'rating') order = 'rating';
            url += `&order=${order}`;

            if (currentCategoryId === 'playlist') {
                url += `&type=playlist`;
            } else {
                url += `&type=video`;

                if (currentCategoryId !== '0') url += `&videoCategoryId=${currentCategoryId}`;
                if (isLiveMode) url += `&eventType=live`;

                const durVal = $('duration').value;
                if (durVal === 'long') url += `&videoDuration=long`;

                if (isHqChecked) url += `&videoDefinition=high`;
            }

            if (searchQuery) {
                let finalQuery = searchQuery;
                const dVal = $('duration').value;
                if ((dVal === 'any' || dVal === 'medium') && !targetChannelId && !finalQuery.toLowerCase().includes('-shorts')) {
                    finalQuery += ' -shorts';
                }
                url += `&q=${encodeURIComponent(finalQuery)}`;
            }
        }

        if (nextPageToken) url += `&pageToken=${nextPageToken}`;

        // 🚨 변경 포인트: 여기서 fetchJson 호출 시 isForceRefresh 옵션을 넘깁니다.
        const data = await fetchJson(url, isForceRefresh);
        nextPageToken = data.nextPageToken;
        document.querySelectorAll('.skel').forEach(e => e.remove());

        if (currentCategoryId === 'playlist' && !targetChannelId) {
            const playlistIds = data.items.map(i => i.id.playlistId).join(',');
            const channelIds = [...new Set(data.items.map(i => i.snippet.channelId))].slice(0, 50).join(',');

            let itemCountMap = {};
            let channelMap = {};

            await Promise.all([
                (async () => {
                    if (playlistIds) {
                        try {
                            const pDetails = await fetchJson(`https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&id=${playlistIds}&key=${encodeURIComponent(API_KEY)}`, isForceRefresh);
                            pDetails.items.forEach(d => itemCountMap[d.id] = d.contentDetails.itemCount);
                        } catch (e) { }
                    }
                })(),
                (async () => {
                    if (channelIds) {
                        try {
                            const cDetails = await fetchJson(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${encodeURIComponent(API_KEY)}`, isForceRefresh);
                            cDetails.items.forEach(c => {
                                channelMap[c.id] = {
                                    thumb: c.snippet.thumbnails.default?.url,
                                    subs: c.statistics.subscriberCount
                                };
                            });
                        } catch (e) { }
                    }
                })()
            ]);

            const newItems = data.items.map(i => {
                const chData = channelMap[i.snippet.channelId] || {};
                return {
                    id: i.id.playlistId,
                    title: i.snippet.title,
                    channelTitle: i.snippet.channelTitle,
                    channelId: i.snippet.channelId,
                    thumb: i.snippet.thumbnails?.medium?.url || '',
                    duration: 0,
                    viewCount: 0,
                    itemCount: itemCountMap[i.id.playlistId] || 0,
                    channelThumb: chData.thumb || '',
                    subCount: chData.subs || 0,
                    isNew: false,
                    isHot: false,
                    isPlaylist: true
                };
            });

            currentData = [...currentData, ...newItems];
            if (isNew) {
                queueIndex = -1; renderResults(newItems, true, 'results');
                if (isForceRefresh) showToast("🔄 새로고침 완료");
                else showToast("📂 재생목록 검색 완료");
            } else {
                renderResults(newItems, false, 'results');
            }
        } else {
            const ids = data.items?.map(x => x.id.videoId).join(',');
            let newItems = [];

            if (ids) {
                const channelIds = [...new Set(data.items.map(i => i.snippet.channelId))].slice(0, 50).join(',');
                let dData = null;
                let channelMap = new Map();

                // 🚀 핵심 성능 최적화: video 디테일과 channel 디테일을 병렬(Promise.all)로 동시 호출하여 대기 시간 반토막
                await Promise.all([
                    (async () => {
                        dData = await fetchJson(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${ids}&key=${encodeURIComponent(API_KEY)}`, isForceRefresh);
                    })(),
                    (async () => {
                        if (channelIds) {
                            try {
                                const cData = await fetchJson(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${encodeURIComponent(API_KEY)}`, isForceRefresh);
                                cData.items.forEach(c => {
                                    channelMap.set(c.id, {
                                        thumb: c.snippet.thumbnails.default?.url,
                                        subs: c.statistics.subscriberCount,
                                        customUrl: c.snippet.customUrl
                                    });
                                });
                            } catch (e) { logErrorToFile("채널 정보 로드 실패", e); }
                        }
                    })()
                ]);

                const now = new Date();

                newItems = dData.items.map(i => {
                    const snippet = i.snippet;
                    const chInfo = channelMap.get(snippet.channelId) || {};
                    const subs = Number(chInfo.subs || 0);
                    const publishedAt = new Date(snippet.publishedAt);
                    const hoursDiff = (now - publishedAt) / (1000 * 60 * 60);
                    const isNew = hoursDiff < 72;
                    const viewCount = Number(i.statistics.viewCount);
                    const vph = hoursDiff > 0 ? viewCount / hoursDiff : 0;
                    const isHot = vph > 1000 || viewCount > 1000000;

                    const likeCount = Number(i.statistics.likeCount || 0);
                    const commentCount = Number(i.statistics.commentCount || 0);
                    const engagement = viewCount > 0 ? ((likeCount + commentCount) / viewCount * 100).toFixed(1) : 0;

                    return {
                        id: i.id,
                        title: snippet.title || 'Unknown Title',
                        channelTitle: snippet.channelTitle || 'Unknown Channel',
                        channelId: snippet.channelId,
                        thumb: snippet.thumbnails?.medium?.url || '',
                        duration: parseDuration(i.contentDetails.duration),
                        viewCount: viewCount,
                        likeCount: likeCount,
                        engagement: engagement,
                        vph: vph,
                        channelThumb: chInfo.thumb || '',
                        subCount: subs,
                        description: snippet.description || '',
                        commentCount: commentCount,
                        isVerified: subs > 100000,
                        isHot: isHot,
                        isNew: isNew,
                        categoryId: snippet.categoryId || '10'
                    };
                }).filter(i => {
                    // 🚨 핵심 변경 포인트: 블랙리스트 키워드 및 기존 차단 필터링
                    if (blockedVideos.has(i.id) || blockedChannels.has(i.channelId)) return false;

                    // 제목이나 채널명에 금지어(쇼츠, 틱톡 등)가 포함되어 있으면 목록에서 제외
                    const textToSearch = (i.title + " " + i.channelTitle).toLowerCase();
                    const isBanned = bannedKeywords.some(keyword => textToSearch.includes(keyword.toLowerCase()));
                    if (isBanned) return false;

                    const currentDur = $('duration').value;
                    if (!targetChannelId) {
                        if (currentDur === 'any' && i.duration <= 60) return false;
                        if (currentDur === 'medium' && (i.duration < 180 || i.duration > 1200)) return false;
                        if (currentDur === 'long' && i.duration <= 1200) return false;
                    }

                    if (isRadioMode && radioSeedChannelId && i.channelId === radioSeedChannelId) return false;
                    return true;
                });
            }

            if (isRadioMode && isNew && radioSeedObj) {
                newItems = newItems.filter(x => x.id !== radioSeedObj.id);
                newItems.unshift(radioSeedObj);
            }

            currentData = [...currentData, ...newItems];
            lastSearchResults = [...currentData];

            if (isNew) {
                queue = [...newItems]; queueIndex = -1; renderResults(newItems, true, 'results');
                if (isForceRefresh) showToast("🔄 새로고침 완료");
            } else {
                queue = [...queue, ...newItems]; renderResults(newItems, false, 'results');
            }
        }

    } catch (e) {
        logErrorToFile("비디오 검색 에러", e);
        document.querySelectorAll('.skel').forEach(e => e.remove());
    }
    finally {
        isLoading = false;
        setTimeout(() => {
            const anchor = $('scrollAnchor');
            if (anchor && anchor.getBoundingClientRect().top < window.innerHeight + 800 && !isShowingLikes) {
                if (nextPageToken) searchVideos(false);
            }
        }, 100);
    }
}

async function searchPlaylistVideos(playlistId, isMore = false) {
    if (!checkKey()) return;
    if (isLoading) return;
    isLoading = true;

    if (!isMore) {
        isPlaylistMode = true;
        currentPlaylistId = playlistId;
        playlistPageToken = null;
        currentData = [];

        if (isShowingLikes) toggleLikesView();
        $('results').innerHTML = "";
        let skel = ''; for (let i = 0; i < 12; i++) skel += `<div class="skel shimmer"></div>`;
        $('results').innerHTML = skel;
    }

    try {
        let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${encodeURIComponent(API_KEY)}`;
        if (playlistPageToken) url += `&pageToken=${playlistPageToken}`;

        const data = await fetchJson(url);
        playlistPageToken = data.nextPageToken;

        if (!isMore) document.querySelectorAll('.skel').forEach(e => e.remove());

        const videoIds = data.items.map(i => i.snippet.resourceId.videoId).join(',');
        const channelIds = [...new Set(data.items.map(i => i.snippet.channelId))].slice(0, 50).join(',');

        let videoDetailsMap = {};
        let channelMap = {};

        await Promise.all([
            (async () => {
                if (videoIds) {
                    try {
                        const vData = await fetchJson(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${encodeURIComponent(API_KEY)}`);
                        vData.items.forEach(v => {
                            videoDetailsMap[v.id] = {
                                duration: parseDuration(v.contentDetails.duration),
                                viewCount: Number(v.statistics.viewCount),
                                commentCount: Number(v.statistics.commentCount || 0),
                                categoryId: v.snippet.categoryId || '10'
                            };
                        });
                    } catch (e) { }
                }
            })(),
            (async () => {
                if (channelIds) {
                    try {
                        const cData = await fetchJson(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${encodeURIComponent(API_KEY)}`);
                        cData.items.forEach(c => {
                            channelMap[c.id] = {
                                thumb: c.snippet.thumbnails.default?.url,
                                subs: c.statistics.subscriberCount
                            };
                        });
                    } catch (e) { }
                }
            })()
        ]);

        const newItems = data.items.map(i => {
            const snippet = i.snippet;
            const vid = snippet.resourceId.videoId;
            const details = videoDetailsMap[vid] || { duration: 0, viewCount: 0, commentCount: 0 };
            const chData = channelMap[snippet.channelId] || {};

            return {
                id: vid,
                title: snippet.title || 'No Title',
                channelTitle: snippet.channelTitle || 'Unknown',
                channelId: snippet.channelId,
                thumb: snippet.thumbnails?.medium?.url || '',
                duration: details.duration,
                viewCount: details.viewCount,
                description: snippet.description || '',
                commentCount: details.commentCount || 0,
                channelThumb: chData.thumb || '',
                subCount: chData.subs || 0,
                isNew: false,
                isHot: false,
                categoryId: details.categoryId || '10'
            };
        }).filter(item => item.title !== "Private video" && item.title !== "Deleted video");

        currentData = [...currentData, ...newItems];
        queue = currentData;

        if (!isMore) {
            queueIndex = -1;
            renderResults(newItems, true, 'results');
            showToast("📂 재생목록 로드 완료");
        } else {
            renderResults(newItems, false, 'results');
        }

    } catch (e) {
        console.error(e);
        showToast("재생목록을 불러오지 못했습니다.");
    } finally {
        isLoading = false;
        setTimeout(() => {
            const anchor = $('scrollAnchor');
            if (anchor && anchor.getBoundingClientRect().top < window.innerHeight && !isShowingLikes) {
                if (playlistPageToken) searchPlaylistVideos(currentPlaylistId, true);
            }
        }, 200);
    }
}

function searchByChannelId(id, title) {
    targetChannelId = id;
    $('keyword').value = title;
    isShowingLikes = false;
    $('likesResults').style.display = 'none';
    $('results').style.display = ''; // CSS가 display를 결정하게 맡김
    $('likeCountTag').classList.remove('active');
    searchVideos(true);
}
// 변동사항 발생 시 호출되는 통합 저장 함수
async function initTrendBar() {
    // 30분마다 트렌드 바 자동 갱신
    if (!window.trendInterval) {
        window.trendInterval = setInterval(() => initTrendBar(), 1800000);
    }
    try {
        // [수정] RSS 주소 뒤에 ?hl=ko&gl=KR&num=30 을 붙여서 더 많은 데이터를 요청합니다.
        const rssUrl = 'https://news.google.com/rss/trending/section/topic/SEARCH_QUERY?hl=ko&gl=KR&num=30';

        // 유저님의 구글 앱스 스크립트(CORS 프록시) 주소
        const myApiUrl = 'https://script.google.com/macros/s/AKfycbwL4-XU8pyldukU_C6gtwTtZYYoy-iavN6LTGw3cfHQO5gv7pCFjxavIs7g0XrtdrHZ/exec';

        // 프록시를 통해 RSS 데이터를 가져옵니다.
        const response = await fetch(myApiUrl);
        if (!response.ok) throw new Error("서버 응답 오류");

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const items = xmlDoc.getElementsByTagName("item");
        const liveTrends = [];

        // [확인] 여기서 Math.min(20, items.length)로 설정하여 최대 20개를 뽑습니다.
        for (let i = 0; i < Math.min(20, items.length); i++) {
            let title = items[i].getElementsByTagName("title")[0].textContent;

            // 뉴스 제목에서 불필요한 언론사명 제거 및 정리
            title = title.split(' - ')[0];
            if (title.length > 20) title = title.substring(0, 20) + "...";

            liveTrends.push(title);
        }

        // 만약 가져온 데이터가 10개 미만이라면, 예비 데이터를 섞어서라도 20개를 채웁니다.
        if (liveTrends.length < 20) {
            const extra = ["아이유", "뉴진스", "주식 속보", "코인 시세", "오늘 날씨", "유튜브 쇼츠", "플레이리스트", "침착맨", "무한도전", "리그오브레전드"];
            while (liveTrends.length < 20 && extra.length > 0) {
                liveTrends.push(extra.shift());
            }
        }

        renderTrendBar(liveTrends);

    } catch (error) {
        console.warn("실시간 로드 실패, 예비 데이터 출력");
        const fallback = [
            "아이유", "뉴진스", "주식 경제 속보", "날씨", "비트코인", "애플", "삼성전자", "넷플릭스",
            "축구 하이라이트", "유튜브 알고리즘", "인기 급상승", "쇼츠 레전드", "플레이리스트", "캠핑",
            "맛집", "리그오브레전드", "무료 영화", "다이어트", "운동", "오늘의 뉴스"
        ];
        renderTrendBar(fallback);
    }
}
// 창이 로드될 때 실행 (기존과 동일)
window.addEventListener('DOMContentLoaded', initTrendBar);


// 1. 기존 백업(저장) 버튼 기능 덮어쓰기 (모든 설정 포함)
async function exportData() {
    // 저장할 전체 데이터 구성
    const data = {
        likes: [...myLikes.values()],
        channels: [...myChannels.values()],
        history: searchHistory,
        blocked: [...blockedVideos],
        blockedChannels: [...blockedChannels],
        bannedKeywords: bannedKeywords, // 👈 [추가] 차단 키워드
        settings: {
            opacityLevel: opacityLevel,
            headerOpacityLevel: headerOpacityLevel,
            theme: localStorage.getItem('yt_theme_color'),
            miniPlayerEnabled: isMiniPlayerAllowed, // 👈 [추가] 미니플레이어 ON/OFF
            trendBarEnabled: isTrendBarEnabled
        },
        watchProgress: watchProgress
    };

    // 기본 파일명 제안
    const defaultName = `yt_backup_${new Date().toISOString().slice(0, 10)}.json`;

    // 메인 프로세스에 네이티브 저장 창을 띄워달라고 요청
    const filePath = await window.electronAPI.showSaveDialog(defaultName);

    if (filePath) {
        try {
            // 사용자가 선택한 경로에 파일 생성/저장
            await window.electronAPI.saveBackupFile(filePath, JSON.stringify(data, null, 2));

            // 🌟 핵심: 이 절대 경로를 로컬 스토리지에 영구 기억시킴
            localStorage.setItem('yt_backup_path', filePath);

            showToast("💾 백업 파일 생성 및 자동 동기화 경로 설정 완료");
        } catch (err) {
            console.error("백업 저장 실패:", err);
            showToast("❌ 저장 중 오류가 발생했습니다.");
        }
    }
}

// 2. 조용히 덮어쓰기 하는 자동 저장 함수 (동일하게 모든 설정 포함)
function triggerSilentBackup() {
    // 기억해둔 파일 경로를 불러옴
    const savedPath = localStorage.getItem('yt_backup_path');

    // 만약 사용자가 한 번도 백업 저장을 안 했다면 덮어쓰기도 하지 않고 종료
    if (!savedPath) return;

    try {
        const backupData = {
            likes: [...myLikes.values()],
            channels: [...myChannels.values()],
            history: searchHistory,
            blocked: [...blockedVideos],
            blockedChannels: [...blockedChannels],
            bannedKeywords: bannedKeywords, // 👈 [추가] 차단 키워드
            settings: {
                opacityLevel: opacityLevel,
                headerOpacityLevel: headerOpacityLevel,
                theme: localStorage.getItem('yt_theme_color'),
                miniPlayerEnabled: isMiniPlayerAllowed, // 👈 [추가] 미니플레이어 설정
                trendBarEnabled: isTrendBarEnabled
            },
            watchProgress: watchProgress
        };

        // 지정된 그 파일에 내용만 조용히 덮어쓰기
        window.electronAPI.saveBackupFile(savedPath, JSON.stringify(backupData, null, 2));
        console.log("✅ 지정된 백업 파일에 자동 덮어쓰기 완료:", savedPath);
    } catch (err) {
        console.error("❌ 자동 덮어쓰기 실패:", err);
    }
}

// 3. 좋아요 클릭 시 자동 저장 실행
const originalToggleLike = toggleLike;
toggleLike = function (e, id, i) {
    originalToggleLike(e, id, i);
    triggerSilentBackup();
};

// 4. 채널 즐겨찾기 등 변동 시 자동 저장 실행
const originalSaveAndBackup = saveAndBackup;
saveAndBackup = function () {
    if (typeof originalSaveAndBackup === 'function') {
        originalSaveAndBackup();
    }
    triggerSilentBackup();
};

// 💡 보너스: '복구(불러오기)'를 할 때도 그 파일 경로를 기억하도록 수정
const originalHandleFileSelect = handleFileSelect;
handleFileSelect = function (event) {
    const file = event.target.files[0];
    if (file && file.path) { // 일렉트론 환경에서는 file.path로 절대 경로를 알 수 있습니다.
        localStorage.setItem('yt_backup_path', file.path);
        console.log("불러온 파일 경로를 동기화 타겟으로 설정:", file.path);
    }
    originalHandleFileSelect(event);
};
