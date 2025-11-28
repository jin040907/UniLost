---
layout: default
title: Home
description: Integrated Lost and Found Management System for Sejong University
---

<div class="max-w-7xl mx-auto px-4 py-16">
  <!-- Hero Section -->
  <section class="text-center mb-20">
    <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
      UniLost
    </h1>
    <p class="text-2xl md:text-3xl text-slate-600 mb-8 font-light">
      Integrated Lost and Found Management System
    </p>
    <p class="text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed">
      A comprehensive solution for managing lost and found items on campus using modern web technologies, 
      map-based registration, and real-time communication features.
    </p>
    
    <div class="flex flex-wrap justify-center gap-4">
      <a href="{{ site.links.live_demo }}" target="_blank" rel="noopener noreferrer" class="px-8 py-4 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all duration-200 text-lg">
        🚀 Try Live Demo
      </a>
      <a href="{{ site.links.documentation }}" target="_blank" rel="noopener noreferrer" class="px-8 py-4 rounded-lg bg-white text-primary-600 font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-all duration-200 text-lg">
        📚 View Documentation
      </a>
      <a href="{{ site.links.github }}" target="_blank" rel="noopener noreferrer" class="px-8 py-4 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 transition-all duration-200 text-lg flex items-center gap-2">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        View on GitHub
      </a>
    </div>
  </section>

  <!-- Mission Statement -->
  <section class="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16 border border-slate-200">
    <h2 class="text-3xl font-bold text-slate-900 mb-6 text-center">Our Mission</h2>
    <div class="max-w-4xl mx-auto">
      <p class="text-lg text-slate-700 leading-relaxed mb-6 text-center">
        UniLost aims to revolutionize how lost and found items are managed on university campuses. 
        By combining location-based services, real-time communication, and intuitive user interfaces, 
        we provide a seamless experience for students and administrators to report, search, and manage lost items.
      </p>
      <p class="text-lg text-slate-700 leading-relaxed text-center">
        Our goal is to increase item recovery rates, reduce administrative overhead, and create a 
        more connected campus community through technology.
      </p>
    </div>
  </section>

  <!-- Quick Links -->
  <section class="grid md:grid-cols-3 gap-6 mb-16">
    <a href="{{ site.links.documentation }}" target="_blank" rel="noopener noreferrer" class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-slate-200 group">
      <div class="text-4xl mb-4">📚</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">Documentation</h3>
      <p class="text-slate-600">Comprehensive guides, API reference, and tutorials</p>
    </a>
    
    <a href="{{ site.links.github }}" target="_blank" rel="noopener noreferrer" class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-slate-200 group">
      <div class="text-4xl mb-4">💻</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">GitHub Repository</h3>
      <p class="text-slate-600">View source code, contribute, and report issues</p>
    </a>
    
    <a href="{{ '/community' | relative_url }}" class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-slate-200 group">
      <div class="text-4xl mb-4">👥</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">Community</h3>
      <p class="text-slate-600">Join discussions, get support, and connect</p>
    </a>
  </section>

  <!-- Key Features Preview -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">Key Features</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <div class="text-3xl mb-4">🗺️</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Map-based Registration</h3>
        <p class="text-slate-600">Register and search lost items using interactive maps with precise location coordinates.</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <div class="text-3xl mb-4">💬</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Real-time Chat</h3>
        <p class="text-slate-600">Communicate with users through global chat and item-specific threaded discussions.</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <div class="text-3xl mb-4">👤</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">User Authentication</h3>
        <p class="text-slate-600">Secure session-based login system with role-based access control.</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <div class="text-3xl mb-4">🔐</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Admin Functions</h3>
        <p class="text-slate-600">Approve, reject, and manage lost items with comprehensive administrative tools.</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <div class="text-3xl mb-4">💾</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Data Storage</h3>
        <p class="text-slate-600">PostgreSQL for production or SQLite for local development.</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <div class="text-3xl mb-4">📱</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Responsive Design</h3>
        <p class="text-slate-600">Works seamlessly on both desktop and mobile devices.</p>
      </div>
    </div>
    
    <div class="text-center mt-8">
      <a href="{{ '/features' | relative_url }}" class="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
        View All Features →
      </a>
    </div>
  </section>

  <!-- Technology Stack -->
  <section class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 border border-primary-100">
    <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">Technology Stack</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600 mb-2">Node.js</div>
        <p class="text-slate-600">Backend Runtime</p>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600 mb-2">Express.js</div>
        <p class="text-slate-600">Web Framework</p>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600 mb-2">PostgreSQL</div>
        <p class="text-slate-600">Database</p>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600 mb-2">Socket.IO</div>
        <p class="text-slate-600">Real-time</p>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600 mb-2">Leaflet.js</div>
        <p class="text-slate-600">Maps</p>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600 mb-2">Tailwind CSS</div>
        <p class="text-slate-600">Styling</p>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600 mb-2">Jekyll</div>
        <p class="text-slate-600">Documentation</p>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600 mb-2">GitHub Pages</div>
        <p class="text-slate-600">Hosting</p>
      </div>
    </div>
  </section>
</div>

