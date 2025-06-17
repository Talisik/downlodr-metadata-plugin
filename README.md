# Metadata Exporter Plugin

## Overview

The Metadata Exporter Plugin automatically extracts comprehensive metadata from your downloaded videos and exports it to clean, structured JSON or TXT files for easy analysis and documentation. This essential tool transforms raw video metadata into well-formatted content perfect for cataloging, research, or backup purposes.

With intelligent platform detection that automatically adapts available metadata fields based on the video source (YouTube, Facebook, Instagram, etc.), this plugin delivers structured data that's ideal for content creators, researchers, and archivists who need organized video metadata for analysis or documentation workflows.

## Features

- **Intelligent platform detection** - Automatically identifies video source and adapts available metadata fields
- **Comprehensive metadata extraction**:
  - Title, description, and uploader information
  - Channel details and URLs
  - View counts, likes, and engagement metrics
  - Tags, categories, and thumbnails
  - Upload dates and technical specifications
  - Duration and format information
- **Selective field export** - Choose specific metadata fields to include in your export
- **Multiple output formats** - Export as JSON or clean TXT format
- **Platform-specific optimization** - Different field sets for YouTube, Facebook, Instagram, Twitter, Twitch, and more
- **Clean data formatting** - Handles missing data gracefully without breaking the export process
- **One-click extraction** - Extract metadata directly from the download context menu
- **Custom save locations** - Choose where to save your exported metadata files
- **Real-time preview** - See available metadata fields before extraction
- **Progress tracking** - Visual progress indicator during extraction
- **Success notifications** - Confirmation when extraction is complete with quick folder access

## Installation

1. Ensure you have Downlodr version 1.3.4 or higher installed
2. Download the Metadata Exporter Plugin package
3. Extract the folder to your preferred location
4. Click the "Plugin" button in the top left corner of the Task Bar window
5. Click the "Add Plugin" button to locate the folder you extracted the plugin to and press "Select Folder"
6. The plugin will be loaded automatically on startup

**Note: Make sure that the folder includes the `index.js` file and `manifest.json` file**

## Usage

1. Download a video using Downlodr
2. Once download is complete, right click on the video and select "Metadata Exporter" from the context menu
3. An extraction panel will appear showing:
   - Video details and platform information
   - Available metadata fields for the detected platform
   - Output format selection (JSON or TXT)
   - Save location picker
4. Configure your export:
   - Select which metadata fields to include (or use "Select all")
   - Choose your output format (JSON for structured data, TXT for readable format)
   - Choose your desired save location using the folder button
   - Click "Convert" to start the extraction process
   - Monitor the progress bar during extraction
5. Upon completion, a success popup will appear with:
   - Confirmation message
   - File save path (click to open containing folder)

## Supported Platforms

The plugin automatically detects and optimizes metadata extraction for:

- **YouTube** - Full metadata including views, likes, comments, tags, and channel information
- **Facebook** - Title, description, uploader details, views, likes, and engagement data
- **Instagram** - Content details, uploader information, likes, comments, and hashtags
- **Twitter** - Tweet content, user information, engagement metrics, and media details
- **Twitch** - Stream information, channel details, views, and category data
- **Dailymotion** - Video details, channel information, views, likes, and tags
- **CNN** - News content, publication details, and category information
- **Default platforms** - Basic metadata extraction for other supported video sources

## Output Formats

### JSON Format
- **Structured data** - Clean, parseable JSON with organized metadata fields
- **Developer-friendly** - Perfect for programmatic analysis and integration
- **Complete information** - Preserves data types and nested structures
- **Readable formatting** - Pretty-printed with proper indentation

### TXT Format
- **Human-readable** - Clean, formatted text with labeled sections
- **Documentation-ready** - Perfect for reports, notes, and documentation
- **Organized layout** - Logical grouping of related metadata fields
- **Missing data handling** - Clearly indicates unavailable information

## Technical Details

The plugin performs the following processing:

- **Platform Detection**: Identifies video source and determines available metadata fields
- **Metadata Extraction**: Fetches comprehensive video information using Downlodr's API
- **Data Mapping**: Applies platform-specific field mappings with intelligent fallbacks
- **Content Processing**: 
  - Formats duration from seconds to readable time (HH:MM:SS)
  - Extracts view and engagement counts from various text formats
  - Handles thumbnail arrays and technical specifications
  - Processes upload dates and timestamps
- **Selective Filtering**: Includes only user-selected metadata fields in output
- **Format Conversion**: Generates clean JSON or formatted TXT output
- **File Management**: Handles file I/O operations with error checking and user feedback

## Available Metadata Fields

Depending on the platform, the following fields may be available:

- **Content Information**: Title, Description
- **Creator Details**: Uploader, Uploader ID, Uploader URL, Channel, Channel ID, Channel URL
- **Technical Data**: Duration, Format, File Size, Resolution, FPS
- **Engagement Metrics**: Views, Likes, Comments
- **Organization**: Tags, Categories
- **Media Assets**: Thumbnails
- **Temporal Data**: Upload Date
- **Additional Fields**: Platform-specific metadata and technical details

## Requirements

- Downlodr v1.3.4+
- Internet connection for fresh metadata fetching (when available)
- Write permissions to the selected output directory

## Troubleshooting

### No Metadata Available
If you see limited metadata:
- Some platforms provide more comprehensive metadata than others
- Older downloads may have cached metadata with fewer fields
- Private or restricted videos may have limited public metadata

### Extraction Issues
- Verify you have write permissions to the selected output folder
- Ensure sufficient disk space for the output file
- Check your internet connection for fresh metadata fetching
- Try selecting fewer metadata fields if experiencing performance issues

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Developed by Downlodr

## Version History

- 1.0.0 - Initial release
  - Comprehensive metadata extraction for major platforms
  - Intelligent platform detection and field mapping
  - Selective field export with JSON and TXT formats
  - Context menu integration with progress tracking
  - Custom save location selection and success notifications
  - Smart data formatting and missing data handling

- 2.0.0 - Dark Mode and Light Mode Release
  - Adjusted Show Panel logic and styling to allow dark mode and light mode application

## Privacy Note

This plugin processes video metadata locally on your device. When available, it may fetch fresh metadata from video sources to ensure accuracy. No personal data is transmitted beyond what's necessary for metadata retrieval.

## Contributing

Interested in contributing to this plugin? Please submit issues and feature requests through the appropriate channels or contact the development team.

---

*Perfect for content creators, researchers, and archivists who need structured video metadata for analysis, cataloging, or backup purposes.* 