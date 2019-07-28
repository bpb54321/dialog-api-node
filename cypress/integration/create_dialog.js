/// <reference types="Cypress" />

context('createDialog', () => {
  specify(`When I send a createDialog mutation, ` +
    `Then I should get the correct response`, () => {

    const variables = {
      name: "Dialog 1.1",
      languageCode: "en-US",
    };

    const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanlrcGhiMmMzb295MGI5OXB1dGo2NH" +
      "ppIiwiaWF0IjoxNTY0MzMwNzIwfQ.pwUndbPVfARKN6aMjtrAsLfYpUKhiWJyHakV5m4vR6Y";

    cy.request({
      url: "http://localhost:4000",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${userToken}`,
      },
      body: {
        "operationName": "CreateDialog",
        "variables": variables,
        "query":
          `
            mutation CreateDialog($name: String!, $languageCode: String!) {
              createDialog(name: $name, languageCode: $languageCode) {
                name
                languageCode
              }
            }
          `,
      },
    }).should((response) => {
      expect(response.body).to.deep.equal({
        "data": {
          "createDialog": {
            "name": "Dialog 1.1",
            "languageCode":"en-US"
          }
        }
      });
    })
  });
});
