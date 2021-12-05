function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadPortal(randomSeconds) {
    $('#login-wrap')[0].style.display = 'none';
    $('#spinner')[0].style.display = 'flex';

    setTimeout(() => {
        $('#spinner')[0].style.display = 'none';
        $('#dashboard')[0].style.display = 'block';
        $('title')[0].innerText = 'Report portal'
    }, randomInteger(1, randomSeconds) * 1000)
}

function login() {
    console.log($('#login').val())
    console.log($('#password').val())
    const loginValue = $('#login').val();
    const passwordValue = $('#password').val();
    if ((loginValue === 'walker@jw.com') && (passwordValue === 'password')) {
        Cookies.set('username', 'walker@jw.com')
        $('#login-wrap')[0].style.display = 'none';
    } else {
        $('#error')[0].innerText = 'Fail to login'
        console.log({ loginValue })
        if (loginValue === 'old_walker@jw.com') {
            $('#error')[0].innerText = 'The user is suspended'
        }
        if (loginValue === '') {
            $('#error')[0].innerText = 'Login is empty'
        }
        if (passwordValue === '') {
            $('#error')[0].innerText = 'Password is empty'
        }
        $('#error')[0].style.opacity = '100%'
        return;
    }
    loadPortal(window.randomSeconds);
}

function logout() {
    Cookies.remove('username', { path: '' });
    Cookies.remove('username', { path: '/' });
    setTimeout(() => {
        document.location = "./index.html   "
        // location.reload();
    }, 111)
}

function createUser() {
    let usersArr = [];
    if (window.localStorage.getItem('users')) {
        usersArr = JSON.parse(window.localStorage.getItem('users'));
    }
    console.log({
        usersArr
    })
    const formData = $('form').serializeArray().reduce(function (m, o) {
        m[o.name] = o.value;
        return m;
    }, {});

    console.log({
        formData
    })

    usersArr.push(formData);

    window.localStorage.setItem('users', JSON.stringify(usersArr));
    console.log({ USERS: window.localStorage.getItem('users') })
}
