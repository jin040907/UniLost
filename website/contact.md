---
layout: default
title: Contact
description: Get in touch with the UniLost team
---

<div class="max-w-7xl mx-auto px-4 py-16">
  <div class="text-center mb-16">
    <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
    <p class="text-xl text-slate-600 max-w-3xl mx-auto">
      Have questions, suggestions, or need help? We're here to assist you.
    </p>
  </div>

  <!-- Contact Methods -->
  <div class="grid md:grid-cols-2 gap-8 mb-16">
    <!-- GitHub Issues -->
    <div class="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
      <div class="flex items-center gap-4 mb-6">
        <svg class="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <div>
          <h2 class="text-2xl font-bold text-slate-900">GitHub Issues</h2>
          <p class="text-slate-600">Report bugs and request features</p>
        </div>
      </div>
      <p class="text-slate-700 mb-6 leading-relaxed">
        Found a bug or have a feature request? Create an issue on GitHub. This is the best way to 
        report problems and suggest improvements.
      </p>
      <ul class="space-y-2 text-slate-600 mb-6">
        <li class="flex items-start gap-2">
          <span class="text-accent-600 mt-1">•</span>
          <span>Bug reports with detailed information</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent-600 mt-1">•</span>
          <span>Feature requests and enhancements</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent-600 mt-1">•</span>
          <span>Security vulnerability reports</span>
        </li>
      </ul>
      <a href="{{ site.links.github }}/issues" target="_blank" rel="noopener noreferrer" class="inline-block px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
        Open an Issue →
      </a>
    </div>

    <!-- GitHub Discussions -->
    <div class="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
      <div class="flex items-center gap-4 mb-6">
        <div class="text-4xl">💬</div>
        <div>
          <h2 class="text-2xl font-bold text-slate-900">GitHub Discussions</h2>
          <p class="text-slate-600">Ask questions and get help</p>
        </div>
      </div>
      <p class="text-slate-700 mb-6 leading-relaxed">
        Have a question or need help? Join our GitHub Discussions. The community and maintainers 
        are here to help you.
      </p>
      <ul class="space-y-2 text-slate-600 mb-6">
        <li class="flex items-start gap-2">
          <span class="text-accent-600 mt-1">•</span>
          <span>General questions and support</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent-600 mt-1">•</span>
          <span>Usage and implementation help</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent-600 mt-1">•</span>
          <span>Community discussions</span>
        </li>
      </ul>
      <a href="{{ site.links.discussions }}" target="_blank" rel="noopener noreferrer" class="inline-block px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
        Join GitHub Discussions →
      </a>
    </div>
  </div>

  <!-- Contact Form Section -->
  <div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl shadow-lg p-8 md:p-12 border border-primary-100 mb-16">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold text-slate-900 mb-4 text-center">Send Us a Message</h2>
      <p class="text-slate-700 mb-8 text-center">
        For general inquiries, partnerships, or other matters, please use the form below or contact us directly.
      </p>
      
      <div class="bg-white rounded-lg p-6 border border-slate-200">
        <form id="contactForm" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-slate-700 mb-2">Name</label>
            <input type="text" id="name" name="name" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input type="email" id="email" name="email" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-slate-700 mb-2">Subject</label>
            <select id="subject" name="subject" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-slate-700 mb-2">Message</label>
            <textarea id="message" name="message" rows="6" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"></textarea>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              <strong>Note:</strong> This form currently redirects to GitHub Issues. For immediate assistance, 
              please use <a href="{{ site.links.discussions }}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 underline">GitHub Discussions</a> 
              or <a href="{{ site.links.github }}/issues/new" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 underline">create an issue</a>.
            </p>
          </div>
          
          <button type="submit" class="w-full px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Additional Resources -->
  <div class="grid md:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200 text-center">
      <div class="text-4xl mb-4">📚</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2">Documentation</h3>
      <p class="text-slate-600 mb-4">Find answers in our comprehensive documentation</p>
      <a href="{{ site.links.documentation }}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 font-semibold">
        Read Docs →
      </a>
    </div>
    
    <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200 text-center">
      <div class="text-4xl mb-4">💻</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2">GitHub Repository</h3>
      <p class="text-slate-600 mb-4">View source code and contribute</p>
      <a href="{{ site.links.github }}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 font-semibold">
        View on GitHub →
      </a>
    </div>
    
    <div class="bg-white rounded-xl shadow-md p-6 border border-slate-200 text-center">
      <div class="text-4xl mb-4">🚀</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2">Live Demo</h3>
      <p class="text-slate-600 mb-4">Try UniLost in action</p>
      <a href="{{ site.links.live_demo }}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 font-semibold">
        Try Demo →
      </a>
    </div>
  </div>
</div>

<script>
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const subject = document.getElementById('subject').value;
  const title = encodeURIComponent(document.getElementById('subject').options[document.getElementById('subject').selectedIndex].text + ': ' + document.getElementById('name').value);
  const body = encodeURIComponent('Name: ' + document.getElementById('name').value + '\n\n' +
                                  'Email: ' + document.getElementById('email').value + '\n\n' +
                                  'Message:\n' + document.getElementById('message').value);
  window.open('{{ site.links.github }}/issues/new?title=' + title + '&body=' + body, '_blank');
});
</script>

