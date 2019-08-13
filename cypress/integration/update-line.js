/// <reference types="Cypress" />

context('updateLine', () => {

  beforeEach(() => {
    // Load database with a specified state
    // One user
    // One dialog
    // Three lines
    cy.exec(`cat ${Cypress.env('sql_dump_directory')}dialog-with-three-lines.sql | ` +
      `docker exec -i ${Cypress.env('docker_mysql_service_name')} ` +
      `mysql -uroot -p${Cypress.env('docker_mysql_password')} ${Cypress.env('docker_mysql_db_name')}`);
  });

  specify(`Update multiple lines at once`, () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjano1aWlkbGIwMDAzMDc2NmNxYzJwbDFvIiwiaWF0IjoxNTY1NDM5OTIxfQ.DGZ3m6mZftHS5LODRKhl80DzHfFPXyxzpE-vKgHdQKY";

    const linesWithDesiredFields = [
      {
        "id": "cjz9xb4e002rb0766w1kdlgw5",
        "number": 4,
        "text": "This is the text for line 4.",
        "roleId": "cjz9xb3t202r3076635xxmoqm",
      },
      {
        "id": "cjz9xb58s02rj0766m18izy5c",
        "number": 5,
        "text": "This is the text for line 5.",
        "roleId": "cjz9xb3i102qw0766ubr6dvc3",
      },
      {
        "id": "cjz9xb60m02rr0766hzo76vqf",
        "number": 6,
        "text": "This is the text for line 6.",
        "roleId": "cjz9xb3t202r3076635xxmoqm",
      }
    ];
    // This includes the fields that we want to use to update the lines
    const variables = {
      lines: linesWithDesiredFields,
    };

    cy.request({
      url: Cypress.config().baseUrl,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: {
        "operationName": "UpdateLine",
        "variables": variables,
        "query":
          `
            mutation UpdateLine($lines: [LineInput!]!) {
              updateLine(lines: $lines) {
                id
                number
                text
                role {
                  id
                }
              }
            }
          `,
      },
    }).should((response) => {
      expect(response.body).to.deep.equal({
        "data": {
          "updateLine": [
            {
              id: linesWithDesiredFields[0].id,
              number: linesWithDesiredFields[0].number,
              text: linesWithDesiredFields[0].text,
              role: {
                id: linesWithDesiredFields[0].roleId
              }
            },
            {
              id: linesWithDesiredFields[1].id,
              number: linesWithDesiredFields[1].number,
              text: linesWithDesiredFields[1].text,
              role: {
                id: linesWithDesiredFields[1].roleId
              }
            },
            {
              id: linesWithDesiredFields[2].id,
              number: linesWithDesiredFields[2].number,
              text: linesWithDesiredFields[2].text,
              role: {
                id: linesWithDesiredFields[2].roleId
              }
            },
          ],
        }
      });
    })
  });
});
