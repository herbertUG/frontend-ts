import { IEmployee } from "./IEmployee";
import { EmployeeOrgApp } from "./EmployeeOrgApp";

// example of a CEO with subordinates
const ceo: IEmployee = {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: [
    {
      uniqueId: 2,
      name: "Sarah Donald",
      subordinates: [
        {
          uniqueId: 3,
          name: "Cassandra Reynolds",
          subordinates: [
            {
              uniqueId: 4,
              name: "Mary Blue",
              subordinates: []
            },
            {
              uniqueId: 5,
              name: "Bob Saget",
              subordinates: [
                {
                  uniqueId: 6,
                  name: "Tina Teff",
                  subordinates: []
                },
                {
                  uniqueId: 7,
                  name: "Will Turner",
                  subordinates: []
                }
              ]
            }
          ]
        },

      ]
    },
    {
      uniqueId: 8,
      name: "Tyler Simpson",
      subordinates: [
        {
          uniqueId: 9,
          name: "Harry Tobs",
          subordinates: [
            {
              uniqueId: 10,
              name: "Thomas Brown",
              subordinates: []
            },
          ]
        },
        {
          uniqueId: 11,
          name: "George Carrey",
          subordinates: []
        },
        {
          uniqueId: 12,
          name: "Gary Styles",
          subordinates: []
        }
      ]
    },
    {
      uniqueId: 13,
      name: "Bruce Willis",
      subordinates: []
    },
    {
      uniqueId: 14,
      name: "Georgina Flangy",
      subordinates: [
        {
          uniqueId: 15,
          name: "Sophie Turner",
          subordinates: []
        }
      ]
    }
  ]
};

const app = new EmployeeOrgApp(ceo);

console.log("Initial state:", JSON.stringify(app.ceo, null, 2));

// Move Bob Saget (uniqueId: 5) to be subordinate of Georgina Flangy (uniqueId: 14)
app.move(5, 14);
console.log("After move:", JSON.stringify(app.ceo,null,2));

// Undo the previous move
app.undo();
console.log("After undo:", JSON.stringify(app.ceo, null, 2));

// Redo the previous move
app.redo();
console.log("After redo:", JSON.stringify(app.ceo, null, 2));
