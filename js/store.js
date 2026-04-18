// store.js - 전역 상태 저장 및 디바운스 로직 담당

const Store = {
    debounceTimer: null,
    
    // 로컬스토리지 백업 및 파일 자동 저장 로직
    debouncedSave: function() {
        // [핵심 변경] 모바일 환경(iOS 등)에서는 앱을 닫거나 백그라운드로 전환 시 setTimeout이 증발합니다.
        // 따라서 시스템의 기본 저장소인 localStorage에는 지연 없이 즉각적으로(동기적) 저장합니다.
        try {
            localStorage.setItem('yt_my_likes', JSON.stringify([...window.myLikes.values()]));
            // 누락되었던 채널 즐겨찾기도 저장
            localStorage.setItem('yt_my_channels', JSON.stringify([...(window.myChannels || new Map()).values()]));
            localStorage.setItem('yt_watch_progress', JSON.stringify(window.watchProgress));
            localStorage.setItem('yt_history', JSON.stringify(window.searchHistory));
            localStorage.setItem('yt_block_v', JSON.stringify([...window.blockedVideos]));
            localStorage.setItem('yt_block_ch', JSON.stringify([...window.blockedChannels]));
            localStorage.setItem('yt_banned_keywords', JSON.stringify(window.bannedKeywords));
        } catch (err) {
            console.error("❌ 로컬스토리지 즉각 저장 실패:", err);
        }

        // 일렉트론(PC 버전을 위한) 물리적 파일 덮어쓰기만 과부하 방지를 위해 디바운스 처리합니다.
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        
        this.debounceTimer = setTimeout(() => {
            try {
                // 2. 파일 자동 덮어쓰기 (백업 경로가 있는 경우)
                if (window.electronAPI) {
                    const savedPath = localStorage.getItem('yt_backup_path');
                    if (savedPath) {
                        const backupData = {
                            likes: [...window.myLikes.values()],
                            channels: [...window.myChannels.values()],
                            history: window.searchHistory,
                            blocked: [...window.blockedVideos],
                            blockedChannels: [...window.blockedChannels],
                            bannedKeywords: window.bannedKeywords,
                            settings: {
                                opacityLevel: window.opacityLevel,
                                headerOpacityLevel: window.headerOpacityLevel,
                                theme: localStorage.getItem('yt_theme_color'),
                                miniPlayerEnabled: window.isMiniPlayerAllowed,
                                trendBarEnabled: window.isTrendBarEnabled,
                                networkBarEnabled: window.isNetworkBarEnabled
                            },
                            watchProgress: window.watchProgress
                        };
                        window.electronAPI.saveBackupFile(savedPath, JSON.stringify(backupData, null, 2))
                            .then(success => {
                                if(success) console.log("✅ 백업 파일 자동 덮어쓰기 완료:", savedPath);
                            });
                    }
                }
            } catch (err) {
                console.error("❌ 저장 실패:", err);
            }
        }, 1500); // 1.5초 디바운스 적용
    }
};

window.Store = Store;
