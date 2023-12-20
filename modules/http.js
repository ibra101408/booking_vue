class http {
    // Constructor can be added if needed for initialization

    // The main request method
    async request({ url, method = 'GET', headers = {}, body = null }) {
        try {
            // Default headers
            const defaultHeaders = {};

            // Determine Content-Type based on body type
            if (body && typeof body === 'object' && !(body instanceof FormData)) {
                defaultHeaders['Content-Type'] = 'application/json';
                body = JSON.stringify(body); // Stringify if the body is a JSON object
            }

            const options = {
                method,
                headers: { ...defaultHeaders, ...headers }, // Combine default and provided headers
                ...(body && { body }), // Add the body only if it's not null
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
            }

            // Assuming JSON response, but you can modify this to handle other response types
            return await response.json();
        } catch (error) {
            console.error('Error in sendHttpRequest:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    }

    // Helper methods for specific HTTP methods
    async get(url, headers = {}) {
        return this.request({ url, method: 'GET', headers });
    }

    async post(url, body, headers = {}) {
        return this.request({ url, method: 'POST', headers, body });
    }

    async put(url, body, headers = {}) {
        return this.request({ url, method: 'PUT', headers, body });
    }

    async delete(url, headers = {}) {
        return this.request({ url, method: 'DELETE', headers });
    }
}

// Export the class
module.exports = http;
