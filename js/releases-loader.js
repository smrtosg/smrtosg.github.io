// Load release data from the centralized JSON file
async function loadReleaseData(lineKey) {
  try {
    const response = await fetch('../releases/releases-data.json');
    if (!response.ok) throw new Error('Failed to load releases data');
    const data = await response.json();
    return data[lineKey] || null;
  } catch (error) {
    console.error('Error loading release data:', error);
    return null;
  }
}

// Initialize version dropdown with data
async function initializeVersionDropdown(lineKey) {
  const versionDropdown = document.getElementById('versionDropdown');
  const releaseData = await loadReleaseData(lineKey);
  
  if (!releaseData || !versionDropdown) return;
  
  // Clear default options first
  versionDropdown.innerHTML = '<option value="">Select a version...</option>';
  
  // Populate dropdown options
  Object.entries(releaseData.versions).forEach(([key, versionInfo]) => {
    const option = document.createElement('option');
    option.value = key;
    
    // Generate label with version number and status
    let label = `Version ${versionInfo.version}`;
    
    // Check for manual label override first
    if (versionInfo.label) {
      if (versionInfo.label === 'latest-release') label += ' - Latest Release';
      else if (versionInfo.label === 'legacy') label += ' - Legacy';
      else if (versionInfo.label === 'pre-release') label += ' - Pre-release';
    } else {
      // Fallback to auto-detection by date if no manual label
      const allVersions = Object.values(releaseData.versions);
      const isLatest = allVersions.length > 1 && 
                       allVersions.every(v => parseVersionDate(versionInfo.date) >= parseVersionDate(v.date));
      const isLegacy = !isLatest && allVersions.length > 1;
      
      if (isLatest) label += ' - Latest Release';
      else if (isLegacy) label += ' - Legacy';
    }
    
    option.textContent = label;
    versionDropdown.appendChild(option);
  });
  
  // Helper function to parse dates for comparison
  function parseVersionDate(dateStr) {
    // Handle formats: "11/08/25", "18/08/2025", "2022"
    if (dateStr.length === 4) return new Date(dateStr, 0, 1); // Year only
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const year = parts[2].length === 2 ? 2000 + parseInt(parts[2]) : parseInt(parts[2]);
      return new Date(year, parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(0);
  }
  
  // Setup version selection
  versionDropdown.addEventListener('change', function() {
    displayVersion(this.value, releaseData.versions);
  });
  
  // Restore from sessionStorage
  const saved = sessionStorage.getItem('selectedVersion');
  if (saved && releaseData.versions[saved]) {
    versionDropdown.value = saved;
    displayVersion(saved, releaseData.versions);
  }
}

// Display version content
function displayVersion(versionKey, versionData) {
  const versionContent = document.getElementById('versionContent');
  const releaseDate = document.getElementById('releaseDate');
  const changesText = document.getElementById('changesText');
  const downloadContainer = document.getElementById('downloadContainer');
  const versionDropdown = document.getElementById('versionDropdown');
  
  if (!versionContent || !releaseDate || !changesText || !downloadContainer) return;
  
  if (versionKey && versionData[versionKey]) {
    const version = versionData[versionKey];
    releaseDate.textContent = version.date;
    
    // Handle both string and array changes
    if (Array.isArray(version.changes)) {
      changesText.innerHTML = version.changes
        .map(change => `<div>${change}</div>`)
        .join('');
    } else {
      changesText.innerHTML = `<div>${version.changes}</div>`;
    }
    
    // Handle multiple downloads or fallback to single download
    downloadContainer.innerHTML = '';
    
    if (version.downloads && Array.isArray(version.downloads)) {
      // Multiple downloads
      version.downloads.forEach(download => {
        const btn = document.createElement('a');
        btn.href = '#';
        btn.className = 'btn pw-btn btn-2 mt-15';
        btn.innerHTML = `<i class="fa-solid fa-download"></i>&nbsp; ${download.name}`;
        btn.onclick = (e) => {
          e.preventDefault();
          window.location.href = download.url;
        };
        downloadContainer.appendChild(btn);
      });
    } else if (version.downloadUrl) {
      // Single download (backward compatibility)
      const btn = document.createElement('a');
      btn.href = '#';
      btn.className = 'btn pw-btn btn-2 mt-15';
      btn.innerHTML = `<i class="fa-solid fa-download"></i>&nbsp; Download`;
      btn.onclick = (e) => {
        e.preventDefault();
        window.location.href = version.downloadUrl;
      };
      downloadContainer.appendChild(btn);
    }
    
    versionContent.style.display = 'block';
    if (versionDropdown) {
      versionDropdown.classList.add('expanded');
    }
    
    sessionStorage.setItem('selectedVersion', versionKey);
  } else {
    versionContent.style.display = 'none';
    if (versionDropdown) {
      versionDropdown.classList.remove('expanded');
    }
    sessionStorage.removeItem('selectedVersion');
  }
}
