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
    const ANIMATION_SPEED = 200
    let isClosing = false

    return {
        open(options) {
            !isClosing && _create.classList.add('open')
        },
        close() {
            isClosing = true
            _create.classList.remove('open')
            _create.classList.add('hide')
            setTimeout(()=>{
                _create.classList.remove('hide')
                isClosing = false
            }, ANIMATION_SPEED)
        },
        destroy() {

        }
    }
}