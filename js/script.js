document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#message-us-page form');
    if (!form) return;

    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const welcomeElement = document.getElementById('welcome-speech');
    if (!welcomeElement) {
        console.warn('Element #welcome-speech tidak ditemukan');
    }

    let statusDiv = document.getElementById('form-status');
    if (!statusDiv) {
        statusDiv = document.createElement('p');
        statusDiv.id = 'form-status';
        statusDiv.className = 'mt-6 text-center font-medium text-lg';
        form.parentNode.insertBefore(statusDiv, form.nextSibling);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

       
        statusDiv.textContent = '';
        statusDiv.className = 'mt-6 text-center font-medium text-lg';

        
        const name    = nameInput.value.trim();
        const email   = emailInput.value.trim();
        const message = messageInput.value.trim();

        
        if (!name) {
            statusDiv.textContent = 'Nama wajib diisi.';
            statusDiv.classList.add('text-red-600');
            nameInput.focus();
            return;
        }

        if (!email) {
            statusDiv.textContent = 'Email wajib diisi.';
            statusDiv.classList.add('text-red-600');
            emailInput.focus();
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            statusDiv.textContent = 'Format email tidak valid.';
            statusDiv.classList.add('text-red-600');
            emailInput.focus();
            return;
        }

        
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Jakarta' 
        };
        const currentTime = now.toLocaleString('en-EN', options);

       
        if (welcomeElement) {
            welcomeElement.textContent = `Hi ${name}, Welcome to Our Website!`;
        }

       
        statusDiv.innerHTML = `
            <span class="text-green-600 block mb-3 text-xl font-semibold">Form Submitted</span>
            <p class="text-gray-700 mb-3"><strong>Current Time:</strong> ${currentTime}</p>
            <div class="bg-gray-100 p-5 rounded-lg text-left max-w-lg mx-auto">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br>${message || '<i>(tidak ada pesan detail)</i>'}</p>
            </div>
        `;

     
        form.reset();

        
        statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});