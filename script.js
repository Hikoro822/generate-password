const inputPassword = document.querySelector('.wrapper__input')

const generateBtn = document.querySelector('.button-generate')
const copyBtn = document.querySelector('.button-copy')
const statusMessage = document.createElement('div')

statusMessage.classList.add('loading')

statusMessage.style.color = '#666';
statusMessage.style.fontSize = '22px';
statusMessage.style.marginTop = '5px';
statusMessage.style.minHeight = '18px'
inputPassword.parentNode.appendChild(statusMessage)

const passwordSymbol = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// !@#$%^&*()_+-=[]{}|;:,.<>?

const generatePassword = () => {
    let password = ''

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * passwordSymbol.length)
        password += passwordSymbol[randomIndex]
    }

    return password
}

const animatePassword = (password) => {
    let i = 0
    inputPassword.value = ''
    statusMessage.textContent = 'Генерируется...'


    const interval = setInterval(() => {
        if (i < password.length) {
            inputPassword.value += password[i]
            i++
        } else {
            clearInterval(interval)
            statusMessage.textContent = ''
        }
    }, 100)
}

const copyToClipBoard = () => {
    const password = inputPassword.value
    if (!password) return

    navigator.clipboard.writeText(password)
        .then(() => {
            inputPassword.value = ''
            copyBtn.textContent = 'Скопировано!'
            inputPassword.style.background = 'green'

            setTimeout(() => {
                copyBtn.textContent = 'Копировать'
                inputPassword.style.background = '#222'
            }, 900)
        })
        .catch(error => {
            console.log('Ошибка копирования!', error)
        })
}



generateBtn.addEventListener('click', () => {
    const password = generatePassword()
    animatePassword(password)
})

copyBtn.addEventListener('click', () => {
    copyToClipBoard()
})


