const notification = document.getElementById('notification');
const notificationBody = document.getElementById('notification-body');

const Notification = {
    show: (message, time) => {
        const setedTime = !!time ? time : 3000;

        notificationBody.innerText = message;
        notification.classList.add('notification-show');

        const timeout = setTimeout(() => {
            notification.classList.remove('notification-show');
            clearTimeout(timeout);
        }, setedTime);
    },

    hide: () => {
        notification.classList.remove('notification-show');
    },
}

notification.addEventListener('click', Notification.hide);

