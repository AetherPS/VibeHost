// UI Bridge for PSFree exploit
// This creates the console element and bridges progress updates to the UI

// Create console element for PSFree logging
const consoleDiv = document.createElement('div');
consoleDiv.id = 'console';
consoleDiv.style.display = 'none'; // Hidden, we'll mirror to status
document.body.appendChild(consoleDiv);

// Progress tracking
let currentProgress = 0;
const progressStages = {
    'STAGE: UAF SSV': 10,
    'STAGE: get string relative read primitive': 20,
    'STAGE: achieve arbitrary read/write primitive': 30,
    'STAGE: Setup': 35,
    'STAGE: Double free AIO queue entry': 45,
    'STAGE: Leak kernel addresses': 55,
    'STAGE: Double free SceKernelAioRWRequest': 65,
    'STAGE: Get arbitrary kernel read/write': 75,
    'STAGE: Patch kernel': 85,
    'kernel exploit succeeded!': 95,
    'BinLoader is ready': 100,
    'Fusion payload loaded!': 100
};

// Store original append method
const originalAppend = consoleDiv.append.bind(consoleDiv);

// Override console append to mirror to status display
consoleDiv.append = function(text) {
    originalAppend(text);

    // Update status display
    const statusEl = document.getElementById('status');
    const progressEl = document.getElementById('progressBar');
    const logOutputEl = document.getElementById('logOutput');

    if (text.trim()) {
        const cleanText = text.replace(/\n/g, '');

        // Append to log output
        if (logOutputEl && cleanText) {
            if (logOutputEl.textContent === 'Logs will appear here...') {
                logOutputEl.textContent = '';
            }
            logOutputEl.textContent += cleanText + '\n';
            // Auto-scroll to bottom
            logOutputEl.scrollTop = logOutputEl.scrollHeight;
        }

        // Update main status for important messages
        if (statusEl && cleanText) {
            statusEl.textContent = cleanText;

            // Check if this is a stage message and update progress
            for (const [stage, progress] of Object.entries(progressStages)) {
                if (cleanText.includes(stage)) {
                    currentProgress = progress;
                    if (progressEl) {
                        progressEl.style.width = progress + '%';
                    }
                    break;
                }
            }

            // Special handling for exploit status (Fusion page)
            const exploitStatusEl = document.getElementById('exploitStatus');
            if (exploitStatusEl) {
                if (cleanText.includes('succeeded') || cleanText.includes('ready') || cleanText.includes('loaded')) {
                    exploitStatusEl.textContent = 'Success';
                } else if (cleanText.includes('failed') || cleanText.includes('error') || cleanText.includes('Error')) {
                    exploitStatusEl.textContent = 'Failed';
                } else if (cleanText.includes('STAGE:')) {
                    exploitStatusEl.textContent = 'Running';
                }
            }
        }
    }
};

// Export for use if needed
window.updateExploitProgress = function(percent) {
    const progressEl = document.getElementById('progressBar');
    if (progressEl) {
        progressEl.style.width = percent + '%';
    }
};

window.updateExploitStatus = function(message) {
    const statusEl = document.getElementById('status');
    if (statusEl) {
        statusEl.textContent = message;
    }
};
