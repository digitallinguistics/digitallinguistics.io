// include a warning about navigating away from the page if changes have been made
// send verification email if user email changes; email should only change if their new email is confirmed
// - this may have to happen via sending a request to the /users endpoint of the API

var deleteAccount = function (ev) {
  ev.preventDefault();
  var warning = confirm('WARNING: If you delete your account, any resources that you are the sole Owner of will be deleted. This CANNOT be undone. If you wish to proceed, it is strongly recommended that you back up your data first. Press Cancel to stop the deletion. Press OK to go on to the next step (you will have one more chance to cancel).');
  if (warning) {
    var response = prompt('If you are certain you wish to delete your account, type "DELETE" in the box below.');
  }
  if (response === 'DELETE') {

    var init = {
      credentials: 'same-origin',
      method: 'DELETE'
    };

    fetch('/account', init)
    .then(res => {
      if (res.status === 204) { window.location.href = '/?logout=true'; }
      else { alert('There was a problem deleting your account.'); }
    }).catch(err => alert('There was a problem deleting your account.'));

  }
};

var enableButton = function (ev) {
  if (ev.target.tagName === 'INPUT') { document.getElementById('updateInfoButton').disabled = false; }
  window.removeEventListener('input', enableButton);
};

document.getElementById('deleteAccountButton').addEventListener('click', deleteAccount);
window.addEventListener('input', enableButton);
