// eslint-disable-next-line no-unused-vars
class http {

    static async request(method, endpoint, body = null, errorHandler = null) {
        let statusCode = 0;
        try {
            const response = await fetch('/api/' + endpoint, {
                method: method,
                headers: body ? {'Content-Type': 'application/json'} : {},
                body: body ? JSON.stringify(body) : null
            });

            // Get status code
            statusCode = response.status;

            const responseBody = await response.text(); // Read response as text first

            // Try to parse the response as JSON, if it fails, assume it's plain text
            let data;
            try {
                data = JSON.parse(responseBody);
            } catch (e) {
                data = responseBody;
            }

            // Check for error in the response (you might need to adjust this logic based on your API)
            if (!response.ok) {
                if(errorHandler) {
                    errorHandler({statusCode, data});
                } else {
                    throw new Error(data);
                }
            }

            return data;
        } catch (error) {
            this.showErrorModal(method, endpoint, error, statusCode);
            throw error;
        }
    }

    static async get(endpoint) {
        return this.request('GET', endpoint);
    }

    static async post(endpoint, body, errorHandler=null) {
        return this.request('POST', endpoint, body, errorHandler);
    }

    static async put(endpoint, body) {
        return this.request('PUT', endpoint, body);
    }

    static async delete(endpoint) {
        return this.request('DELETE', endpoint);
    }

    static showErrorModal(method, endpoint, error, statusCode) {

        // eslint-disable-next-line no-undef
        const modalHandler = new bootstrap.Modal(document.getElementById('error-modal'), {});

        // eslint-disable-next-line no-undef
        document.querySelector('#error-modal-title').textContent = `Error ${statusCode}`;

        // eslint-disable-next-line no-undef
        document.querySelector('#error-modal-body').innerHTML = `${method.toUpperCase()} ${endpoint}<br>${error.message}`;

        // Show modal
        modalHandler.show();
    }

}
