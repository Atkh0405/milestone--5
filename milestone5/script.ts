document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

   const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;

     if (usernameElement && profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {


        //******************************************************************* */
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;

    //******************************************************************* */

        

        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureUrl = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="Profile Picture" class="profilePicture">` : ''}
            <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            <h3>Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;

        //******************************************************************* */


// sharaeble link with styling

const downloadLink = document.createElement("button");
downloadLink.textContent = "Copy Shareable Link";
downloadLink.className = "styled-button"; 
downloadLink.addEventListener("click", async () => {
    try {
        // Create a unique shareable link 
        const uniquePath = `https://yourdomain.com/resumes/${name.replace(/\s+/g, '_')}_cv.html`;

        // Use Clipboard API to copy 
        await navigator.clipboard.writeText(uniquePath); 
        alert("Shareable link copied successfully");
    } catch (err) {
        console.error("Failed to copy", err);
        alert("Failed to copy link, please try again");
    }
});

const resumeOutputElement = document.getElementById('resumeOutput');

        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            // makeEditable();
          resumeOutputElement.classList.remove("hidden");


// Pdf button  with styling

// creat container for buttons
const buttonContainer = document.createElement("div");
buttonContainer.id = "buttonContainer";
resumeOutputElement.appendChild(buttonContainer);

// Add download PDF button
const downloadButton = document.createElement("button");
downloadButton.textContent = "Download as PDF";
downloadButton.className = "styled-button"; 
downloadButton.addEventListener("click", () => {
    window.print(); // Open the print dialog
});

buttonContainer.appendChild(downloadButton);
 resumeOutputElement.appendChild(downloadLink);
            resumeOutputElement.style.display = 'block';
        }
    } else {
        console.log('One or more elements are not available');
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement("input");
                input.type = "text";
                input.value = currentValue;
                input.classList.add("editing-input");

                input.addEventListener("blur", function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = "inline";
                    input.remove();
                });

                currentElement.style.display = "none";
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}









