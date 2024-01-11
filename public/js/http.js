// eslint-disable-next-line no-unused-vars
class http {
    static RELOAD = 'reload';

    static async request(method, endpoint, body = null, successHandler = null, errorHandler = null) {
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
                if (errorHandler) {
                    errorHandler({statusCode, message: responseBody});
                } else {
                    this.showErrorModal(method, endpoint, responseBody, statusCode);
                }
            }

            // Check for error in the response (you might need to adjust this logic based on your API)
            if (!response.ok) {
                const message = (data && data.message) || responseBody;
                if (errorHandler) {
                    errorHandler({statusCode, message});
                } else {
                    this.showErrorModal(method, endpoint, message, statusCode);
                }

                // Stop the function from continuing
                return;
            }

            // Call the success callback function if given
            if (typeof successHandler === 'function') {
                successHandler(data);
            }

            // Refresh page if callback was RELOAD
            if (successHandler === this.RELOAD) {
                // Ignore eslint error here
                // eslint-disable-next-line no-undef
                location.reload();
            }

        } catch (error) {
            if (errorHandler) {
                errorHandler({statusCode, message: error.message});
            } else {
                this.showErrorModal(method, endpoint, error.message, statusCode);
            }
        }
    }

    static async get(endpoint, successHandler = null, errorHandler = null) {
        return this.request('GET', endpoint, null, successHandler, errorHandler);
    }

    static async post(endpoint, body, successHandler = null, errorHandler = null) {
        return this.request('POST', endpoint, body, successHandler, errorHandler);
    }

    static async put(endpoint, body, successHandler = null, errorHandler = null) {
        return this.request('PUT', endpoint, body, successHandler, errorHandler);
    }

    static async delete(endpoint, successHandler = null, errorHandler = null) {
        return this.request('DELETE', endpoint, null, successHandler, errorHandler);
    }

    static showErrorModal(method, endpoint, message, statusCode) {

        // eslint-disable-next-line no-undef
        const modalHandler = new bootstrap.Modal(document.getElementById('error-modal'), {});

        // eslint-disable-next-line no-undef
        document.querySelector('#error-modal-title').textContent = `${method.toUpperCase()} ${endpoint}${statusCode !== 0 ? `: ${statusCode}` : ''}`;

        // eslint-disable-next-line no-undef
        document.querySelector('#error-modal-body').innerHTML = message;

        // Show modal
        modalHandler.show();


    }

}
