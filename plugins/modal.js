function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('osmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Title</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Text body</p>
                    <p>Text body</p>
                </div>
                <div class="modal-footer">
                    <div class="modal-button ok">Ок</div>
                    <div class="modal-button close">Close</div>
                </div>
            </div>
        </div>`)
    document.body.appendChild(modal)
    return modal
}


$.modal = function (options) {
    const _create = _createModal(options)

    return {
        open(options) {
            _create.classList.add('open')
        },
        close() {
            _create.classList.remove('open')
        },
        destroy() {

        }
    }
}