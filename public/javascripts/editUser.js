const editUser = (userFormData) => {
  axios({
    method: "post",
    url: "/editeduser",
    data: userFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      console.log("User edited successfully");
      window.location.href = "/myblogs";
    })
    .catch((error) => {
      console.log(error);
      alert("An error occurred while adding the user. Please try again.");
    });
};

document.getElementById("editUserForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formElement = document.getElementById("editUserForm");
  const formData = new FormData(formElement);

  editUser(formData);
});
