# Roster

**Roster** is a web application built with **Angular 19** for the frontend and **ASP.NET Core 8** for the backend. The application is designed for micro and small businesses seeking to optimize employee management. It provides an intuitive interface via minimalistic design for managing employee data and handling users with different roles.

---

## Key Features

### For Administrators

- Manage managers (team leads):
  - Create, edit, and delete managers.
  - Assign system access permissions.
- Oversee all employees in the system.

### For Managers (Team Leads)

- Employee creation and management:
  - Add new employees with unique email addresses generated upon registration.
  - Edit profile data such as name, experience, salary, and more.
  - Manage employee paid leave and medical insurance.
- View team structure by roles and departments.

### For Employees

- View their own profiles (prepared for future development).

---

## Core Architecture

- **Frontend:**

  - Framework: Angular 19
  - Component structure for role-based interface management.

- **Backend:**

  - Framework: ASP.NET Core 8 Web API
  - ORM: Entity Framework Core for database access.
  - Endpoints for managing employees and managers.

- **Database:**
  - Azure SQL Server
  - Models defined using Entity Framework Core.

---

## Installation and Setup

### Requirements

- **Node.js** (v18 or later)
- **.NET SDK** (v8 or later)
- **SQL Server** for data storage

### Installation Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/DimoPeevski/Roster.Client/roster.git
   cd roster
   ```

2. **Backend Setup**:

   - Navigate to the `Roster.Server` folder.
   - Configure the `appsettings.json` file with your database settings.
   - Run the backend:
     ```bash
     dotnet run
     ```

3. **Frontend Setup**:

   - Navigate to the `Roster.Client` folder.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the Angular application:
     ```bash
     ng serve
     ```

4. **Access the Application**:
   - Open a browser and navigate to: `http://localhost:4200`

---

## Employee Data Model

```csharp
public class Employee
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    public required string LastName { get; set; }

    [Required]
    public ExperienceLevel ExperienceLevel { get; set; }

    [Required]
    public bool VerifiedExperienceLevel { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Team { get; set; }

    [Required]
    [MaxLength(100)]
    public required string Email { get; set; }

    [Required]
    [Range(1000, 100000)]
    public decimal Salary { get; set; }

    [Required]
    public DateTime SalaryLastRaise { get; set; }

    [Required]
    [Range(0, 30)]
    public int PaidLeave { get; set; }

    [Required]
    public bool MedicalInsurance { get; set; }

    [Required]
    [MaxLength(255)]
    public required string ProfileAvatarUrlPath { get; set; }

    public Guid? CreatedByManagerId { get; set; }

    public virtual ApplicationUser? CreatedByManager { get; set; }
}
```

---

## Endpoints

### Team Leads Management

- \*\*POST /api/auth/login
- \*\*POST /api/auth/register
- \*\*POST /api/auth/logout
- \*\*GET /api/auth/profile
- \*\*GET /api/auth/role

### Employee Management

- \*\*GET /api/employees
- \*\*PUT /api/employees/{id}
- \*\*DELETE /api/employees/{id}
- \*\*POST /api/employees/create

---

## Planned Features

- Mobile version of the application.
- Multilingual support.
- Integration with external payroll management systems.

---

## License

This application is licensed under the [MIT License](LICENSE). I do not wish to change or redistribute this application. Please note that while the application is provided under the MIT License, any modifications or redistributions of the code are not authorized by me.

---

## Contact

For questions or suggestions, reach out via [dimo@peevski.dev](mailto:dimo@peevski.dev).
