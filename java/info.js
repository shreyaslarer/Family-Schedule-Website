// Language Selector
const languageSelector = document.getElementById('language');
languageSelector.addEventListener('change', () => {
    const language = languageSelector.value;
    console.log(`Language changed to: ${language}`);
});

// Family Member Customization
const familyMemberInput = document.getElementById('familyMember');
const familyMemberColorInput = document.getElementById('familyMemberColor');
const addFamilyMemberBtn = document.getElementById('addFamilyMemberBtn');
const familyMembersList = document.getElementById('familyMembersList');

addFamilyMemberBtn.addEventListener('click', () => {
    const familyMember = familyMemberInput.value;
    const familyMemberColor = familyMemberColorInput.value;

    if (familyMember.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = familyMember;
        li.style.color = familyMemberColor;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            familyMembersList.removeChild(li);
        });

        li.appendChild(removeBtn);
        familyMembersList.appendChild(li);
        familyMemberInput.value = '';
    }
});

// Event Scheduling
const eventTitleInput = document.getElementById('eventTitle');
const eventStartDateInput = document.getElementById('eventStartDate');
const eventEndDateInput = document.getElementById('eventEndDate');
const eventStartTimeInput = document.getElementById('eventStartTime');
const eventEndTimeInput = document.getElementById('eventEndTime');
const addEventBtn = document.getElementById('addEventBtn');
const eventsBody = document.getElementById('eventsBody');

addEventBtn.addEventListener('click', () => {
    const eventTitle = eventTitleInput.value;
    const eventStartDate = eventStartDateInput.value;
    const eventEndDate = eventEndDateInput.value;
    const eventStartTime = eventStartTimeInput.value;
    const eventEndTime = eventEndTimeInput.value;

    if (eventTitle && eventStartDate && eventEndDate && eventStartTime && eventEndTime) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${eventTitle}</td>
            <td>${eventStartDate}</td>
            <td>${eventEndDate}</td>
            <td>${eventStartTime}</td>
            <td>${eventEndTime}</td>
            <td><button class="googleCalBtn">Add to Google</button></td>
            <td><button class="outlookCalBtn">Add to Outlook</button></td>
            <td><button class="noteBtn">Take Note</button></td>
            <td><button class="deleteEventBtn">Delete</button></td>
        `;

        // Google Calendar button
        row.querySelector('.googleCalBtn').addEventListener('click', () => {
            const googleUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(eventTitle)}&dates=${eventStartDate}/${eventEndDate}&details=Event%20details&location=Online`;
            window.open(googleUrl, '_blank');
        });

        // Outlook Calendar button
        row.querySelector('.outlookCalBtn').addEventListener('click', () => {
            const outlookUrl = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventTitle)}&startdt=${eventStartDate}&enddt=${eventEndDate}&location=Online`;
            window.open(outlookUrl, '_blank');
        });

        // Take Note button
        row.querySelector('.noteBtn').addEventListener('click', () => {
            window.open('https://keep.google.com/', '_blank'); // Example for taking notes with Google Keep
        });

        // Delete event row
        row.querySelector('.deleteEventBtn').addEventListener('click', () => {
            eventsBody.removeChild(row);
        });

        eventsBody.appendChild(row);
        eventTitleInput.value = '';
        eventStartDateInput.value = '';
        eventEndDateInput.value = '';
        eventStartTimeInput.value = '';
        eventEndTimeInput.value = '';
    }
});

// Export to Excel feature
const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', () => {
    const table = document.querySelector('.event-list table');
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, 'FamilyEvents.xlsx');
});

// AI Suggested Times
const suggestTimesBtn = document.getElementById('suggestTimesBtn');
const suggestedTimes = document.getElementById('suggestedTimes');

suggestTimesBtn.addEventListener('click', () => {
    const suggestions = ['2 PM - 4 PM', '10 AM - 12 PM ', '6 PM - 8 PM '];
    suggestedTimes.innerHTML = '';
    suggestions.forEach(time => {
        const li = document.createElement('li');
        li.textContent = time;
        suggestedTimes.appendChild(li);
    });
});

// Chat Section
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatMessages = document.getElementById('chatMessages');

sendChatBtn.addEventListener('click', () => {
    const message = chatInput.value;
    if (message.trim() !== '') {
        const p = document.createElement('p');
        p.textContent = message;
        chatMessages.appendChild(p);
        chatInput.value = '';
    }
});

// To-Do List Section
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

addTodoBtn.addEventListener('click', () => {
    const todo = todoInput.value;
    if (todo.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = todo;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            todoList.removeChild(li);
        });

        li.appendChild(removeBtn);
        todoList.appendChild(li);
        todoInput.value = '';
    }
});
document.getElementById('showLocationBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    
    if (location.trim() !== '') {
        // Create a URL for Google Maps with the location input
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

        // Open the Google Maps link in a new tab
        window.open(mapUrl, '_blank');
    } else {
        alert('Please enter a location.');
    }
});
const expenses = []; // Array to hold the expenses

document.getElementById('addExpenseBtn').addEventListener('click', function() {
    const familyMember = document.getElementById('familyMemberInput').value.trim();
    const expenseAmount = document.getElementById('expenseInput').value.trim();

    if (familyMember !== '' && expenseAmount !== '') {
        // Create an expense object
        const expense = {
            member: familyMember,
            amount: parseFloat(expenseAmount),
        };

        // Add the expense to the array
        expenses.push(expense);
        
        // Display the expense in the list
        displayExpenses();

        // Clear inputs
        document.getElementById('familyMemberInput').value = '';
        document.getElementById('expenseInput').value = '';
    } else {
        alert('Please enter both family member name and expense amount.');
    }
});

function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = ''; // Clear the list before displaying updated expenses

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.member}: $${expense.amount.toFixed(2)}`;
        
        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            removeExpense(index);
        });

        li.appendChild(removeBtn);
        expenseList.appendChild(li);
    });
}

function removeExpense(index) {
    // Remove the expense from the array
    expenses.splice(index, 1);
    displayExpenses(); // Update the displayed list
}

document.getElementById('viewExpensesBtn').addEventListener('click', function() {
    // Create a new tab to display expenses
    const expenseDetails = expenses.map(expense => `${expense.member}: $${expense.amount.toFixed(2)}`).join('<br>');
    const newWindow = window.open();
    newWindow.document.write('<h1>Family Expenses</h1>');
    newWindow.document.write('<p>' + expenseDetails + '</p>');
    newWindow.document.close(); // Close the document for rendering
});
