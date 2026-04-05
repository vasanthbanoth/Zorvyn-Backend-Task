window.addEventListener('load', function() {
  const headerHTML = `
      <header class="zorvyn-header">
          <div class="logo-container">
              <h2>Zorvyn <span class="tag">UI Jar Edition</span></h2>
          </div>
          <nav class="nav-links">
              <a href="#" class="active">API</a>
              <a href="#">Elements</a>
              <a href="#">Guides <span style="font-size: 10px; color: #71717a;">↗</span></a>
              <a href="#">Support</a>
              <a href="#" style="margin-left: 20px; color: #fff !important;">Get Key</a>
          </nav>
      </header>
  `;
  
  const swaggerUIElement = document.getElementById('swagger-ui');
  if (swaggerUIElement) {
      // Create wrapper window to match UI Jar framing
      const wrapper = document.createElement('div');
      wrapper.className = 'swagger-container';
      
      // Move swaggerUI inside wrapper
      swaggerUIElement.parentNode.insertBefore(wrapper, swaggerUIElement);
      
      // Add stylish header and swagger inside
      wrapper.innerHTML = headerHTML;
      wrapper.appendChild(swaggerUIElement);
  } else {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
});
