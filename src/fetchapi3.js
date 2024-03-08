let events = JSON.parse(localStorage.getItem('events')) || [];

        function addEvent() {
            const dateInput = document.getElementById('date');
            const eventInput = document.getElementById('event');
            const date = dateInput.value;
            const event = eventInput.value;
            
            if (date && event) {
                // Ask for confirmation before adding the event
                const confirmation = window.confirm('Are you sure you want to add this event?');
                
                if (confirmation) {
                    events.push({ date, event });
                    localStorage.setItem('events', JSON.stringify(events));
                    renderEvents();
                    dateInput.value = '';
                    eventInput.value = '';
                }
            } else {
                alert('Please enter both date and event.');
            }
        }


        function deleteEvent(index) {
            const confirmation = window.confirm('Are you sure you want to delete this event?');
            if (confirmation) {
                events.splice(index, 1);
                localStorage.setItem('events', JSON.stringify(events));
                renderEvents();
            }
        }

        function updateEvent(index) {
            const eventList = document.getElementById('eventList');
            const li = eventList.children[index];
        
            const input = document.createElement('input');
            input.type = 'text';
            input.value = events[index].event;
        
            li.textContent = '';
            li.appendChild(input);
        
            input.focus();
        
            input.addEventListener('change', function() {
                events[index].event = input.value.trim();
                localStorage.setItem('events', JSON.stringify(events));
                renderEvents();
            });
        
            input.addEventListener('blur', function() {
                renderEvents();
            });
        }
        

        function displayEvents() {
            const eventList = document.getElementById('eventList');
            eventList.innerHTML = '';
            events.forEach((event, index) => {
                const li = document.createElement('li');
                li.textContent = `${event.date}: ${event.event}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteEvent(index);
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.onclick = () => updateEvent(index);
                li.appendChild(deleteButton);
                li.appendChild(updateButton);
                eventList.appendChild(li);
            });
        }

        function renderEvents() {
            const eventList = document.getElementById('eventList');
            eventList.innerHTML = '';
            events.forEach((event, index) => {
                const li = document.createElement('li');
                li.textContent = `${event.date}: ${event.event}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteEvent(index);
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.onclick = () => updateEvent(index);
                li.appendChild(deleteButton);
                li.appendChild(updateButton);
                eventList.appendChild(li);
            });
        }
        

        renderEvents();