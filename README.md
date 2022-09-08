# Example proyect using API Testing - by Andres Fernandez R

Used in this project:
- API Testing tecniques.
- cypress.env.json files, used to keep some values hidden from the web or other users.
- Last version of Cypress.
- .gitignore files with their respective description.

Installation:
- https://code.visualstudio.com/
- https://nodejs.org/en/download/
- Have a github account
- Optional: GitHub Desktop

Keep in mind:
- The project was created using the version 10.7.0 of cypress.
- The project was created using a test URL: http://3.13.86.142:3000/contacts/
- In the .gitignore file the usual folders were added, but there's also a file called cypress.env.json, that should be created to run this project.

Instructions to create the cypress.env.json file:
- Right click on the project folder, press create new file and write "cypress.env.json", then press enter
- Inside the file put the following code:
{
    "endpointContacts": "/contacts/"
}
- Save the changes and continue with the cypress installation.

Commands after clonning this project from GitHub:
- npm install cypress --save-dev cypress@10.7.0
- npx cypress open
- Run the code.