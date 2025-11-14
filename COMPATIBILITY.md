# Supported Operating Systems and Browser Compatibility

## Supported Operating Systems (Server)

### Server Runtime Environment
Since the UniLost server is based on Node.js, it can run on the following operating systems:

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
|---------|----------------|--------------------|--------|
| **Chrome** | 90+ | Latest | ✅ Fully Supported |
| **Firefox** | 88+ | Latest | ✅ Fully Supported |
| **Safari** | 14+ | Latest | ✅ Fully Supported |
| **Edge** | 90+ | Latest | ✅ Fully Supported |
| **Opera** | 76+ | Latest | ✅ Fully Supported |

### Mobile Browsers

| Platform | Browser | Minimum Version | Status |
|----------|---------|----------------|--------|
| **iOS** | Safari | iOS 14+ | ✅ Fully Supported |
| **iOS** | Chrome | Latest | ✅ Fully Supported |
| **Android** | Chrome | 90+ | ✅ Fully Supported |
| **Android** | Samsung Internet | 14+ | ✅ Fully Supported |
| **Android** | Firefox | 88+ | ✅ Fully Supported |

## Compatibility by Technology Stack

### Frontend Technologies
- **HTML5**: Supported by all modern browsers  
- **ES6+ JavaScript**: Chrome 51+, Firefox 54+, Safari 10+, Edge 15+  
- **Tailwind CSS**: Supported by all modern browsers  
- **Fetch API**: Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+

### Map Library
- **Leaflet.js 1.9.4**  
  - Chrome 60+, Firefox 55+, Safari 11+, Edge 79+  
  - Mobile: iOS Safari 11+, Android Chrome 60+

### Real-Time Communication
- **Socket.IO 4.8.1**  
  - Requires WebSocket-supported browsers  
  - Chrome 16+, Firefox 11+, Safari 7+, Edge 12+  
  - Fallback: Long Polling (for older browsers)

## Feature Compatibility

### Fully Supported Features
- ✅ Map rendering and interaction (Leaflet)  
- ✅ Real-time chat (Socket.IO)  
- ✅ User authentication and session management  
- ✅ Responsive design (mobile/desktop)  
- ✅ File upload (images)  
- ✅ Geocoding (address search)

### Limitations
- ⚠️ **Legacy browsers (IE 11 or earlier)**: Not supported  
- ⚠️ **Offline mode**: Not supported (server connection required)  
- ⚠️ **PWA features**: Not yet implemented

## Tested Environments

### Verified Platforms
- Chrome 120+ (Windows, macOS, Android)  
- Firefox 121+ (Windows, macOS, Android)  
- Safari 17+ (macOS, iOS)  
- Edge 120+ (Windows, macOS)  
- Mobile Safari (iOS 15+)  
- Mobile Chrome (Android 10+)

## How to Check Compatibility

Verify whether the browser supports the following:

1. **Map loading**: Leaflet map renders correctly  
2. **WebSocket connection**: Real-time chat works  
3. **File upload**: Image uploads work  
4. **Responsive layout**: UI is correct on mobile devices  

## Troubleshooting

### If the map does not display
- Check for CORS errors in browser console  
- Verify network connection  
- Ensure Leaflet CSS/JS loaded correctly  

### If real-time chat does not work
- Check WebSocket support  
- Inspect firewall settings  
- Verify Socket.IO connection status  

### If mobile layout breaks
- Confirm correct browser viewport settings  
- Ensure Tailwind CSS loads properly  

## References
- Leaflet Browser Support: https://leafletjs.com/reference.html#browser-support  
- Socket.IO Browser Support: https://socket.io/docs/v4/client-installation/  
- Node.js Platform Support: https://nodejs.org/en/about/platforms/
