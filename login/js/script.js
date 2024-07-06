import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, getRedirectResult, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithRedirect, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { firebaseConfig } from '../../data/js/config.js';

(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    userLocale.onData.load();
    
    let lang;

    const container = document.querySelector('.container');

    const loginCard = () => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = (`
            <h1>${lang.login}</h1>
            <div class="group">
                <select name="language" id="changeLang">
                    <option value="">Language</option>
                    <option value="indonesia">Bahasa Indonesia</option>
                    <option value="english">English</option>
                </select>
            </div>
            <br/>
            <div class="group">
                <button class="btn-1 chooseEmail"><i class="far fa-envelope"></i>Email</button>
            </div>
        `);

        const changeLang = card.querySelector('#changeLang');
        changeLang.onchange = async() => {
            await userLocale.action.cahngeLang(changeLang.value);
            await langCheker();
            loginCard();
        }

        this.chooseEmail = this.element.querySelector(".chooseEmail");
        this.chooseEmail.onclick = () => this.emailElement(this.element);
    }

    emailElement(chooser) {
        // DIV BARU
        this.mailElement = document.createElement("div");
        this.mailElement.classList.add("Landing");
        this.mailElement.innerHTML = (`
            <div class="Title">KIRIMIN</div>
            <div class="Desc">Login Email</div>
            <div class="Tombol">
                <input type="text" placeholder="Email" data-inpt="email" required />
                <input type="text" placeholder="Password" data-inpt="password" required />
                <button class="btn-1 loginEmail">Login</button>
            </div>
            <div class="reg">
                Belum Punya Akun? <span>Buat Sekarang</span>
            </div>
        `);
        const email = this.mailElement.querySelector(`.Tombol [data-inpt="email"]`);
        const password = this.mailElement.querySelector(`.Tombol [data-inpt="password"]`);

        this.mailElement.querySelector(".reg span").onclick = () => this.registerElement(this.mailElement); // LISTENER KALO KLIK BUAT AKUN
        this.mailElement.querySelector('.loginEmail').onclick = () => this.login(email, password); // LISTENER KALO KLIK LOGIN
        chooser.remove(); // HAPUS ELEMENT SEBELUMNYA
        this.container.appendChild(this.mailElement); // MASUKIN KE CONTAINER
    }

    login(email, password) {
        // LOGIN HANDLER DENGAN EMAIL DAN PASSWORD
        auth.signInWithEmailAndPassword(email.value, password.value).catch((err) => Notipin.Alert({
            msg: err.message,
            mode: "dark"
        })); // KALO ADA ERROR TAMPILKAN DI ALERT
    }

    registerElement(loginElement) {
        // DIV BARU
        this.regElement = document.createElement("div");
        this.regElement.classList.add("Landing");
        this.regElement.innerHTML = (`
            <div class="Title">KIRIMIN</div>
            <div class="Desc">Login Email</div>
            <div class="Tombol">
                <input type="text" placeholder="Email" data-inpt="email" required />
                <input type="text" placeholder="Password" data-inpt="password" required />
                <input type="text" placeholder="Konfirmasi Password" data-inpt="cPassword" required />
                <button class="btn-1 registerEmail">Register</button>
            </div>
            <div class="reg">
                Sudah Punya Akun? <span>Masuk Sekarang</span>
            </div>
        `);

        const email = this.regElement.querySelector(`.Tombol [data-inpt="email"]`);
        const password = this.regElement.querySelector(`.Tombol [data-inpt="password"]`);
        const cPassword = this.regElement.querySelector(`.Tombol [data-inpt="cPassword"]`);

        this.regElement.querySelector(".reg span").onclick = () => this.emailElement(this.regElement); // LISTENER KLIK MASUK AKUN
        this.regElement.querySelector(".registerEmail").onclick = () => this.register(email, password, cPassword); // LISTENER KLIK REGISTER
        loginElement.remove(); // HAPUS ELEMENT SEBELUMNYA
        this.container.appendChild(this.regElement); // MASUKKIN KE CONTAINER
    }

    register(email, password, cPassword) {
        if(email.value == '' || password.value == "" || cPassword.value == "") return Notipin.Alert({
            msg: "Harap Isi Semua Bidang",
            type: "danger",
            mode: "dark"
        }); // KALO ADA SALAH SATU YANG KOSONG AKAN ADA ALERT
        if(password.value.length < 8) return Notipin.Alert({
            msg: "Password Minimal 8 Karakter",
            type: "danger",
            mode: "dark"
        }); // KALO PASSWORD KURANG DARI 8 KARAKTER AKAN ADA ALERT
        if(password.value !== cPassword.value) return Notipin.Alert({
            msg: "Konfirmasi Password Tidak Sesuai",
            type: "danger",
            mode: "dark"
        }); // KALO KONFIRMASI PASSWORD TIDAK SESUAI(MATCH) MAKA ADA ALERT
        auth.createUserWithEmailAndPassword(email.value, cPassword.value).catch((err) => Notipin.Alert({
            msg: err.message,
            mode: "dark"
        })); // KALO ADA ERROR, TAMPILKAN DI ALERT
    }
    const almostCard = () => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = (`
            <h1>${lang.almost}!</h1>
            <p><i>${lang.we_sent}</i></p>
            <p class="c-yellow"><i>${lang.do_not_close}</i></p>
        `);

        container.appendChild(card);
    }

    const transition = (prevCard, nextCard) => {
        prevCard.classList.add('deleted');
        setTimeout(() => {
            container.removeChild(prevCard);
            nextCard();
        }, 200);
    }

    const langCheker = async() => {
        let getLang;
        await fetch('../data/js/language.json').then((data) => data.json()).then((res) => {
            getLang = res;
        });

        let currentLang;
        if(userLocale.state.last_lang == 'indonesia') {
            currentLang = 'indonesia'
        } else {
            currentLang = 'english';
        }
        
        lang = getLang[currentLang].Login.Index;
    }
    langCheker();

    onAuthStateChanged(auth, (user) => {
        container.innerHTML = `${lang.preparing}...`;
        if(user) {
            window.location.href = window.location.origin + '/dashboard/';
        } else {
            loginCard();
        }
    })
})();
