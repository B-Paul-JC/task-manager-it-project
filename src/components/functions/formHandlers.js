export const submitApplication = (formData) => {
  const body = JSON.stringify(formData);
  return fetch("http://localhost:3000/api/teams/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
};

export const login = (formData) => {
  const body = JSON.stringify(formData);
  return fetch("http://localhost:3000/api/teams/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
};
