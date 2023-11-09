
document.addEventListener('DOMContentLoaded', () => {
    const serviceRequestForm = document.getElementById('serviceRequestForm');
    const servicesSelect = document.getElementById('services');
    const resultsDiv = document.getElementById('results');

    serviceRequestForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const selectedServices = Array.from(servicesSelect.selectedOptions, (option) => option.value);

        try {
            const response = await axios.post('api/workers/check-services', { services: selectedServices });
            console.log("availableWorkers", response.data);

            if (Array.isArray(response.data)) {
                const availableWorkers = response.data;
                if (availableWorkers.length > 0) {
                    resultsDiv.innerHTML = `<p>Workers who can perform the requested services:</p>`;
                    resultsDiv.innerHTML += `<ul>${availableWorkers.map((worker) => `<li>${worker.name}</li>`).join('')}</ul>`;
                } else {
                    resultsDiv.innerHTML = '<p>No workers can perform the requested services.</p>';
                }
            } else {
                console.error('Invalid response format. Expected an array.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
