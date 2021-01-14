const backdrop = document.getElementById('backdrop');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

const Modal = {
    open: () => {
        backdrop.style.display = "block";
        
        const timeoutBackdrop = setTimeout(() => {
            backdrop.style.opacity = 1;
            clearTimeout(timeoutBackdrop);
        }, 10);

        const timeoutModal = setTimeout(() => {
           modal.classList.add('modal-opened');
           clearTimeout(timeoutModal); 
        }, 200)
    },

    close: () => {
        modal.classList.remove('modal-opened');

        const timeoutBackdrop = setTimeout(() => {
            backdrop.style.opacity = 0;
            clearTimeout(timeoutBackdrop);
        }, 200);

        const timeoutBackdropDisplay = setTimeout(() => {
            backdrop.style.display = "none";
            clearTimeout(timeoutBackdropDisplay);
        }, 510)
    },

    setTitle: (title) => {
        modalTitle.innerText = title;
    },

    setContent: (content) => {
        modalBody.innerHTML = content
    }
}

backdrop.addEventListener('click', Modal.close);
modal.addEventListener('click', (event) => event.stopPropagation());