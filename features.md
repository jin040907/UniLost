---
layout: default
title: Features
description: Discover the powerful features of UniLost
---

<div class="max-w-7xl mx-auto px-4 py-16">
  <div class="text-center mb-16">
    <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Features</h1>
    <p class="text-xl text-slate-600 max-w-3xl mx-auto">
      Explore the comprehensive features that make UniLost the ideal solution for campus lost and found management
    </p>
  </div>

  <!-- Feature Categories -->
  <div class="space-y-20">
    <!-- Map-based Features -->
    <section>
      <div class="flex items-center gap-4 mb-8">
        <div class="text-5xl">🗺️</div>
        <div>
          <h2 class="text-3xl font-bold text-slate-900">Map-based Lost and Found Management</h2>
          <p class="text-slate-600 mt-2">Location-based registration and search using interactive maps</p>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-3">Interactive Map Interface</h3>
          <p class="text-slate-600 mb-4">
            Use Leaflet.js-powered maps to precisely mark item locations. Click on the map to set coordinates 
            or use address geocoding to find locations automatically.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>South Korea boundary restrictions for accurate campus mapping</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Adjustable search radius for location accuracy</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Visual markers for all registered items</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-3">Location-based Search</h3>
          <p class="text-slate-600 mb-4">
            Search for items by location, category, or keyword. Filter results to find exactly what you're looking for.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Category-based filtering</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Keyword search across titles and descriptions</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Status filtering (pending, approved, rejected)</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Real-time Communication -->
    <section>
      <div class="flex items-center gap-4 mb-8">
        <div class="text-5xl">💬</div>
        <div>
          <h2 class="text-3xl font-bold text-slate-900">Real-time Communication</h2>
          <p class="text-slate-600 mt-2">Connect with users instantly through chat and threaded discussions</p>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-3">Global Chat</h3>
          <p class="text-slate-600 mb-4">
            Participate in a community-wide chat room where all users can discuss lost and found items, 
            share tips, and help each other.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Real-time message delivery via Socket.IO</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Chat history preservation</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Anonymous or authenticated participation</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-3">Item-specific Threads</h3>
          <p class="text-slate-600 mb-4">
            Each lost item has its own discussion thread where users can ask questions, provide information, 
            or claim items.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Dedicated discussion space per item</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Real-time notifications for new messages</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Thread history for context</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- User Management -->
    <section>
      <div class="flex items-center gap-4 mb-8">
        <div class="text-5xl">👤</div>
        <div>
          <h2 class="text-3xl font-bold text-slate-900">User Authentication & Management</h2>
          <p class="text-slate-600 mt-2">Secure authentication with role-based access control</p>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-3">Student Accounts</h3>
          <p class="text-slate-600 mb-4">
            Students can register lost items, search for found items, and participate in discussions.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Register lost items with photos and descriptions</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Browse and search all approved items</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Participate in chat and item discussions</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-3">Administrator Accounts</h3>
          <p class="text-slate-600 mb-4">
            Administrators have full control over the system with approval and management capabilities.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Approve or reject item registrations</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Set and update storage locations</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Delete items and manage the database</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Data Management -->
    <section>
      <div class="flex items-center gap-4 mb-8">
        <div class="text-5xl">💾</div>
        <div>
          <h2 class="text-3xl font-bold text-slate-900">Flexible Data Storage</h2>
          <p class="text-slate-600 mt-2">Choose between SQLite for development or PostgreSQL for production</p>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-3">SQLite (Development)</h3>
          <p class="text-slate-600 mb-4">
            Perfect for local development and testing. No setup required - the database file is created automatically.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Zero configuration required</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Single file database</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Perfect for local testing</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 mb-3">PostgreSQL (Production)</h3>
          <p class="text-slate-600 mb-4">
            Robust, scalable database solution for production deployments with full ACID compliance.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>High performance and scalability</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Connection pooling support</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-600 mt-1">✓</span>
              <span>Production-ready reliability</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Responsive Design -->
    <section>
      <div class="flex items-center gap-4 mb-8">
        <div class="text-5xl">📱</div>
        <div>
          <h2 class="text-3xl font-bold text-slate-900">Responsive Design</h2>
          <p class="text-slate-600 mt-2">Works seamlessly on all devices</p>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <p class="text-slate-600 mb-4">
          UniLost is built with mobile-first design principles, ensuring a great experience on smartphones, 
          tablets, and desktop computers.
        </p>
        <ul class="grid md:grid-cols-3 gap-4 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-accent-600 mt-1">✓</span>
            <span>Mobile-optimized interface</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent-600 mt-1">✓</span>
            <span>Touch-friendly controls</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent-600 mt-1">✓</span>
            <span>Adaptive layouts</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent-600 mt-1">✓</span>
            <span>Fast loading times</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent-600 mt-1">✓</span>
            <span>Cross-browser compatibility</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent-600 mt-1">✓</span>
            <span>Offline-capable features</span>
          </li>
        </ul>
      </div>
    </section>
  </div>

  <!-- CTA Section -->
  <section class="mt-20 text-center bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 text-white">
    <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
    <p class="text-xl mb-8 text-primary-100">
      Try UniLost today and experience the future of campus lost and found management
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="{{ site.links.live_demo }}" target="_blank" rel="noopener noreferrer" class="px-8 py-4 rounded-lg bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-colors">
        Try Live Demo
      </a>
      <a href="{{ site.links.documentation }}" target="_blank" rel="noopener noreferrer" class="px-8 py-4 rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-600 transition-colors border-2 border-white/20">
        Read Documentation
      </a>
    </div>
  </section>
</div>

