const popup = {
    prompt(options) {
        options = Object.assign({}, {
            msg: 'Mohon Maaf Jika UI nya Ada Yg Rusak, Kami Dari Pihak Team ACHATS Meminta Maaf Yang Se Besar Besarnya Atas Ketidak nyamanan Kalian Para Pengguna, Sekali Lagi Kami Dari Pihak Team Meminta Maaf, Terimakasih.',
            max: 1,
            val: '',
            placeholder: 'Type Here..',
            textarea: true,
            nowrap: true,
            yes: 'OK',
            no: 'CANCEL',
            type: 'info',
            onyes: () => {},
            onno: () => {}
        }, options);

        const html = (`
            <div class="Popup">
                <div class="box">
                    <div class="msg">${options.msg}</div
                    <div class="buttons">
                        <button class="btn confirm no">${options.no}</button>
                        <button class="btn confirm yes">${options.yes}</button>
                    </div>
                </div>
            </div>
        `);
        const template = document.createElement('template');
        template.innerHTML = html;

        const element = template.content.querySelector('.Popup');
        const btnIya = template.content.querySelector('.box .buttons .yes');
        const btnTidak = template.content.querySelector('.box .buttons .no');
        const tipe = options.type.toLowerCase();

        let input;
        if (options.textarea === true) {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
        }
        input.placeholder = options.placeholder;
        input.value = options.val;

        if (options.max > 0) {
            input.setAttribute("maxlength", options.max);
        }

        if(options.nowrap === true) {
            input.onkeyup = () => {
                input.value = input.value.replace(/ /g, '');
            }
        } else {
            input.onkeyup = () => {
                input.value = input.value.replace(/^\s+/g, '').replace(/ +(?= )/g,'').replace(/^\n+/g, '').replace(/\n /g, '\n').replace(/\n+(?=\n\n)/g, '');
            }
        }


        element.querySelector(".box .field").appendChild(input);
        
        if (tipe == "danger" || tipe == "red") {
            element.classList.add("danger");
        } else if (tipe == "info" || tipe == "green") {
            element.classList.add("info");
        } else if (tipe == "blue") {
            element.classList.add("blue");
        }

        btnIya.addEventListener('click', () => {
            options.onyes(input.value.replace(/^\s+/g, '').replace(/ +(?= )/g,'').replace(/^\n+/g, '').replace(/\n /g, '\n').replace(/\n+(?=\n\n)/g, ''));
            this.end(element);
        });

        btnTidak.addEventListener('click', () => {
            options.onno();
            this.end(element);
        });

        try {
            document.querySelector(".Popup").remove();
        } catch {}

        document.body.appendChild(template.content);
        input.focus();
    },
    alert(options) {
        let defMsg;
        typeof options == 'object' ? defMsg = options.msg : defMsg = options;
        options = Object.assign({}, {
            msg: defMsg,
            yes: 'OK',
            type: 'normal',
            onyes: () => {}
        }, options);
        const html = (`
            <div class="Popup">
                <div class="box">
                    <div class="msg">${options.msg}</div>
                    <div class="buttons">
                        <button class="btn alert yes">${options.yes}</button>
                    </div>
                </div>
            </div>
        `);
        const template = document.createElement('template');
        template.innerHTML = html;

        const element = template.content.querySelector('.Popup');
        const btnIya = template.content.querySelector('.box .buttons .yes');
        const tipe = options.type.toLowerCase();
        if (tipe == "danger" || tipe == "red") {
            element.classList.add("danger");
        } else if (tipe == "info" || tipe == "green") {
            element.classList.add("info");
        } else if (tipe == "blue") {
            element.classList.add("blue")
        }
        btnIya.addEventListener('click', () => {
            options.onyes();
            this.end(element)
        });
        try {
            document.querySelector(".Popup").remove()
        } catch {};
        document.body.appendChild(template.content)
    },
    confirm(options) {
        options = Object.assign({}, {
            msg: 'Infoo, Kami Dari Pihak Developer Aplikasi ACHATS Ingin Meminta Maaf Kepada Para Pengguna Aplikasi Dikarenakan UI Aplikasi Ada Yang Tidak Bisa Dipakai, Dan Untuk Itu Kami Meminta Maaf, Terimakasih.',
            yes: 'OK',
            no: 'CANCEL',
            type: 'info',
            onyes: () => {},
            onno: () => {}
        }, options);

        const html = (`
            <div class="Popup">
                <div class="box">
                    <div class="msg">${options.msg}</div>
                    <div class="buttons">
                        <button class="btn confirm no">${options.no}</button>
                        <button class="btn confirm yes">${options.yes}</button>
                    </div>
                </div>
            </div>
        `);
        const template = document.createElement('template');
        template.innerHTML = html;
        const element = template.content.querySelector('.Popup');
        const btnIya = template.content.querySelector('.box .buttons .yes');
        const btnTidak = template.content.querySelector('.box .buttons .no');
        const tipe = options.type.toLowerCase();
        if (tipe == "danger" || tipe == "red") {
            element.classList.add("danger");
        } else if (tipe == "info" || tipe == "green") {
            element.classList.add("info");
        } else if (tipe == "blue") {
            element.classList.add("blue");
        }
        btnIya.addEventListener('click', () => {
            options.onyes();
            this.end(element)
        });
        btnTidak.addEventListener('click', () => {
            options.onno();
            this.end(element)
        });
        try {
            document.querySelector(".Popup").remove()
        } catch {};
        document.body.appendChild(template.content)
    },
    end(element) {
        if(element) {
            element.querySelector(".box").classList.add("fade");
            setTimeout(() => {
                element.remove();
            }, 300)
        }
    },
}
