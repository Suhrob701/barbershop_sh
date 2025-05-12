document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const loading = document.getElementById('loading');
    const validText = document.querySelector(".invalid");
    let tryCount = 0;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Form elementlarini olish
        const fullName = document.getElementById('fullName');
        const subject = document.getElementById('subject');
        const phoneNumber = document.getElementById('phoneNumber');
        const emailAddress = document.getElementById('emailAddress');
        const message = document.getElementById('message');

        // oldingi errorlarni tozalash
        [fullName, subject, phoneNumber, emailAddress, message].forEach(input => {
            input.classList.remove('invalid-input');
        });
        validText.style.display = 'none';

        // 1-urinishda noto‘g‘ri ko‘rsatilsa xabar chiqaramiz
        if (tryCount === 0) {
            [fullName, subject, phoneNumber, emailAddress, message].forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('invalid-input');
                }
            });
            validText.style.display = 'block';
            tryCount++;
            return;
        } else {
            // 2-urinishda yuborish
            loading.style.display = 'block';

            setTimeout(() => {
                const jonatish = `
<b>Yangi Appointment!</b>\n
<b>Ism:</b> ${fullName.value}
<b>Mavzu:</b> ${subject.value}
<b>Telefon:</b> ${phoneNumber.value}
<b>Email:</b> ${emailAddress.value}
<b>Xabar:</b> ${message.value}
                `;

                const url = `https://api.telegram.org/bot7836701600:AAGNsa526JD3_0xRWHOp84Mnwn_FM8Eu_E4/sendMessage?chat_id=704396261&text=${encodeURIComponent(jonatish)}&parse_mode=HTML`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        loading.style.display = 'none';
                        if (data.ok) {
                            alert("Yuborildi!");
                            form.reset();
                        } else {
                            alert("Telegramga yuborishda xatolik: " + data.description);
                        }
                    })
                    .catch((error) => {
                        loading.style.display = 'none';
                        alert("Xatolik yuz berdi: " + error.message);
                    });
            }, 2000);
        }
    });
});
