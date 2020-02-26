const myModal = $.modal({
    title: 'My Modal',
    closable: true,
    content: `
    <h4>Modal is working</h4>
    <p>This is content</p>
    `,
    width: '400px',
    footerButtons: [
        {
            text: 'ok',
            type: 'close',
            handler () {
                myModal.close()
            }
        }
    ]
})