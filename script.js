document.addEventListener("DOMContentLoaded", function () {
    // 1. Personalized Guest Name from URL Parameter (?to=NamaTamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("to");
    if (guestParam) {
        document.getElementById("guest-name").textContent = decodeURIComponent(guestParam);
    }

    // 2. Open Invitation Action
    const coverSection = document.getElementById("cover");
    const mainContent = document.getElementById("main-content");
    const openBtn = document.getElementById("open-invitation");
    const backsound = document.getElementById("backsound");
    const musicToggle = document.getElementById("music-toggle");
    let isPlaying = false;

    openBtn.addEventListener("click", function () {
        coverSection.classList.add("fade-out");
        setTimeout(() => {
            coverSection.style.display = "none";
            mainContent.classList.remove("d-none");
            musicToggle.classList.remove("d-none");
            // Play Audio
            backsound.play().then(() => {
                isPlaying = true;
                musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
            }).catch(e => console.log("Audio autoplay restricted:", e));
        }, 800);
    });

    // 3. Music Toggle Control
    musicToggle.addEventListener("click", function () {
        if (isPlaying) {
            backsound.pause();
            isPlaying = false;
            musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            backsound.play();
            isPlaying = true;
            musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
        }
    });

    // 4. Countdown Timer
    const weddingDate = new Date("November 15, 2026 08:00:00").getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById("hours").textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById("minutes").textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("seconds").textContent = Math.floor((distance % (1000 * 60)) / 1000);
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 5. RSVP & Message Feed Interaction
    const rsvpForm = document.getElementById("rsvp-form");
    const messageContainer = document.getElementById("message-container");

    rsvpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("rsvp-name").value;
        const status = document.getElementById("rsvp-status").value;
        const message = document.getElementById("rsvp-message").value;

        // Create new message element
        const badgeClass = status === "Hadir" ? "bg-success" : "bg-danger";
        const newMessage = document.createElement("div");
        newMessage.className = "mb-3 pb-2 border-bottom";
        newMessage.innerHTML = `
            <strong>${escapeHTML(name)}</strong> <span class="badge ${badgeClass} small ms-2">${escapeHTML(status)}</span>
            <p class="small text-muted mb-0 mt-1">${escapeHTML(message)}</p>
        `;

        messageContainer.prepend(newMessage);
        rsvpForm.reset();
        alert("Konfirmasi kehadiran dan ucapan berhasil dikirim!");
    });

    // Helper to prevent XSS injection in inputs
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // 6. Copy Bank Account Number
    const copyBtn = document.getElementById("copy-btn");
    const accNumber = document.getElementById("acc-number").textContent;

    copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(accNumber).then(() => {
            copyBtn.innerHTML = '<i class="fa-solid fa-check me-1"></i> Berhasil Disalin!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa-regular fa-copy me-1"></i> Salin Nomor Rekening';
            }, 3000);
        });
    });
});