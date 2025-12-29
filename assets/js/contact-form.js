// Contact Form Handler for AWS Lambda
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const quoteForm = document.getElementById('quote-form');
    const hireForm = document.getElementById('hire-form-submit');
    
    // API Gateway endpoint - UPDATE THIS with your actual endpoint
    const API_ENDPOINT = 'https://5wm81w5y1m.execute-api.ap-south-1.amazonaws.com/prod/contact';
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'contact');
        });
    }
    
    // Handle quote form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'quote');
        });
    }
    
    // Handle hire form submission
    if (hireForm) {
        hireForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'hire');
        });
    }
    
    async function handleFormSubmission(form, formType) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('.text').textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.querySelector('.text').textContent = 'Sending...';
        
        try {
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Add form type to subject
            if (formType === 'quote') {
                data.subject = `Work Inquiry: ${data.service || 'General'}`;
            } else if (formType === 'hire') {
                data.subject = `Hire Application: ${data.job_title || 'Position'}`;
                data.name = data.hr_name || data.company_name;
            }
            
            // Send to Lambda
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
                form.reset();
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showMessage('error', 'Failed to send message. Please try again.');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.querySelector('.text').textContent = originalText;
        }
    }
    
    function showMessage(type, message) {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            max-width: 400px;
            ${type === 'success' ? 'background-color: #28a745;' : 'background-color: #dc3545;'}
        `;
        messageDiv.textContent = message;
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});