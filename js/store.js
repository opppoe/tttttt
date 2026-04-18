// store.js - 전역 상태 저장 및 디바운스 로직 담당

const Store = {
    debounceTimer: null,
    
    // 로컬스토리지 백업 및 파일 자동 저장 로직
    debouncedSave: function() {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        
        this.debounceTimer = setTimeout(() => {
            try {
                // 1. 로컬스토리지 최신화
                localStorage.setItem('yt_my_likes', JSON.stringify([...window.myLikes.values()]));
                localStorage.setItem('yt_watch_progress', JSON.stringify(window.watchProgress));
                localStorage.setItem('yt_history', JSON.stringify(window.searchHistory));
                localStorage.setItem('yt_block_v', JSON.stringify([...window.blockedVideos]));
                localStorage.setItem('yt_block_ch', JSON.stringify([...window.blockedChannels]));
                localStorage.setItem('yt_banned_keywords', JSON.stringify(window.bannedKeywords));

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
