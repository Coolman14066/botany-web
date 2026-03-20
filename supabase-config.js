// ============================================
// SHARED SUPABASE CONFIG
// Single source of truth for Supabase URL + key + client
// Load via <script src="/supabase-config.js"></script> BEFORE app.js / dashboard.js
// Attaches to window so both module and non-module scripts can access
// ============================================
(function() {
  var url = 'https://pfpgnuuaueqpitfyfhko.supabase.co';
  var key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcGdudXVhdWVxcGl0ZnlmaGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMDM0MDMsImV4cCI6MjA4Nzc3OTQwM30.wDSbj24oklscbYUaZvhIIm6E2lD6gZrZ5K0PA9FozLA';
  var client = null;

  if (url && key && window.supabase) {
    client = window.supabase.createClient(url, key);
  }

  window.SUPABASE_URL = url;
  window.SUPABASE_ANON_KEY = key;
  window.supabaseClient = client;
})();
