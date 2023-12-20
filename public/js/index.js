async function getService(categoryId, allServices, selectedServices) {


    try {
        const url = `/service/${categoryId}`;
        const response = await axios.get(url);
        const services = response.data;
        const serviceCheckboxes = document.getElementById('serviceCheckboxes');

        serviceCheckboxes.innerHTML = '';
        selectedList.innerHTML = '';

        services.forEach((service) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'services';
            checkbox.value = service.service_id;
            checkbox.id = `service_${service.service_id}`;
            checkbox.className = 'service_checkbox';

            checkbox.addEventListener('click', () => {
                if (checkbox.checked) {
                    selectedServices.push(service.service_id);
                    totalDuration += service.duration_minutes;

                } else {
                    const index = selectedServices.indexOf(service.service_id);
                    if (index > -1) {
                        selectedServices.splice(index, 1);
                        totalDuration -= service.duration_minutes;
                    }
                }
            });

            //document.getElementById('duration').innerHTML = totalDuration;
            // Set checked state ONLY based on selectedServices
            //checkbox.addEventListener('click', handleCheckboxClick);

            //  $('#duration').text(totalDuration);

            selectedList.innerHTML = '';

            selectedServices.forEach(id => {
                const label = document.createElement('div');
                label.textContent = `Service ${id}`;
                selectedList.appendChild(label);
            });


            checkbox.checked = selectedServices.includes(service.service_id);

            /*console.log("wasChecked - ", wasChecked);
            checkbox.checked = wasChecked;*/

            const label = document.createElement('label');
            label.htmlFor = `service_${service.service_id}`;
            label.appendChild(document.createTextNode(service.name));

            serviceCheckboxes.appendChild(checkbox);
            serviceCheckboxes.appendChild(label);
            serviceCheckboxes.appendChild(document.createElement('br'));
        });
    } catch (error) {
        console.error('Error fetching services:', error);
    }
}