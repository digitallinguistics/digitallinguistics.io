(() => {

  var buttonClick;

  const updateAccountButton = document.getElementById('updateAccountButton');

  const confirmNavigation = function confirmNavigation (ev) {
    if (!updateAccountButton.disabled && !buttonClick) {
      const message = 'Are you sure you wish to navigate away from this page? Your changes will be lost.';
      ev.returnValue = message;
      return message;
    }
  };

  const deleteAccount = function deleteAccount (ev) {

    ev.preventDefault();

    buttonClick = true;

    var warning = confirm('WARNING: If you delete your account, any resources that you are the sole owner of will be deleted. If there are other owners for your resources, they will not be deleted. Instead, ownership will transfer to the next owner in the list. This operation CANNOT be undone. If you wish to proceed, it is strongly recommended that you back up your data first. Press Cancel to stop the deletion. Press OK to go on to the next step (you will have one more chance to cancel).');

    if (warning) {

      var response = prompt('If you are certain you wish to delete your account and database items, type "DELETE" in the box below in all capitals.'); // eslint-disable-line

      if (response === 'DELETE') {

        const opts = {
          credentials: 'same-origin',
          method: 'DELETE',
          mode: 'same-origin',
          redirect: 'follow'
        };

        fetch('/account', opts)
        .then(res => {

          if (res.status != 204) { // eslint-disable-line
            alert('There was a problem deleting your account.');
          }

          window.location.href = '/?logout=true';

        }).catch(err => alert('There was a problem deleting your account.', err, err.stack));

      }
    }
  };

  const enableButton = function enableButton (ev) {
    if (ev.target.tagName === 'INPUT') {
      updateAccountButton.disabled = false;
      window.removeEventListener('input', enableButton);
    }
  };

  document.getElementById('deleteAccountButton').addEventListener('click', deleteAccount);
  updateAccountButton.addEventListener('click', () => { buttonClick = true; });
  window.addEventListener('beforeunload', confirmNavigation);
  window.addEventListener('input', enableButton);

})();
