# Supported Operating Systems and Browser Compatibility

## Supported Operating Systems (Server)

### Server Execution Environment
The UniLost server is based on Node.js and can run on the following operating systems:

- ✅ **Windows** 10 or later
- ✅ **macOS** 10.15 (Catalina) or later
- ✅ **Linux** (Ubuntu 18.04+, Debian 10+, CentOS 7+, etc.)
  
### Requirements
- Node.js 18.0.0 or later (Recommended: Node.js 20 LTS)
- npm 9.0.0 or later
- PostgreSQL (for deployment) or SQLite (for local development)

## Supported Browsers (Client)

### Desktop Browsers

| Browser | Minimum Version | Recommended Version | Status |
|---------|----------|----------|------|
| **Chrome** | 90+ | Latest Version | ✅ Fully Supported |
| **Firefox** | 88+ | Latest Version | ✅ Fully Supported |
| **Safari** | 14+ | Latest Version | ✅ Fully Supported |
| **Edge** | 90+ | Latest Version | ✅ Fully Supported |
| **Opera** | 76+ | Latest Version | ✅ Fully Supported |

### Mobile Browser

| Platform | Browser | Minimum Version | Status |
|--------|---------|----------|------|
| **iOS** | Safari | iOS 14+ | ✅ Fully Supported |
| **iOS** | Chrome | Latest Version | ✅ Fully Supported |
| **Android** | Chrome | 90+ | ✅ Fully Supported |
| **Android** | Samsung Internet | 14+ | ✅ Fully Supported |
| **Android** | Firefox | 88+ | ✅ Fully Supported |

## Compatibility by Technology Stack

### Frontend Technologies
- **HTML5**: Supports all modern browsers
- **ES6+ JavaScript**: Chrome 51+, Firefox 54+, Safari 10+, Edge 15+
- **Tailwind CSS**: Supports all modern browsers
- **Fetch API**: Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+

### Map Library
- **Leaflet.js 1.9.4**:
- Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- Mobile: iOS Safari 11+, Android Chrome 60+

### Real-time Communication
- **Socket.IO 4.8.1**:
- Requires a WebSocket-supporting browser
- Chrome 16+, Firefox 11+, Safari 7+, Edge 12+
- Fallback: Long Polling (older browsers)

## Feature Compatibility

### Fully Supported Features
- ✅ Map Display and Interaction (Leaflet)
- ✅ Real-Time Chat (Socket.IO)
- ✅ User Authentication and Session Management
- ✅ Responsive Design (Mobile/Desktop)
- ✅ File Upload (Image)
- ✅ Geocoding (Address Search)

### Limitations
- ⚠️ **Older Browsers (IE 11 and Below)**: Not Supported
- ⚠️ **Offline Mode**: Not Supported (Server Connection Required)
- ⚠️ **PWA Features**: Currently Not Implemented

## Test Environment

### Verified Environment
- ✅ Chrome 120+ (Windows, macOS, Android)
- ✅ Firefox 121+ (Windows, macOS, Android)
- ✅ Safari 17+ (macOS, iOS)
- ✅ Edge 120+ (Windows, macOS)
- ✅ Mobile Safari (iOS) 15+)
- ✅ Mobile Chrome (Android 10+)
  
## How to Check Compatibility

Check that the following features work in your browser:

1. **Map Loading**: Does the Leaflet map display properly?
2. **WebSocket Connection**: Does live chat work?
3. **File Upload**: Can you upload images?
4. **Responsive Layout**: Does the UI display properly on mobile?

## Troubleshooting

### If the map doesn't display
- Check for CORS errors in the browser console
- Check the network connection
- Check Leaflet CSS/JS loading

### If live chat doesn't work
- Check WebSocket support
- Check your firewall settings
- Check the Socket.IO connection status

### If the layout is broken on mobile
- Check your browser viewport settings
- Check Tailwind CSS loading

## References

- [Leaflet Browser Compatibility](https://leafletjs.com/reference.html#browser-support)
- [Socket.IO Browser Support](https://socket.io/docs/v4/client-installation/)
- [Node.js Platform Support](https://nodejs.org/en/about/platforms/)

