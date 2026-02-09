/**
 * Meeting Scheduler
 * Handles meeting request form, generates .ics calendar file, and sends email notification
 */

class MeetingScheduler {
    constructor() {
        this.modal = document.getElementById('meeting-modal');
        this.form = document.getElementById('meeting-form');
        this.closeBtn = document.querySelector('.modal-close');
        this.ownerEmail = 'aronc.anand3@gmail.com';
        this.ownerName = 'Aron C Anand';

        this.init();
    }

    init() {
        // Set minimum date to today
        const dateInput = document.getElementById('meeting-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }

        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Close modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Close on outside click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Gather form data
        const data = {
            guestName: document.getElementById('guest-name').value,
            guestEmail: document.getElementById('guest-email').value,
            date: document.getElementById('meeting-date').value,
            time: document.getElementById('meeting-time').value,
            duration: parseInt(document.getElementById('meeting-duration').value),
            meetingLink: document.getElementById('meeting-link').value,
            topic: document.getElementById('meeting-topic').value || 'Meeting with ' + document.getElementById('guest-name').value
        };

        // Generate and download .ics file
        this.generateICS(data);

        // Send email notification
        this.sendEmailNotification(data);

        // Show success message
        this.showSuccess();
    }

    generateICS(data) {
        const startDate = new Date(`${data.date}T${data.time}`);
        const endDate = new Date(startDate.getTime() + data.duration * 60000);

        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const uid = `meeting-${Date.now()}@aroncanand.com`;

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aron C Anand Portfolio//Meeting Scheduler//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
DTSTAMP:${formatDate(new Date())}
UID:${uid}
ORGANIZER;CN=${data.guestName}:mailto:${data.guestEmail}
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${this.ownerName}:mailto:${this.ownerEmail}
SUMMARY:Meeting with ${data.guestName}
DESCRIPTION:${data.topic}\\n\\nMeeting Link: ${data.meetingLink}\\n\\nScheduled by: ${data.guestName} (${data.guestEmail})
LOCATION:${data.meetingLink}
URL:${data.meetingLink}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Meeting with ${data.guestName} in 15 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`;

        // Create and download the file
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `meeting-with-aron-${data.date}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    sendEmailNotification(data) {
        const subject = encodeURIComponent(`Meeting Request: ${data.topic}`);
        const formattedDate = new Date(`${data.date}T${data.time}`).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const body = encodeURIComponent(
            `Hi Aron,

I'd like to schedule a meeting with you.

📅 Date & Time: ${formattedDate}
⏱️ Duration: ${data.duration} minutes
🔗 Meeting Link: ${data.meetingLink}

📋 Topic/Agenda:
${data.topic}

Looking forward to connecting!

Best regards,
${data.guestName}
${data.guestEmail}`
        );

        // Open mailto
        window.location.href = `mailto:${this.ownerEmail}?subject=${subject}&body=${body}`;
    }

    showSuccess() {
        // Replace form with success message
        const formContainer = this.form.parentElement;
        formContainer.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Meeting Request Sent!</h3>
                <p>A calendar invite has been downloaded and an email notification is being sent to Aron.</p>
                <p class="success-note">Make sure to send the email that just opened to complete the request.</p>
                <button class="btn btn-secondary" onclick="location.reload()">
                    Schedule Another
                </button>
            </div>
        `;
    }
}

// Initialize on DOM ready and create global function to open modal
document.addEventListener('DOMContentLoaded', () => {
    window.meetingScheduler = new MeetingScheduler();
});

// Global function to open the meeting modal
function openMeetingModal() {
    if (window.meetingScheduler) {
        window.meetingScheduler.openModal();
    }
}
