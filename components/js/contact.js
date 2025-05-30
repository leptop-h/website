// Initialize EmailJS with your public key
emailjs.init('YOUR_PUBLIC_KEY');

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form field values
    const from_name = document.getElementById('name').value.trim();
    const from_email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form fields
    if (!from_name || from_name.length < 2 || !/^[a-zA-Z\s]+$/.test(from_name)) {
        alert("Nama harus diisi dengan huruf minimal 2 karakter.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!from_email || !emailRegex.test(from_email)) {
        alert("Silakan masukkan email yang valid.");
        return;
    }

    const phoneClean = phone.replace(/\D/g, ''); // Remove non-digit characters
    if (!phone || phoneClean.length < 10 || phoneClean.length > 15) {
        alert("Nomor telepon harus terdiri dari 10–15 digit angka.");
        return;
    }

    if (!message || message.length < 5) {
        alert("Pesan harus minimal 5 karakter.");
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: from_name,
        from_email: from_email,
        phone: phone,
        message: message,
        to_email: 'aminthohari32@yahoo.co.id'
    };

    // Send email using EmailJS
    emailjs.send('service_kmcb', 'template_kmcb', templateParams) //servicekmcb & templatekmcs diganti id emailjs yang sebenarnya
        .then(function() {
            // Show success message
            alert('Pesan Anda telah berhasil terkirim!');
            
            // Reset form
            document.getElementById('contact-form').reset();
        }, function(error) {
            // Show error message
            console.error('Error:', error);
            alert('Maaf, terjadi kesalahan: ' + error.text);
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// WhatsApp Popup Functionality
const whatsappFloat = document.querySelector('.whatsapp-float');
const whatsappPopup = document.querySelector('.whatsapp-popup');
let popupTimeout;

whatsappFloat.addEventListener('mouseenter', function() {
    whatsappPopup.classList.add('show');
    clearTimeout(popupTimeout);
});

whatsappFloat.addEventListener('mouseleave', function() {
    popupTimeout = setTimeout(() => {
        whatsappPopup.classList.remove('show');
    }, 1500);
});

whatsappPopup.addEventListener('mouseenter', function() {
    clearTimeout(popupTimeout);
});

whatsappPopup.addEventListener('mouseleave', function() {
    popupTimeout = setTimeout(() => {
        whatsappPopup.classList.remove('show');
    }, 1500);
});
