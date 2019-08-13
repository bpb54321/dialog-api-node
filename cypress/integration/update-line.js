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

    const variables = {
      lines: [
        {
          "id": "cjz9xb4e002rb0766w1kdlgw5",
        },
        {
          "id": "cjz9xb58s02rj0766m18izy5c",
        },
        {
          "id": "cjz9xb60m02rr0766hzo76vqf",
        }
      ],
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
                id,
                number,
              }
            }
          `,
      },
    }).should((response) => {
      expect(response.body).to.deep.equal({
        "data": {
          "updateLine": [
            {
              id: "",
              number: 4,
            },
            {
              id: "",
              number: 5,
            },
            {
              id: "",
              number: 6,
            },
          ],
        }
      });
    })
  });
});
