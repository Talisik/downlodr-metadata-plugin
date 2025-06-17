// ... existing code ...
const videoMetadataPlugin = {
  id: 'videometadata',
  name: 'Metadata Exporter',
  version: '2.0.0',
  description: 'Video Metadata Exporter Plugin\n\nThis plugin extracts comprehensive metadata from downloaded videos and exports it to clean, structured JSON or TXT files for easy analysis and documentation.\n\nIt features intelligent platform detection that:\n- Automatically adapts available metadata fields based on the video source (YouTube, Facebook, Instagram, etc.)\n- Allows selective export of specific metadata fields like title, description, views, likes, tags, and more\n- Formats data appropriately for each output type with readable labels and structure\n- Handles missing data gracefully without breaking the export process\n\nPerfect for content creators, researchers, and archivists who need structured video metadata for analysis, cataloging, or backup purposes.',
  icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9987 10.666L14.6654 7.99935L11.9987 5.33268M3.9987 5.33268L1.33203 7.99935L3.9987 10.666M9.66536 2.66602L6.33203 13.3327" stroke="#16161E" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  author: 'Downlodr',
  
  menuItemIds: [],
  taskBarItemIds: [],

  // Metadata extraction methods
  extractors: {
    video: {
      toJSON: (metadata) => {
        if (!metadata) return JSON.stringify({ error: 'No metadata available' });
        
        // Only include fields that are actually present in the filtered metadata
        // Don't set default values for unselected fields
        const formatted = {
          title: metadata.hasOwnProperty('title') ? (metadata.title || '') : undefined,
          description: metadata.hasOwnProperty('description') ? (metadata.description || '') : undefined,
          uploader: metadata.hasOwnProperty('uploader') ? (metadata.uploader || '') : undefined,
          uploaderId: metadata.hasOwnProperty('uploaderId') ? (metadata.uploaderId || '') : undefined,
          uploaderUrl: metadata.hasOwnProperty('uploaderUrl') ? (metadata.uploaderUrl || '') : undefined,
          channelId: metadata.hasOwnProperty('channelId') ? (metadata.channelId || '') : undefined,
          channel: metadata.hasOwnProperty('channel') ? (metadata.channel || '') : undefined,
          channelUrl: metadata.hasOwnProperty('channelUrl') ? (metadata.channelUrl || '') : undefined,
          duration: metadata.hasOwnProperty('duration') ? (metadata.duration || '') : undefined,
          views: metadata.hasOwnProperty('views') ? (metadata.views || 0) : undefined,
          likes: metadata.hasOwnProperty('likes') ? (metadata.likes || 0) : undefined,
          comments: metadata.hasOwnProperty('comments') ? (metadata.comments || 0) : undefined,
          tags: metadata.hasOwnProperty('tags') ? (metadata.tags || []) : undefined,
          categories: metadata.hasOwnProperty('categories') ? (metadata.categories || []) : undefined,
          thumbnails: metadata.hasOwnProperty('thumbnails') ? (metadata.thumbnails || []) : undefined,
          uploadDate: metadata.hasOwnProperty('uploadDate') ? (metadata.uploadDate || '') : undefined,
          format: metadata.hasOwnProperty('format') ? (metadata.format || '') : undefined,
        };
        
        console.log('hello 3!', formatted);
        return JSON.stringify(formatted, null, 2);
      },

      toTXT: (metadata) => {
        if (!metadata) return 'No metadata available';
        
        const lines = [];
        const fieldLabels = {
          title: 'Title',
          description: 'Description',
          uploader: 'Uploader',
          uploaderId: 'Uploader ID',
          uploaderUrl: 'Uploader URL',
          channel: 'Channel',
          channelId: 'Channel ID',
          channelUrl: 'Channel URL',
          duration: 'Duration',
          views: 'Views',
          likes: 'Likes',
          comments: 'Comments',
          tags: 'Tags',
          categories: 'Categories',
          thumbnails: 'Thumbnails',
          uploadDate: 'Upload Date',
          format: 'Format'
        };

        // Add header
        lines.push('Video Metadata');
        lines.push('===============');
        lines.push('');

        // Add metadata fields
        Object.keys(metadata).forEach(key => {
          if (metadata.hasOwnProperty(key) && metadata[key] !== undefined) {
            const label = fieldLabels[key] || key;
            let value = metadata[key];

            // Format different data types appropriately
            if (Array.isArray(value)) {
              if (value.length === 0) {
                value = 'None';
              } else if (key === 'thumbnails') {
                value = `${value.length} thumbnail(s) available`;
              } else {
                value = value.join(', ');
              }
            } else if (typeof value === 'object' && value !== null) {
              value = JSON.stringify(value);
            } else if (value === '' || value === null) {
              value = 'Not available';
            }

            lines.push(`${label}: ${value}`);
          }
        });

        lines.push('');
        lines.push(`Generated on: ${new Date().toLocaleString()}`);

        return lines.join('\n');
      }
    },
  },

  // Add this field mapping object after the extractors object
  extractorFieldMapping: {
    'Facebook': ['title', 'description', 'uploader', 'uploaderId', 'uploaderUrl', 'channelId', 'channelUrl', 'duration', 'views', 'likes', 'comments', 'tags', 'categories', 'thumbnails', 'uploadDate', 'format'],
    'Dailymotion': ['title', 'description', 'uploader', 'uploaderId', 'uploaderUrl', 'channelId', 'channelUrl', 'duration', 'views', 'likes', 'tags', 'categories', 'thumbnails', 'uploadDate', 'format'],
    'CNN': ['title', 'description', 'uploader', 'uploaderId', 'uploaderUrl', 'channelId', 'channelUrl', 'duration', 'tags', 'categories', 'thumbnails', 'uploadDate', 'format'],
    'Twitch': ['title', 'description', 'uploader', 'uploaderId', 'uploaderUrl', 'channelId', 'channelUrl', 'duration', 'views', 'tags', 'categories', 'thumbnails', 'uploadDate', 'format'],
    'Instagram': ['title', 'description', 'uploader', 'uploaderId', 'uploaderUrl', 'channelId', 'channelUrl', 'duration', 'likes', 'comments', 'tags', 'categories', 'thumbnails', 'uploadDate', 'format'],
    'Twitter': ['title', 'description', 'uploader', 'uploaderId', 'uploaderUrl', 'channelId', 'channelUrl', 'duration', 'likes', 'comments', 'tags', 'categories', 'thumbnails', 'uploadDate', 'format'],
    'YouTube': ['title', 'description', 'uploader', 'uploaderId', 'uploaderUrl', 'channelId', 'channelUrl', 'duration', 'views', 'likes', 'comments', 'tags', 'categories', 'thumbnails', 'uploadDate', 'format'],
    'default': ['title', 'description', 'uploader', 'uploaderId', 'uploaderUrl', 'channelId', 'channelUrl', 'duration', 'tags', 'categories', 'thumbnails', 'uploadDate', 'format']
  },

  /**
   * Initialize the plugin
   * @param {PluginAPI} api - The plugin API provided by Downlodr
   */
  async initialize(api) {
    this.api = api;
    
    // Register a menu item for Metadata extraction
    const menuItemId = await api.ui.registerMenuItem({
      id: 'videometadata',
      label: 'Metadata Exporter',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9987 10.666L14.6654 7.99935L11.9987 5.33268M3.9987 5.33268L1.33203 7.99935L3.9987 10.666M9.66536 2.66602L6.33203 13.3327" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      context: 'download',
      onClick: (contextData) => this.showMetadataPanel(contextData)
    });
    
    this.menuItemIds = [menuItemId];
    
    console.log('Metadata Exporter plugin initialized');
  },

  /**
   * Format video duration from seconds to readable format
   * @param {number} seconds - Duration in seconds
   * @returns {string} - Formatted duration (MM:SS or HH:MM:SS)
   */
  formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return '';
    
    const totalSeconds = Math.floor(seconds);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    
    if (hours > 0) {
      return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  },

  /**
   * Get metadata with field mapping and fallbacks
   * @param {string} videoUrl - The video URL
   * @returns {Object} - Mapped metadata object
  */
  async getVideoMetadata(videoUrl) {
    try {
      console.log('Fetching metadata for:', videoUrl);
      
      const videoInfo = await this.api.downloads.getInfo(videoUrl);
      const rawMetadata = videoInfo.data;
      
      if (!rawMetadata) {
        throw new Error('No metadata received from video info');
      }
      
      // Apply field mapping with fallbacks
      const mappedMetadata = {
        title: rawMetadata.title || '',
        description: rawMetadata.description || '',
        uploader: rawMetadata.uploader || rawMetadata.channel || rawMetadata.webpage_url_domain || '',
        uploaderId: rawMetadata.uploader_id || rawMetadata.channel_id || '',
        uploaderUrl: rawMetadata.uploader_url || rawMetadata.channel_url || rawMetadata.webpage_url || '',
        channel: rawMetadata.channel || rawMetadata.uploader || '',
        channelId: rawMetadata.channel_id || rawMetadata.uploader_id || '',
        channelUrl: rawMetadata.channel_url || rawMetadata.uploader_url || rawMetadata.webpage_url || '',
        duration: this.formatDuration(rawMetadata.duration) || '',
        views: rawMetadata.view_count || this.extractViewsFromText(rawMetadata.uploader) || 0,
        likes: rawMetadata.like_count || rawMetadata.repost_count || this.extractLikesFromText(rawMetadata.uploader) || 0,
        comments: rawMetadata.comment_count || 0,
        tags: rawMetadata.tags || [],
        categories: rawMetadata.categories || rawMetadata.tags || [],
        thumbnails: rawMetadata.thumbnails || (rawMetadata.thumbnail ? [rawMetadata.thumbnail] : []),
        uploadDate: rawMetadata.upload_date || 
                    (rawMetadata.timestamp ? new Date(rawMetadata.timestamp * 1000).toISOString().split('T')[0] : '') ||
                    rawMetadata.modified_date || '',
        format: rawMetadata.format || rawMetadata.ext || '',
        
        // Additional technical fields
        id: rawMetadata.id || '',
        webpage_url: rawMetadata.webpage_url || rawMetadata.original_url || '',
        extractor: rawMetadata.extractor || '',
        filesize: rawMetadata.filesize || '',
        fps: rawMetadata.fps || '',
        width: rawMetadata.width || '',
        height: rawMetadata.height || '',
        
        // Store raw metadata for complete export if needed
        _raw: rawMetadata
      };
      
      console.log('Mapped metadata:', mappedMetadata);
      return mappedMetadata;
      
    } catch (error) {
      console.error('Error fetching metadata:', error);
      throw new Error(`Failed to fetch metadata: ${error.message}`);
    }
  },

  /**
   * Extract view count from text (for Facebook-style metadata)
   * @param {string} text - Text that might contain view information
   * @returns {number} - Extracted view count or 0
   */
  extractViewsFromText(text) {
    if (!text) return 0;
    
    const viewMatch = text.match(/(\d+(?:\.\d+)?)\s*([KMB]?)\s*views?/i);
    if (viewMatch) {
      const number = parseFloat(viewMatch[1]);
      const multiplier = viewMatch[2].toUpperCase();
      
      switch (multiplier) {
        case 'K': return Math.round(number * 1000);
        case 'M': return Math.round(number * 1000000);
        case 'B': return Math.round(number * 1000000000);
        default: return Math.round(number);
      }
    }
    
    return 0;
  },

  /**
   * Extract like/reaction count from text (for Facebook-style metadata)
   * @param {string} text - Text that might contain like information
   * @returns {number} - Extracted like count or 0
   */
  extractLikesFromText(text) {
    if (!text) return 0;
    
    const likeMatch = text.match(/(\d+(?:\.\d+)?)\s*([KMB]?)\s*(?:reactions?|likes?)/i);
    if (likeMatch) {
      const number = parseFloat(likeMatch[1]);
      const multiplier = likeMatch[2].toUpperCase();
      
      switch (multiplier) {
        case 'K': return Math.round(number * 1000);
        case 'M': return Math.round(number * 1000000);
        case 'B': return Math.round(number * 1000000000);
        default: return Math.round(number);
      }
    }
    
    return 0;
  },

  /**
   * Get available metadata fields for a specific extractor
   * @param {string} extractorKey - The extractor key (e.g., 'YouTube', 'Facebook')
   * @returns {Array} - Array of available field names
   */
  getAvailableFields(extractorKey) {
    // Clean up extractor key - remove any extra parts and normalize
    let cleanExtractorKey = extractorKey;
    if (extractorKey && extractorKey.includes(':')) {
      cleanExtractorKey = extractorKey.split(':')[0];
    }
    
    // Normalize common variations
    const normalizedKey = cleanExtractorKey?.toLowerCase();
    if (normalizedKey?.includes('youtube')) {
      cleanExtractorKey = 'YouTube';
    } else if (normalizedKey?.includes('facebook')) {
      cleanExtractorKey = 'Facebook';
    } else if (normalizedKey?.includes('instagram')) {
      cleanExtractorKey = 'Instagram';
    } else if (normalizedKey?.includes('twitter')) {
      cleanExtractorKey = 'Twitter';
    } else if (normalizedKey?.includes('twitch')) {
      cleanExtractorKey = 'Twitch';
    } else if (normalizedKey?.includes('dailymotion')) {
      cleanExtractorKey = 'Dailymotion';
    } else if (normalizedKey?.includes('cnn')) {
      cleanExtractorKey = 'CNN';
    }
    
    const availableFields = this.extractorFieldMapping[cleanExtractorKey] || this.extractorFieldMapping['default'];
    console.log(`Available fields for ${cleanExtractorKey}:`, availableFields);
    
    return availableFields;
  },

  /**
   * Show Metadata panel when menu item is clicked
   * @param {Object|Array} contextData - Data about the download(s)
   */
  async showMetadataPanel(contextData) {
    try {
      const formatFileSize = (bytes) => {
        if (!bytes) return '—';
        const KB = 1024;
        const MB = KB * 1024;
        const GB = MB * 1024;
      
        if (bytes >= GB) {
          return `${(bytes / GB).toFixed(2)} GB`;
        } else if (bytes >= MB) {
          return `${(bytes / MB).toFixed(2)} MB`;
        } else if (bytes >= KB) {
          return `${(bytes / KB).toFixed(2)} KB`;
        } else {
          return `${bytes} bytes`;
        }
      };

      // Format video duration
      const formatDuration = (seconds) => {
        if (!seconds) return '—';
        
        const totalSeconds = Math.floor(seconds);
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;
        
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        
        if (hours > 0) {
          return `${hours}:${formattedMinutes}:${formattedSeconds}`;
        } else {
          return `${formattedMinutes}:${formattedSeconds}`;
        }
      };

      console.log('Initial contextData received:', contextData);
      
      // Handle both single item and array formats
      let downloadItems = [];
      
      if (Array.isArray(contextData)) {
        downloadItems = contextData.map(item => {
          if (item.id) {
            return {
              videoUrl: item.id.videoUrl,
              location: item.id.location,
              name: this.sanitizeHtml(this.extractNameFromLocation(item.id.location)),
              ext: item.id.ext,
              format: item.id.ext || "MP4 (H.264)",
              duration: item.id.duration || "Unknown",
              size: item.id.size || "Unknown",
              metadata: item.id.metadata || {},
              extractorKey: item.id.extractorKey|| "Unknown",
            };
          }
          return null;
        }).filter(item => item !== null);
      } else {
        if (contextData && contextData.videoUrl) {
          downloadItems = [{
            videoUrl: contextData.videoUrl,
            location: contextData.location,
            name: this.sanitizeHtml(contextData.name || this.extractNameFromLocation(contextData.location)),
            ext: contextData.ext,
            format: contextData.ext || "MP4 (H.264)",
            duration: formatDuration(contextData.duration) || "Unknown",
            size: formatFileSize(contextData.size) || "Unknown",
            metadata: contextData.metadata || {},
            extractorKey: contextData.extractorKey || "Unknown",
          }];
        }
      }
      
      if (downloadItems.length === 0) {
        console.error('No valid download items found in context data', contextData);
        this.api.ui.showNotification({
          title: 'Error',
          message: 'No valid downloads selected',
          type: 'error',
          duration: 3000
        });
        return;
      }

      // Use the first item
      const download = downloadItems[0];
      console.log('Processed download item:', download);
      
      // Get available fields for this extractor
      const availableFields = this.getAvailableFields(download.extractorKey);
      console.log('Extractor key:', download.extractorKey, 'Available fields:', availableFields);
      
      // Generate metadata field checkboxes dynamically
      const generateMetadataFields = (fields) => {
        const fieldLabels = {
          title: 'Title',
          description: 'Description', 
          uploader: 'Uploader',
          uploaderId: 'Uploader ID',
          uploaderUrl: 'Uploader URL',
          channel: 'Channel',
          channelId: 'Channel ID',
          channelUrl: 'Channel URL',
          duration: 'Duration',
          views: 'Views',
          likes: 'Likes',
          comments: 'Comments',
          tags: 'Tags',
          categories: 'Categories',
          thumbnails: 'Thumbnails',
          uploadDate: 'Upload Date',
          format: 'Format'
        };
        
        return fields.map(field => `
          <div class="metadata-field">
            <input type="checkbox" id="field-${field}" name="metadata-fields" value="${field}">
            <label for="field-${field}">${fieldLabels[field] || field}</label>
          </div>
        `).join('');
      };
      
      // Try to fetch fresh metadata if we have a video URL
      let enhancedMetadata = {};
      let hasMetadata = true;
      
      // Update download object with enhanced metadata
      download.metadata = enhancedMetadata;
      
      console.log('Metadata check result:', hasMetadata ? 'Found' : 'Not found');
      
      // Create a unique ID for panel instance
      const panelId = `metadata_panel_${Date.now()}`;

      // Default format
      const currentFormat = 'json';
      
      
      const defaultPath = `${download.location || this.api.system.getDefaultDownloadPath() || "C:\\Downloads\\"}${download.name.replace(/\.[^/.]+$/, "")}.${currentFormat}`;
      
      // Check if we have metadata right away
      const hasMetadataRightAway = true;
      
      console.log('Metadata check result:', hasMetadataRightAway ? 'Found' : 'Not found');
      
      // Set up message handler for panel
      const messageHandler = async (event) => {
        // Check that message is valid
        if (!event.data || typeof event.data !== 'object' || event.data.panelId !== panelId) return;
        
        console.log('Received message from panel:', event.data);
        
        switch (event.data.action) {
          case 'browse':
                // Default output path
      const downloadWithoutExt = {
        ...download,
        defaultPath: download.location ? download.location.replace(/\.[^/.]+$/, '') : '',
        name: download.name ? download.location.replace(/\.[^/.]+$/, '') : ''
      };
            try {
              console.log('hau', downloadWithoutExt);
              const result = await this.showSaveFileDialog(downloadWithoutExt, event.data.format || currentFormat);
              
              if (result) {
                console.log('Selected save path:', result.filePath);
                
                // Make sure we have a string
                const filePathString = typeof result.filePath === 'object' ? 
                  (result.filePath.toString() || '') : 
                  (result.filePath || '');
                
                console.log('Sending update message with path:', filePathString);
                
                // Try multiple ways to reach the panel because iframes are tricky
                // 1. Current window
                window.postMessage({
                  panelId: panelId,
                  action: 'update-save-path',
                  path: filePathString
                }, '*');
                
                // 2. Try any iframes
                document.querySelectorAll('iframe').forEach(iframe => {
                  try {
                    iframe.contentWindow.postMessage({
                      panelId: panelId,
                      action: 'update-save-path',
                      path: filePathString
                    }, '*');
                  } catch (err) {
                    console.log('Could not send to iframe:', err);
                  }
                });
                
                // 3. Try parent window
                if (window.parent !== window) {
                  window.parent.postMessage({
                    panelId: panelId,
                    action: 'update-save-path',
                    path: filePathString
                  }, '*');
                }
                
                const directoryPath = filePathString.substring(0, filePathString.lastIndexOf('\\'));
                this.api.ui.showNotification({
                  title: 'Location Selected',
                  message: `Save location: ${directoryPath}`,
                  type: 'default',
                  duration: 3000
                });
              }
            } catch (error) {
              console.error('Error showing file dialog:', error);
            }
            break;
            
          case 'cancel':
            // User cancelled - clean up
            window.removeEventListener('message', messageHandler);
            await this.api.ui.closePluginPanel(panelId);
            break;
            
          case 'convert':
            // Do the actual extraction
            try {
              // Disable convert button during processing
              window.postMessage({
                panelId: panelId,
                action: 'disable-convert-button'
              }, '*');
              
              document.querySelectorAll('iframe').forEach(iframe => {
                try {
                  iframe.contentWindow.postMessage({
                    panelId: panelId,
                    action: 'disable-convert-button'
                  }, '*');
                } catch (err) {
                  console.log('Could not send to iframe:', err);
                }
              });

              const format = event.data.format || 'json';
              const savePath = event.data.savePath || defaultPath;
              const pathWithoutExtension = savePath.replace(/\.[^/.]+$/, '');
              const directoryPath = pathWithoutExtension.substring(0, pathWithoutExtension.lastIndexOf('\\'));

              // Clean up duplicated filename in the path
              let cleanedSavePath = savePath;
              const lastSlashIndex = savePath.lastIndexOf('\\');
              if (lastSlashIndex !== -1) {
                const directory = savePath.substring(0, lastSlashIndex);
                const filename = savePath.substring(lastSlashIndex + 1);
                
                // Check if filename contains duplicated parts (ending with any extension then .json or .txt)
                const duplicatedPattern = new RegExp(`(.+)\\.[^.]+\\1\\.(${format})$`);
                const match = filename.match(duplicatedPattern);
                
                if (match) {
                  // Remove the duplicated part, keep just the base name with the correct extension
                  const baseName = match[1];
                  cleanedSavePath = `${directory}\\${baseName}.${format}`;
                }
              }

              const selectedFields = event.data.selectedFields || [];
              console.log('original path: ', savePath);
              console.log('cleaned path: ', cleanedSavePath);
              await this.handleExtractAction(download, format, cleanedSavePath, selectedFields, panelId);
              
              // Re-enable convert button after completion
              window.postMessage({
                panelId: panelId,
                action: 'enable-convert-button'
              }, '*');
              
              document.querySelectorAll('iframe').forEach(iframe => {
                try {
                  iframe.contentWindow.postMessage({
                    panelId: panelId,
                    action: 'enable-convert-button'
                  }, '*');
                } catch (err) {
                  console.log('Could not send to iframe:', err);
                }
              });
              
              // Don't close panel anymore - let user continue using it
              // window.removeEventListener('message', messageHandler);
              // await this.api.ui.closePluginPanel(panelId);
            } catch (error) {
              console.error('Error extracting metadata:', error);
              
              // Re-enable convert button on error
              window.postMessage({
                panelId: panelId,
                action: 'enable-convert-button'
              }, '*');
              
              document.querySelectorAll('iframe').forEach(iframe => {
                try {
                  iframe.contentWindow.postMessage({
                    panelId: panelId,
                    action: 'enable-convert-button'
                  }, '*');
                } catch (err) {
                  console.log('Could not send to iframe:', err);
                }
              });
              
              this.api.ui.showNotification({
                title: 'Extraction Error',
                message: error.message || 'Failed to extract metadata',
                type: 'error',
                duration: 3000
              });
            }
            break;

          case 'show-no-metadata-notification':
            this.api.ui.showNotification({
              title: 'No Metadata Available',
              message: 'No metadata found for this video.',
              type: 'error',
              duration: 3000
            });

            case 'open-folder':
              // Handle opening the folder
              try {
                const fullPath = event.data.savePath;
                const lastSeparatorIndex = Math.max(fullPath.lastIndexOf('\\'), fullPath.lastIndexOf('/'));
                const directory = lastSeparatorIndex !== -1 ? fullPath.substring(0, lastSeparatorIndex + 1) : '';
                
                await window.downlodrFunctions.openFolder(directory, fullPath);
                console.log('Opening folder:', fullPath);
              } catch (folderError) {
                console.error('Error opening folder:', folderError);
                this.api.ui.showNotification({
                  title: 'Error',
                  message: 'Could not open folder',
                  type: 'error',
                  duration: 3000
                });
              }
            break;
        }
      };
      
      // Add the message listener
      window.addEventListener('message', messageHandler);
      
      // Show the side panel with metadata options
      const panelResult = await this.api.ui.showPluginSidePanel({
        title: "Metadata Exporter",
        icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9987 10.666L14.6654 7.99935L11.9987 5.33268M3.9987 5.33268L1.33203 7.99935L3.9987 10.666M9.66536 2.66602L6.33203 13.3327" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        content: `
          <style>
            .metadata-panel {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: var(--text-primary);
              display: flex;
              flex-direction: column;
              height: 100%;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              overflow: hidden;
            }

            .metadata-panel h3 {
              font-size: 13px;
              font-weight: 600;
              margin-top: 10px;
              margin-bottom: 8px;
              color: var(--text-primary);
            }
            
            .metadata-content {
              flex: 1;
              overflow-y: auto;
              padding: 15px;
              padding-bottom: 20px;
            }
            
            .panel-footer {
              background: var(--bg-secondary);
              padding: 8px 20px;
              border-top: 1px solid var(--border-primary);
              flex-shrink: 0;
            }

            /* Success Popup Styles */
            .success-popup {
              position: relative;
              background: var(--success-primary);
              color: var(--text-on-success);
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 4px 12px var(--shadow-success);
              z-index: 1000;
              display: none;
              animation: slideInFromTop 0.4s ease-out;
              margin-bottom: 5px;
            }
            
            .success-popup.show {
              display: block;
            }
            
            @keyframes slideInFromTop {
              from {
                transform: translateY(-20px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            
            .success-popup-header {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
            }
            
            .success-popup-icon {
              margin-right: 10px;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--text-on-success);
            }
            
            .success-popup-title {
              flex: 1;
              font-size: 14px;
              font-weight: 600;
              line-height: 1.2;
              display: flex;
              align-items: center;
              color: var(--text-on-success);
            }
            
            .success-popup-close {
              margin-left: auto;
              background: none;
              border: none;
              color: var(--text-on-success);
              cursor: pointer;
              font-size: 18px;
              padding: 0;
              width: 20px;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              opacity: 0.8;
            }
            
            .success-popup-close:hover {
              opacity: 1;
              background: var(--bg-success-hover);
            }
            
            .success-popup-message {
              font-size: 13px;
              line-height: 1.4;
              margin-bottom: 8px;
              color: var(--text-on-success);
              opacity: 0.9;
            }
            
            .success-popup-path {
              font-size: 12px;
              background: none;
              padding: 0;
              border-radius: 0;
              font-family: inherit;
              cursor: pointer;
              text-decoration: underline;
              position: absolute;
              margin-top: 10px;
              bottom: 15px;
              right: 15px;
              color: var(--text-on-success);
              opacity: 0.9;
              transition: opacity 0.2s;
            }
            
            .success-popup-path:hover {
              background: none;
              opacity: 1;
            }

            .file-info {
              margin-bottom: 20px;
              background-color: var(--bg-secondary);
              border: 1px solid var(--border-primary);
              padding: 12px;
              border-radius: 8px;
            }
            .file-info-row {
              display: flex;
              margin-bottom: 5px;
              justify-content: space-between;
            }
            .file-info-label {
              font-size: 13px;
              color: var(--text-secondary);
            }
            .file-info-value {
              font-size: 13px;
              color: var(--text-primary);
              font-weight: 500;
            }

            .metadata-fields {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              padding: 8px;
            }
            .metadata-field {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .metadata-field input[type="checkbox"] {
              width: 15px;
              height: 15px;
              accent-color: var(--accent-primary);
              border-radius: 4px;
              padding: 1px;
            }
            .metadata-field label {
              font-size: 12px;
              font-weight: 500;
              cursor: pointer;
              color: var(--text-primary);
            }
            .format-options {
              margin-top: 10px;
            }
            .format-label {
              font-size: 13px;
              margin-bottom: 5px;
              color: var(--text-primary);
            }
            .format-select {
              width: 100%;
              padding: 8px;
              border-radius: 4px;
              border: 1px solid var(--border-primary);
              font-size: 13px;
              appearance: none;
              background: var(--bg-primary) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E") no-repeat;
              background-position: calc(100% - 17px) center;
              background-size: 12px 12px;
              padding-right: 40px;
              color: var(--text-primary);
            }
            .file-path {
              display: flex;
              align-items: center;
              border: 1px solid var(--border-primary);
              border-radius: 4px;
              margin-top: 5px;
              padding: 5px 10px;
              font-size: 13px;
              overflow: hidden;
              position: relative;
              background: var(--bg-primary);
            }
            .path-text {
              flex: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: var(--text-primary);
              font-weight: 400;
            }
            .path-text:hover::after {
              content: attr(title);
              position: absolute;
              left: 0;
              top: 100%;
              background: var(--bg-tooltip);
              color: var(--text-tooltip);
              padding: 5px 10px;
              border-radius: 4px;
              z-index: 1000;
              width: max-content;
              max-width: 300px;
              font-size: 11px;
              white-space: normal;
              box-shadow: 0 2px 8px var(--shadow-primary);
            }
            .folder-icon {
              color: var(--text-tertiary);
            }
            .progress-container {
              margin: 10px 0px;
            }
            .progress-bar {
              height: 6px;
              background: var(--bg-progress-track);
              border-radius: 5px;
              overflow: hidden;
            }
            .progress-fill {
              height: 100%;
              width: 0%; /* Starts at 0% */
              background: var(--accent-primary);
              transition: width 0.3s ease;
            }
            .progress-fill.finished {
              background: var(--success-primary); /* Green when finished */
            }
            .progress-percentage {
              font-size: 12px;
              color: var(--text-tertiary);
              text-align: start;
              margin-top: 2px;
            }
            .meta-success {
              background-color: var(--bg-success-subtle);
              border-radius: 6px;
              padding: 10px;
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              color: var(--success-primary);
            }
            .meta-success svg {
              margin-right: 8px;
              flex-shrink: 0;
            }
            .meta-success-text {
              font-size: 13px;
              font-weight: 500;
            }
            .helper-text {
              font-size: 12px;
              color: var(--text-secondary);
              text-align: center;
              margin: 5px 0;
            }
         .action-buttons {
              display: flex;
              justify-content: space-between;
              padding: 10px;
              gap: 10px;
            }
              .btn {
              flex: 1;
              padding: 6px 8px;
              border-radius: 4px;
              border: none;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              text-align: center;
              transition: background-color 0.2s ease;
            }
            .btn-cancel {
              background: var(--bg-primary);
              border: 1px solid var(--border-primary); 
              color: var(--text-primary);
              font-weight: 700;
            }
            .btn-cancel:hover {
              background: var(--bg-hover);
            }
            .btn-convert {
              background: var(--accent-primary);
              color: var(--text-on-accent);
            }
            .btn-convert:hover {
              background: var(--accent-hover);
            }
            
            .notification-div {
              margin: 10px 0;
              padding: 10px;
              background-color: var(--error-primary);
              border-radius: 6px;
              color: var(--text-on-error);
              font-size: 12px;
              display: none;
            }
            .notification-div.visible {
              display: block;
            }

            .btn-convert:disabled {
              background: var(--bg-disabled);
              cursor: not-allowed;
              opacity: 0.7;
              color: var(--text-disabled);
            }
            
            .folder-btn {
              background: none;
              border: none;
              cursor: pointer;
              font-size: 12px;
              color: var(--text-secondary);
            }
            
            .folder-btn:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }

            .metadata-div{
              border: 2px solid var(--border-primary);
              border-radius: 4px;
            }
            
            .select-all-row {
              display: flex;
              align-items: center;
              gap: 8px;
              border-bottom: 2px solid var(--border-primary);
              padding: 3px 8px;
              background-color: var(--bg-secondary);
            }
            .select-all-row input[type="checkbox"] {
              width: 15px;
              height: 15px;
              accent-color: var(--accent-primary);
              border-radius: 4px;
            }
            .select-all-row label {
              font-weight: 500;
              font-size: 12px;
              cursor: pointer;
              color: var(--text-primary);
            }

            /* Custom Scrollbar */
            ::-webkit-scrollbar {
              width: 7px; /* Width of the scrollbar */
              height: 12px;
            }
            
            ::-webkit-scrollbar-track {
              background: transparent; /* Track background */
              margin-bottom: 5px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: var(--scrollbar-thumb); /* Scrollbar color */
              border-radius: 4px; /* Rounded corners */
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: var(--scrollbar-thumb-hover); /* Darker on hover */
            }
            
            /* Hide scrollbar buttons */
            ::-webkit-scrollbar-button {
              display: none;
            }

          </style>
          
          <div class="metadata-panel">
            
            <div class="metadata-content">
              <div class="file-info">
                <div class="file-info-row" style="font-weight: bold; padding-top: 5px; padding-bottom: 10px;">
                  ${download.name || 'Video'}
                </div>

                <div class="file-info-row">
                  <div class="file-info-label">Platform</div>
                  <div class="file-info-value">${download.extractorKey || 'Unknown'}</div>
                </div>
                <div class="file-info-row">
                  <div class="file-info-label">Format</div>
                  <div class="file-info-value">${download.format || 'MP4 (H.264)'}</div>
                </div>
                <div class="file-info-row">
                  <div class="file-info-label">Duration</div>
                  <div class="file-info-value">${download.duration || '45:22'}</div>
                </div>
                <div class="file-info-row">
                  <div class="file-info-label">Size</div>
                  <div class="file-info-value">${download.size || '300 MB'}</div>
                </div>
              </div>
              
              <h3>Available Metadata for ${download.extractorKey || 'this platform'}:</h3>
                            <div class="metadata-div">
                <div class="select-all-row">
                <input type="checkbox" id="selectAll" name="metadata-fields" value="selectAll" onchange="toggleSelectAll()">
                <label for="selectAll">Select all</label>
              </div>
              <div class="metadata-fields">
                ${generateMetadataFields(availableFields)}
              </div>
              </div>
              <h3>Export Format</h3>
              <div class="format-options">
                <select class="format-select" id="formatSelect" onchange="updateFileExtension()">
                  <option value="json">JSON</option>
                  <option value="txt">TXT</option>
                </select>
              </div>
              
              <h3>Output File</h3>
              <div class="file-path">
                <div class="path-text" id="savePath" title="${defaultPath}">${defaultPath}</div>
                <button class="folder-btn" id="folderBtn" ${!hasMetadata ? 'disabled' : ''}
                        onclick="window.parent.postMessage({panelId: '${panelId}', action: 'browse', format: document.getElementById('formatSelect').value}, '*')">
                  <div class="folder-icon" style="margin-top:2px; margin-left:8px;">
                    <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm0 272H48V112h140.12l64 64H464v224z"/>
                    </svg>
                  </div>       
                </button>
              </div>
            </div>

            <div class="panel-footer">
            
 <!-- Success Popup moved here -->
              <div class="success-popup" id="successPopup" style="margin-top: 15px">
                <div class="success-popup-header">
                  <div class="success-popup-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="success-popup-title">Conversion Successful</div>
                  <button class="success-popup-close" onclick="hideSuccessPopup()">×</button>
                </div>
                <div class="success-popup-message" id="successMessage">
                  Your transcript has been successfully converted and saved as a well-formatted document.
                </div>
                <div class="success-popup-path" id="successPath" onclick="openContainingFolder()" title="Click to copy path">
                </div>
              </div>

                          <div class="progress-container" id="progressContainer" style="display: none">
                <div class="progress-percentage" id="progressPercentage">0%</div>
                <div class="progress-bar">
                  <div class="progress-fill" id="progressFill"></div>
                </div>
              </div>
              <div class="action-buttons">
                <button class="btn btn-cancel" onclick="window.parent.postMessage({panelId: '${panelId}', action: 'cancel'}, '*')">
                  Cancel
                </button>
                <button class="btn btn-convert" id="convertBtn"
                        onclick="handleConvertClick()">
                  Convert
                </button>
              </div>
            </div>
          </div>
          
          <script>
            // Update file extension when format changes
            function updateFileExtension() {
              const formatSelect = document.getElementById('formatSelect');
              const pathElement = document.getElementById('savePath');
              
              if (formatSelect && pathElement) {
                const selectedFormat = formatSelect.value;
                const currentPath = pathElement.textContent;
                const basePath = currentPath.replace(/\.[^.]+$/, ''); // Remove current extension
                const newPath = basePath + '.' + selectedFormat;
                pathElement.textContent = newPath;
                pathElement.title = newPath;
                
                // Reset progress when format changes
                resetProgress();
                
                // Hide success popup when format changes
                hideSuccessPopup();
              }
            }

            function resetProgress() {
              const progressContainer = document.getElementById('progressContainer');
              const progressFill = document.getElementById('progressFill');
              const progressText = document.getElementById('progressPercentage');
              
              if (progressContainer && progressFill && progressText) {
                progressContainer.style.display = 'none';
                progressFill.style.width = '0%';
                progressFill.style.backgroundColor = '#f4791f';
                progressText.textContent = '0%';
              }
            }

            function showSuccessPopup(savePath, format) {
              const popup = document.getElementById('successPopup');
              const message = document.getElementById('successMessage');
              const pathElement = document.getElementById('successPath');
              
              if (popup && message && pathElement) {
                message.textContent = \`Metadata exported successfully to \${format} format\`;
                pathElement.textContent = \`Open File\`;
                pathElement.textPath = savePath;
                pathElement.title = \`Click to open: \${savePath}\`;
                
                popup.classList.add('show');
                
                // Removed auto-hide timeout - popup stays until manually closed
              }
            }
            
            function hideSuccessPopup() {
              const popup = document.getElementById('successPopup');
              if (popup) {
                popup.classList.remove('show');
              }
            }

            // Function to open the containing folder
            async function openContainingFolder() {
              const pathElement = document.getElementById('successPath');
              if (pathElement) {
                try {
                  const fullPath = pathElement.textPath;
                  
                  // Send message to parent to handle folder opening
                  window.parent.postMessage({
                    panelId: '${panelId}',
                    action: 'open-folder',
                    savePath: fullPath
                  }, '*');
                  
                  // Visual feedback
                  const originalBg = pathElement.style.backgroundColor;
                  pathElement.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  setTimeout(() => {
                    pathElement.style.backgroundColor = originalBg;
                  }, 200);
                } catch (err) {
                  console.error('Failed to open folder:', err);
                }
              }
            }
            
            function copyPathToClipboard() {
              const pathElement = document.getElementById('successPath');
              if (pathElement) {
                navigator.clipboard.writeText(pathElement.textContent).then(() => {
                  // Briefly change the background to indicate copy
                  const originalBg = pathElement.style.background;
                  pathElement.style.background = 'rgba(255, 255, 255, 0.5)';
                  setTimeout(() => {
                    pathElement.style.background = originalBg;
                  }, 200);
                }).catch(err => {
                  console.error('Failed to copy path:', err);
                });
              }
            }

            // Listen for messages from parent to update save path
            window.addEventListener('message', function(event) {
              const data = event.data;
              if (data && data.panelId === '${panelId}') {
                if (data.action === 'update-save-path') {
                  // Update just the save path element
                  const pathElement = document.getElementById('savePath');
                  if (pathElement) {
                    pathElement.textContent = data.path;
                    pathElement.title = data.path;
                  }
                } else if (data.action === 'show-success-popup') {
                  // Show the success popup
                  showSuccessPopup(data.savePath, data.format);
                } else if (data.action === 'disable-convert-button') {
                  // Disable convert button during processing
                  const convertBtn = document.getElementById('convertBtn');
                  const folderBtn = document.getElementById('folderBtn');
                  if (convertBtn) {
                    convertBtn.disabled = true;
                    convertBtn.textContent = 'Converting...';
                  }
                  if (folderBtn) {
                    folderBtn.disabled = true;
                  }
                } else if (data.action === 'enable-convert-button') {
                  // Re-enable convert button after processing
                  const convertBtn = document.getElementById('convertBtn');
                  const folderBtn = document.getElementById('folderBtn');
                  if (convertBtn) {
                    convertBtn.disabled = false;
                    convertBtn.textContent = 'Convert';
                  }
                  if (folderBtn) {
                    folderBtn.disabled = false;
                  }
                }
              }
            });

            function toggleSelectAll() {
              const selectAllCheckbox = document.getElementById('selectAll');
              const metadataCheckboxes = document.querySelectorAll('input[name="metadata-fields"]:not(#selectAll)');
              
              metadataCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
              });
            }

            function handleConvertClick() {
              const convertBtn = document.getElementById('convertBtn');
              if (convertBtn && convertBtn.disabled) {
                window.parent.postMessage({
                  panelId: '${panelId}',
                  action: 'show-no-metadata-notification'
                }, '*');
                return;
              }
              
              // Get selected fields
              const selectedFields = [];
              document.querySelectorAll('input[name="metadata-fields"]:checked').forEach(checkbox => {
                selectedFields.push(checkbox.value);
              });
              
              window.parent.postMessage({
                panelId: '${panelId}', 
                action: 'convert', 
                format: document.getElementById('formatSelect').value, 
                savePath: document.getElementById('savePath').textContent,
                selectedFields: selectedFields
              }, '*');
            }
            
            function updateProgressUI(percent) {
              const progressContainer = document.getElementById('progressContainer');
              const progressFill = document.getElementById('progressFill');
              const progressText = document.getElementById('progressPercentage');

              // Show container only when progress is > 0
              if (percent > 0) {
                progressContainer.style.display = 'block';
              }
              
              if (progressFill && progressText) {
                progressFill.style.width = percent + '%';
                
                if (percent >= 100) {
                  progressText.textContent = 'Finished';
                  progressFill.style.backgroundColor = '#4CAF50';
                  
                  // Auto-reset progress after 2 seconds
                  setTimeout(() => {
                    resetProgress();
                  }, 2000);
                } else if (percent > 0) {
                  progressText.textContent = percent + '%';
                  progressFill.style.backgroundColor = '#f4791f';
                } else {
                  progressText.textContent = 'Ready';
                }
              }
            }
            
            window.addEventListener('message', function(event) {
              const data = event.data;
              if (data && data.action === 'update-progress') {
                updateProgressUI(data.percent);
              }
            });
            
            // Set default selections
            document.getElementById('selectAll').checked = true;
            document.querySelectorAll('input[name="metadata-fields"]').forEach(checkbox => {
              checkbox.checked = true;
            });
          </script>
        `,
        width: 360,
        closable: true
      });
      
      // Clean up listener when closed
      if (!panelResult) {
        window.removeEventListener('message', messageHandler);
      }
      
    } catch (error) {
      console.error('Error showing metadata panel:', error);
      this.api.ui.showNotification({
        title: 'Error',
        message: 'Failed to show metadata panel',
        type: 'error',
        duration: 3000
      });
    }
  },
  
  /**
   * Extract filename from location path
   * @param {string} location - File path
   * @returns {string} - Extracted filename
   */
  extractNameFromLocation(location) {
    if (!location) return 'download';
    const parts = location.split(/[\/\\]/);
    const filename = parts[parts.length - 1];
    return filename || 'download';
  },

  /**
   * Simple HTML sanitizer
   * @param {string} html - String to sanitize
   * @returns {string} - Sanitized string
   */
  sanitizeHtml(html) {
    if (!html) return '';
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },
  
  /**
   * Update the extraction progress
   * @param {string} panelId - Panel ID
   * @param {number} percent - Progress percentage
   */
  async updateExtractionProgress(panelId, percent) {
    try {
      const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
      
      console.log(`Sending progress update: ${safePercent}% to panel ${panelId}`);

      // Send message to all potential receivers
      document.querySelectorAll('iframe').forEach(iframe => {
        try {
          iframe.contentWindow.postMessage({
            panelId: panelId,
            action: 'update-progress',
            percent: safePercent
          }, '*');
        } catch (err) {
          console.log(`Failed to post to iframe: ${err.message}`);
        }
      });
      
      window.parent.postMessage({
        panelId: panelId,
        action: 'update-progress',
        percent: safePercent
      }, '*');
      
      window.postMessage({
        panelId: panelId,
        action: 'update-progress',
        percent: safePercent
      }, '*');

    } catch (error) {
      console.error('Error updating progress:', error);
    }
  },
  
  /**
   * Handle the extraction action from the panel
   * @param {Object} download - The download item
   * @param {string} format - The selected format
   * @param {string} savePath - The path to save the file
   * @param {Array} selectedFields - Array of selected metadata fields
   * @param {string} panelId - ID of the panel triggering the action
   */
  async handleExtractAction(download, format, savePath, selectedFields, panelId) {
    try {
      console.log(`Starting metadata extraction with panelId: ${panelId}`);
      
      await this.updateExtractionProgress(panelId, 10);
      
      // Fetch fresh metadata from the video URL
      let metadata;
      if (download.videoUrl) {
        await this.updateExtractionProgress(panelId, 30);
        console.log('Fetching fresh metadata from video URL...');
        metadata = await this.getVideoMetadata(download.videoUrl);
        await this.updateExtractionProgress(panelId, 35);
      } else {
        console.log('Using existing metadata from download...');
        metadata = download.metadata || {};
        await this.updateExtractionProgress(panelId, 35);
      }
      
      await this.updateExtractionProgress(panelId, 50);
      
      // Filter metadata based on selected fields
      const filteredMetadata = {};
      selectedFields.forEach(field => {
        // Handle "selectAll" checkbox
        if (field === 'selectAll') {
          return;
        }

        // Include the field if it was selected, regardless of whether it has data
        filteredMetadata[field] = metadata[field];
      });
      
      // If no fields selected or no metadata found, include basic info
      if (Object.keys(filteredMetadata).length === 0) {
        filteredMetadata.title = metadata.title || download.name || 'Unknown';
        filteredMetadata.note = 'No additional metadata available for selected fields';
      }
         
      // Convert metadata to the selected format
      let outputContent = '';
      if (format === 'json') {
        console.log('json!');
        await this.updateExtractionProgress(panelId, 70);
        outputContent = this.extractors.video.toJSON(filteredMetadata);
      } else if (format === 'txt') {
        console.log('txt!');
        await this.updateExtractionProgress(panelId, 70);
        outputContent = this.extractors.video.toTXT(filteredMetadata);
      } else {
        await this.updateExtractionProgress(panelId, 70);
        console.log('defaulting to json!');
        outputContent = this.extractors.video.toJSON(filteredMetadata);
      }
      
      await this.updateExtractionProgress(panelId, 85);
      
      // Export the file
      const success = await this.exportFile(outputContent, savePath, format);
      
      if (success) {
        await this.updateExtractionProgress(panelId, 100);
        
        // Send success message to panel to show green popup
        window.postMessage({
          panelId: panelId,
          action: 'show-success-popup',
          savePath: savePath,
          format: format.toUpperCase()
        }, '*');
        
        document.querySelectorAll('iframe').forEach(iframe => {
          try {
            iframe.contentWindow.postMessage({
              panelId: panelId,
              action: 'show-success-popup',
              savePath: savePath,
              format: format.toUpperCase()
            }, '*');
          } catch (err) {
            console.log(`Failed to post to iframe: ${err.message}`);
          }
        });
        
      } else {
        this.api.ui.showNotification({
          title: 'Failed Metadata Exported',
          message: `Metadata failed to export and compile`,
          type: 'destructive',
          duration: 3000
        });
        throw new Error('Failed to export file');
      }
      
    } catch (error) {
      this.api.ui.showNotification({
        title: 'Failed Metadata Exported',
        message: `Metadata failed to export and compile`,
        type: 'destructive',
        duration: 3000
      });
      console.error('Error in handleExtractAction:', error);
      throw error;
    }
  },
  
  /**
   * Show save file dialog
   * @param {Object} download - Download item
   * @param {string} format - Output format
   * @returns {Promise<Object>} - Dialog result
   */
  async showSaveFileDialog(download, format) {
    try {
      const filters = format === 'txt' ? 
        [{ name: 'Text Files', extensions: ['txt'] }] : 
        [{ name: 'JSON Files', extensions: ['json'] }];
      
      const baseName = download.name || 'metadata';
      const defaultFilename = `${baseName}.${format}`;
      
      const result = await this.api.ui.showSaveFileDialog({
        title: 'Select save location',
        defaultPath: download.location ? `${download.location}/${defaultFilename}` : defaultFilename,
        filters: filters,
        properties: ['showOverwriteConfirmation', 'createDirectory']
      });
      
      if (result && !result.canceled && result.filePath) {
        return { 
          filePath: result.filePath, 
          format: format
        };
      }
      return null;
    } catch (error) {
      console.error('Error showing file dialog:', error);
      return null;
    }
  },
  
  /**
   * Export file with specified format
   * @param {string} content - Text content
   * @param {string} filepath - Full file path
   * @param {string} format - File format
   * @returns {Promise<boolean>} - Success status
   */
  async exportFile(content, filepath, format = 'json') {
    try {
      console.log(`Exporting file: ${filepath} in format: ${format}`);
      
      if (!content) {
        console.error('Error: Empty content, cannot save file');
        this.api.ui.showNotification({
          title: 'Save Error',
          message: 'Cannot save empty content',
          type: 'error',
          duration: 3000
        });
        return false;
      }
      
      // Validate and clean the file path
      if (!filepath || typeof filepath !== 'string') {
        throw new Error('Invalid file path provided');
      }
      
      // Normalize path separators and remove invalid characters (but preserve drive letter colon)
      let cleanPath = filepath.replace(/\\/g, '\\'); // Normalize backslashes
      
      // Only replace colons that are NOT part of drive letters (Windows C:, D:, etc.)
      // This regex preserves drive letter colons but removes other colons
      cleanPath = cleanPath.replace(/(?<!^[A-Za-z]):/g, '_');
      
      // Remove other invalid filename characters
      cleanPath = cleanPath.replace(/[<>"|?*]/g, '_');
      
      // Ensure the directory exists
      const directory = cleanPath.substring(0, cleanPath.lastIndexOf('\\'));
      console.log(`Target directory: ${directory}`);
      console.log(`Target filename: ${cleanPath.split('\\').pop()}`);
      
      try {
        const result = await this.api.utilities.writeFile({
          fileName: cleanPath.split('\\').pop(),
          content: content,
          customPath: cleanPath,
          overwrite: true
        });
        
        if (result && (result.success || !result.error)) {
          console.log(`File saved successfully to: ${cleanPath}`);
          return true;
        } else {
          throw new Error(result?.error || 'Failed to write file');
        }
      } catch (saveError) {
        console.error('Save failed:', saveError);
        
        // Copy to clipboard as fallback
        try {
          await navigator.clipboard.writeText(content);
          
          this.api.ui.showNotification({
            title: 'Save Failed - Content Copied',
            message: 'Could not save file directly, content copied to clipboard instead',
            type: 'warning',
            duration: 5000
          });
          
          return false;
        } catch (clipboardError) {
          console.error('Clipboard fallback failed:', clipboardError);
          throw new Error('All save methods failed');
        }
      }
    } catch (error) {
      console.error('Error in exportFile:', error);
      this.api.ui.showNotification({
        title: 'Export Error',
        message: error.message || 'Failed to save file',
        type: 'error',
        duration: 3000
      });
      return false;
    }
  }
};

module.exports = videoMetadataPlugin;