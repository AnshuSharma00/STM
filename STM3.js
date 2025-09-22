// Base Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name}, Age: ${this.age}`;
  }
}

// Student Subclass
class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }

  getInfo() {
    return `${super.getInfo()} — Student of ${this.course}`;
  }
}

// Teacher Subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  getInfo() {
    return `${super.getInfo()} — Teaches ${this.subject}`;
  }
}

// React Component
function PersonApp() {
  const [people, setPeople] = React.useState([
    new Student("Alice Johnson", 20, "Computer Science"),
    new Teacher("Dr. Brown", 45, "Physics")
  ]);

  const [form, setForm] = React.useState({
    type: "Student",
    name: "",
    age: "",
    extra: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let newPerson;

    if (form.type === "Student") {
      newPerson = new Student(form.name, parseInt(form.age), form.extra);
    } else {
      newPerson = new Teacher(form.name, parseInt(form.age), form.extra);
    }

    setPeople([...people, newPerson]);

    setForm({ type: "Student", name: "", age: "", extra: "" });
  };

  return (
    <div className="container">
      <h2>Person Class Hierarchy</h2>

      {/* Form */}
      <form onSubmit={handleAdd}>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="extra"
          placeholder={form.type === "Student" ? "Course" : "Subject"}
          value={form.extra}
          onChange={handleChange}
          required
        />

        <button type="submit">Add {form.type}</button>
      </form>

      {/* Cards */}
      <div className="cards">
        {people.map((person, index) => (
          <div
            key={index}
            className={`card ${person instanceof Student ? "student" : "teacher"}`}
          >
            <h3>{person.name}</h3>
            <p><strong>Age:</strong> {person.age}</p>
            {person instanceof Student && <p><strong>Course:</strong> {person.course}</p>}
            {person instanceof Teacher && <p><strong>Subject:</strong> {person.subject}</p>}
            <p><em>{person.getInfo()}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PersonApp />);
