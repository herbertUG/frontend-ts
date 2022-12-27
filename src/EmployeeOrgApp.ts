import { IEmployee } from './IEmployee';
import { IEmployeeOrgApp } from './IEmployeeOrgApp';

export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: IEmployee;
  history: { move: [number, number][], undo: [number, number][] } = {
    move: [],
    undo: [],
  };

  constructor(ceo: IEmployee) {
    this.ceo = ceo;
  }

  move(employeeID: number, supervisorID: number): void {
    const employee = this.findEmployee(employeeID, this.ceo);
    const supervisor = this.findEmployee(supervisorID, this.ceo);
    if (!employee || !supervisor) {
      return;
    }

    const oldSupervisor = this.findSupervisor(employee, this.ceo);
    if (oldSupervisor) {
      oldSupervisor.subordinates = oldSupervisor.subordinates.filter(
        (e) => e.uniqueId !== employeeID
      );
    }
    supervisor.subordinates.push(employee);

    this.history.move.push([employeeID, supervisorID]);
    this.history.undo = [];
  }

  undo(): void {
    const [employeeID, supervisorID] = this.history.move.pop() || [];
    if (!employeeID || !supervisorID) {
      return;
    }

    const employee = this.findEmployee(employeeID, this.ceo);
    const supervisor = this.findEmployee(supervisorID, this.ceo);
    if (!employee || !supervisor) {
      return;
    }

    supervisor.subordinates = supervisor.subordinates.filter(
      (e) => e.uniqueId !== employeeID
    );
    const oldSupervisor = this.findSupervisor(employee, this.ceo);
    if (oldSupervisor) {
      oldSupervisor.subordinates.push(employee);
    }

    this.history.undo.push([employeeID, supervisorID]);
  }

  redo(): void {
    const [employeeID, supervisorID] = this.history.undo.pop() || [];
    if (!employeeID || !supervisorID) {
      return;
    }

    this.move(employeeID, supervisorID);
  }

  findEmployee(uniqueId: number, employee: IEmployee): IEmployee | null {
    if (employee.uniqueId === uniqueId) {
      return employee;
    }
    for (const sub of employee.subordinates) {
      const found = this.findEmployee(uniqueId, sub);
      if (found) {
        return found;
      }
    }
    return null;
  }

  findSupervisor(employee: IEmployee, root: IEmployee): IEmployee | null {
    if (root.subordinates.includes(employee)) {
      return root;
    }
    for (const sub of root.subordinates) {
      const supervisor = this.findSupervisor(employee, sub);
      if (supervisor) {
        return supervisor;
      }
      return null;
    }
  }
}
