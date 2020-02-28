Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
    if(!buttons.length) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(button => {
        const $button = document.createElement('a')
        $button.textContent = button.text
        $button.classList.add('modal-button')
        $button.classList.add(`${button.type || 'ok' }`)
        $button.onclick = button.handler || noop

        wrap.appendChild($button)
    })

    return wrap
}

function _createModal({
                          content = '',
                          title = 'Заголовок',
                          width = '600px',
                          closable,
                          footerButtons
}) {
    const modal = document.createElement('div');
    modal.classList.add('osmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${width}">
                <div class="modal-header">
                    <span class="modal-title">${title}</span>
                    ${ closable ? '<span class="modal-close" data-close="true">&times;</span>' : ''}
                </div>
                <div class="modal-body" data-content>
                    ${ content }
                </div>
            </div>
        </div>`)
    const footer = _createModalFooter(footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))

    document.body.appendChild(modal)

    return modal
}


$.modal = function (options) {
    const _create = _createModal(options)
    const ANIMATION_SPEED = 200
    let isDestroyed = false
    let isClosing = false

    const modal = {
        open(options) {
            if(isDestroyed) return
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
    }
    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }
    const openWindow = event => {
        if (event.target.dataset.btn) {
            modal.open()
        }
    }



    _create.addEventListener('click', listener)
    document.addEventListener('click', openWindow)

    return Object.assign(modal, {
        destroy () {
            _create.parentNode.removeChild(_create)
            _create.removeEventListener('click', listener)
            isDestroyed = true
        },
        setContent (html) {
            _create.querySelector('[data-content]').innerHTML = html
        }
    })
}