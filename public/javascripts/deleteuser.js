function confirmDelete(event) {
  event.preventDefault();
  const userConfirmed = confirm("Are you sure you want to delete your account?");
  if (userConfirmed) {
    window.location.href = event.currentTarget.href;
  }
}
