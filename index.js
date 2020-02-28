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
            text: 'Ok',
            type: 'close',
            handler () {
                myModal.close()
            }
        },
        {
            text: 'Close',
            handler () {
                myModal.close()
            }
        }
    ]
})