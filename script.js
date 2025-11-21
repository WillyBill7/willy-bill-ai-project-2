// Enhanced Willy Bill AI with OpenAI Integration
class WillyBillAI {
    constructor() {
        this.isGenerating = false;
        this.conversationHistory = [];
        this.setupEventListeners();
        this.setupSmoothScrolling();
    }

    setupEventListeners() {
        // Clear chat functionality
        document.getElementById('clearChat').addEventListener('click', () => {
            this.clearChat();
        });

        // Input focus enhancement
        const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('focus', () => {
            messageInput.parentElement.classList.add('focused');
        });
        messageInput.addEventListener('blur', () => {
            messageInput.parentElement.classList.remove('focused');
        });

        // Navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    async sendMessageToOpenAI(userMessage) {
        // This would typically call your backend API that uses the Vercel AI SDK
        // For demo purposes, we'll simulate the API call structure
        
        try {
            // Simulating API call to backend endpoint
            const response = await this.simulateAPICall(userMessage);
            return response;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            return "I apologize, but I'm having trouble connecting to my AI services right now. Please try again in a moment.";
        }
    }

    async simulateAPICall(userMessage) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        // In a real implementation, this would be:
        /*
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                history: this.conversationHistory
            })
        });
        
        if (!response.ok) {
            throw new Error('API call failed');
        }
        
        const data = await response.json();
        return data.text;
        */

        // Simulated intelligent responses based on message content
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm Willy Bill AI, powered by OpenAI's advanced language models. I can help you with creative writing, problem-solving, coding, research, and much more. What would you like to work on today?";
        }
        
        if (message.includes('help')) {
            return "I'm here to assist you! I can help with:\n\n• Creative writing and content generation\n• Code writing and debugging\n• Research and explanations\n• Idea generation and brainstorming\n• Problem-solving and analysis\n\nJust let me know what you need help with, and I'll do my best to provide useful, accurate information.";
        }
        
        if (message.includes('weather')) {
            return "I can't access real-time weather data directly, but I can help you understand weather patterns or write code to integrate with weather APIs. For current weather, I'd recommend checking a dedicated weather service.";
        }
        
        if (message.includes('code') || message.includes('programming')) {
            return "I'd be happy to help with programming! I can assist with various languages including JavaScript, Python, HTML/CSS, and more. I can help write code, debug issues, explain concepts, or suggest best practices. What specific programming task are you working on?";
        }
        
        if (message.includes('thank')) {
            return "You're very welcome! I'm glad I could help. Feel free to ask if you have any other questions - I'm here to assist you with whatever you need.";
        }
        
        // Default intelligent response
        const responses = [
            "That's an interesting topic! Based on my training data, I can provide some insights...",
            "I understand your question. Let me break this down systematically...",
            "Great question! This involves several important concepts worth exploring...",
            "I'd be happy to help with that. Here's what I can tell you based on current knowledge...",
            "That's a thoughtful inquiry. Let me provide some comprehensive information...",
            "I appreciate your question. Here's my analysis of the situation...",
            "Interesting perspective! Let me share some relevant information about this...",
            "I can help you explore that topic. Here are the key points to consider..."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)] + " " + this.generateDetailedResponse(message);
    }

    generateDetailedResponse(message) {
        if (message.includes('ai') || message.includes('artificial intelligence')) {
            return "Artificial intelligence is rapidly evolving, with models like GPT-4o demonstrating remarkable capabilities in natural language understanding, code generation, and creative tasks. The field continues to advance with improvements in reasoning, safety, and multimodal capabilities.";
        }
        
        if (message.includes('technology') || message.includes('tech')) {
            return "Current technology trends show significant advancements in AI, cloud computing, and edge devices. The integration of AI into web applications, like this one, demonstrates how JavaScript and modern frameworks are enabling powerful user experiences directly in the browser.";
        }
        
        if (message.length < 20) {
            return "Could you please provide more details about what you're looking for? This will help me give you a more specific and helpful response tailored to your needs.";
        }
        
        return "The key considerations here involve balancing innovation with practicality, ensuring user-friendly experiences while leveraging the latest technological advancements. Would you like me to dive deeper into any specific aspect?";
    }

    addMessage(message, isUser = false, modelInfo = "GPT-4o") {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
            </div>
            <div class="message-content">
                <p class="mb-1">${message}</p>
                <small class="text-muted">${timestamp}${!isUser ? ` • ${modelInfo}` : ''}</small>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add to conversation history
        this.conversationHistory.push({
            role: isUser ? 'user' : 'assistant',
            content: message,
            timestamp: new Date().toISOString()
        });
    }

    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.remove('d-none');
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.add('d-none');
    }

    clearChat() {
        const chatMessages = document.getElementById('chatMessages');
        const initialMessage = chatMessages.querySelector('.ai-message');
        
        chatMessages.innerHTML = '';
        if (initialMessage) {
            chatMessages.appendChild(initialMessage.cloneNode(true));
        }
        
        this.conversationHistory = [];
        
        // Add new welcome message
        this.addMessage("Hello again! I'm ready for a fresh conversation. What would you like to talk about or work on together?", false);
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const message = messageInput.value.trim();
        
        if (message && !this.isGenerating) {
            this.isGenerating = true;
            sendButton.disabled = true;
            
            // Add user message
            this.addMessage(message, true);
            messageInput.value = '';
            
            // Show typing indicator
            this.showTypingIndicator();
            
            try {
                // Get AI response
                const response = await this.sendMessageToOpenAI(message);
                
                // Hide typing indicator and add AI response
                this.hideTypingIndicator();
                this.addMessage(response, false);
            } catch (error) {
                this.hideTypingIndicator();
                this.addMessage("I apologize, but I encountered an error while processing your request. Please try again.", false);
                console.error('Error:', error);
            }
            
            this.isGenerating = false;
            sendButton.disabled = false;
            messageInput.focus();
        }
    }
}

// Initialize Enhanced Willy Bill AI
const willyBillAI = new WillyBillAI();

// Global functions for HTML event handlers
async function sendMessage() {
    await willyBillAI.sendMessage();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize MDB components
    if (typeof mdb !== 'undefined') {
        mdb.Ripple.init();
    }
    
    // Add scroll animations for features
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe tech badges
    document.querySelectorAll('.tech-badge').forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        observer.observe(badge);
    });
});