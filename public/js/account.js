'use strict';

(function () {

  var buttonClick;

  var updateAccountButton = document.getElementById('updateAccountButton');

  var confirmNavigation = function confirmNavigation(ev) {
    if (!updateAccountButton.disabled && !buttonClick) {
      var message = 'Are you sure you wish to navigate away from this page? Your changes will be lost.';
      ev.returnValue = message;
      return message;
    }
  };

  var deleteAccount = function deleteAccount(ev) {

    ev.preventDefault();

    buttonClick = true;

    var warning = confirm('WARNING: If you delete your account, any resources that you are the sole owner of will be deleted. If there are other owners for your resources, they will not be deleted. Instead, ownership will transfer to the next owner in the list. This operation CANNOT be undone. If you wish to proceed, it is strongly recommended that you back up your data first. Press Cancel to stop the deletion. Press OK to go on to the next step (you will have one more chance to cancel).');

    if (warning) {

      var response = prompt('If you are certain you wish to delete your account and database items, type "DELETE" in the box below in all capitals.'); // eslint-disable-line

      if (response === 'DELETE') {

        var opts = {
          credentials: 'same-origin',
          method: 'DELETE',
          mode: 'same-origin',
          redirect: 'follow'
        };

        fetch('/account', opts).then(function (res) {

          if (res.status != 204) {
            // eslint-disable-line
            alert('There was a problem deleting your account.');
          }

          window.location.href = '/?logout=true';
        }).catch(function (err) {
          return alert('There was a problem deleting your account.', err, err.stack);
        });
      }
    }
  };

  var enableButton = function enableButton(ev) {
    if (ev.target.tagName === 'INPUT') {
      updateAccountButton.disabled = false;
      window.removeEventListener('input', enableButton);
    }
  };

  document.getElementById('deleteAccountButton').addEventListener('click', deleteAccount);
  updateAccountButton.addEventListener('click', function () {
    buttonClick = true;
  });
  window.addEventListener('beforeunload', confirmNavigation);
  window.addEventListener('input', enableButton);
})();