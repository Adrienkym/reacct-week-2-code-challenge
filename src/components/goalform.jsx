import { useState, useEffect } from "react";

const API_URL = "https://jsonserver-1-admg.onrender.com";

function GoalForm({ onAddGoal, initialData, isEditing }) {
  const [formData, setFormData] = useState({
    name: "",
    target: "",
    category: "",
    deadline: "",
    savedAmount: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const url = isEditing
      ? `${API_URL}/goals/${formData.id}`
      : `${API_URL}/goals`;

    const method = isEditing ? "PATCH" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((goal) => {
        onAddGoal(goal);
        if (!isEditing) {
          setFormData({
            name: "",
            target: "",
            category: "",
            deadline: "",
            savedAmount: 0
          });
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Goal" : "Add New Goal"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Goal Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="target"
        placeholder="Target Amount"
        value={formData.target}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />
      <button type="submit">{isEditing ? "Update" : "Add Goal"}</button>
    </form>
  );
}

export default GoalForm;

