function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadPortal() {
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
    if (($('#login').val() === 'walker@jw.com') && ($('#password').val() === 'password')) {
        Cookies.set('username', 'walker@jw.com')
        $('#login-wrap')[0].style.display = 'none';
    } else {
        $('#error')[0].style.opacity = '100%'
        return;
    }
    loadPortal();
}

function logout() {
    Cookies.remove('username', { path: '' });
    Cookies.remove('username', { path: '/' });
    setTimeout(() => {
        document.location = "./index.html?quick"
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