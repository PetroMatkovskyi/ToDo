const quotes = [{
        creator: 'У. Клемент Стоун (W. Clement Stone)',
        phrase: 'Чітка мета – перший крок до будь-якого досягнення.',
    },
    {
        creator: 'Альберт Ейнштейн (Albert Einstein)',
        phrase: 'Прагніть бути не просто успішною людиною, а цінним.',
    },
    {
        creator: 'Чарльз Свіндол (Charles Swindoll)',
        phrase: 'Життя на 10% складається з того, що з вами відбувається і 90%, з того, як ви на це реагуєте.',
    },
    {
        creator: 'Христофор Колумб (Christopher Columbus',
        phrase: 'Ти ніколи не перепливеш океан, якщо боятимешся втратити берег із виду.',
    },
    {
        creator: 'Зіг Зиглар (Zig Ziglar)',
        phrase: 'Говорять, що мотивація триває не довго. Що ж, свіжість після ванни – теж. Тому піклуватися про них варто щодня.',
    },
    {
        creator: 'Антуан де Сент-Екзюпері (Antonie de Saint – Exupery)',
        phrase: 'Досконалість – це не тоді, коли нічого додати, а тоді, коли нічого відняти.',
    },
    {
        creator: 'Теодор Рузвельт (Theodore Roosevelt)',
        phrase: 'Повірте, що зможете, і пів шляху вже пройдено.',
    },
    {
        creator: 'Хелен Келлер (Helen Keller)',
        phrase: 'Коли закриваються одні двері в щастя, відкривається інша. Але ми часто занадто довго дивимося на закриті двері, щоб побачити, що нам відкрилося.',
    },
    {
        creator: 'Майя Енджелоу (Maya Angelou)',
        phrase: 'Життя вимірюється не кількістю наших вдохів, а кількістю моментів, від яких перехоплює дихання.',
    },
    {
        creator: 'Шеріл Сендберг (Sheryl Sandberg)',
        phrase: 'Якщо вам запропонували місце на космічному кораблі, не запитуйте, яке місце! Встрибуйте всередину!',
    },
    {
        creator: 'Латинська приказка',
        phrase: 'Відчуйте попутний вітер у вашому вітрилі. Рухайтеся.Якщо немає вітру, беріться за весла.',
    },
    {
        creator: 'Невідомий автор',
        phrase: 'Ти не впадеш, якщо не підіймаєшся в гору. Але яка радість від цілого життя, проведеного на землі.',
    },
    {
        creator: 'Вінс Ломбарді (Vince Lombardi)',
        phrase: 'Одна перемога не веде до успіху, на відміну від постійного бажання перемагати.',
    },
    {
        creator: 'Альберт Ейнштейн (Albert Einstein)',
        phrase: 'Людина, яка ніколи не здійснювала помилок, ніколи не пробувала зробити щось по-іншому.',
    },
    {
        creator: 'Фарра Грей (Farrah Gray)',
        phrase: 'Здійснюйте свої мрії, або хтось візьме вас на роботу для здійснення своїх.',
    },
    {
        creator: 'Опра Уінфрі (Oprah Winfrey)',
        phrase: 'Якщо ви цінуєте те, що у вас вже є в житті, ви завжди отримуватимете ще більше. Якщо думати лише про те, чого у вас немає – вам ніколи не буде досить.',
    },
    {
        creator: 'Далай-лама (Dalai Lama)',
        phrase: 'Запам’ятайте, іноді не отримати бажаного – найбільша удача.',
    },
    {
        creator: 'Бенджамін Франклін (Benjamin Franklin)',
        phrase: 'Або напишіть книгу, варту уваги, або зробіть щось, варте написання книги.',
    },
    {
        creator: 'Стів Джобс (Steve Jobs)',
        phrase: 'Єдиний спосіб зробити видатну роботу – щиро любити те, що робиш.',
    },
    {
        creator: 'Зіг Зіглар (Zig Ziglar)',
        phrase: 'Якщо ти можеш щось уявити – ти можеш цього досягти!',
    },
    {
        creator: 'Дана Уайт',
        phrase: 'Я ненавиджу вихідні! Я хочу, щоб як найшвидше наступив понеділок. Ось наскільки я люблю те чим займаюсь. Якщо це не ваш менталітет і ви боїтесь понеділків, то зупинітся і знайдіть іншу роботу. Це вас вбиває!',
    },
    {
        creator: 'Генрі Форд',
        phrase: 'Людина вмирає тоді, коли перестає змінюватися, а похорони - просто формальність.',
    },
    {
        creator: 'Генрі Форд',
        phrase: 'Якби я робив тільки те, що хочуть від мене люди, вони б досі їздили на каретах.',
    },
    {
        creator: 'Генрі Форд',
        phrase: 'Найкраща робота - це високооплачуване хобі.',
    },
    {
        creator: 'Генрі Форд',
        phrase: 'Молода людина повинна шукати ту єдину іскру індивідуальності, яка відрізняє її від інших людей, і розпалювати її всіма силами. Не давайте іскрі згаснути.',
    },
    {
        creator: 'Генрі Форд',
        phrase: 'Все можна зробити краще, ніж робилось до тепер',
    },
];

let [dateNow, mounthNow] = new Date().toLocaleDateString().split('.');
console.log(dateNow, mounthNow);

function outputQuotes() {
    let check = {};

    if (localStorage.getItem('check')) {
        check = JSON.parse(localStorage.getItem('check'));
    }

    return function() {
        if (!check.dataToday ||
            !check.mounthToday ||
            dateNow !== check.dataToday ||
            mounthNow !== check.mounthToday
        ) {
            [check.dataToday, check.mounthToday] = [dateNow, mounthNow];
            check.randomNum = Math.ceil(Math.random() * quotes.length);
        }
        localStorage.setItem('check', JSON.stringify(check));
        return check.randomNum;
    };
}
const ran = outputQuotes();

console.log(`${quotes[ran()].phrase}
                                     ${quotes[ran()].creator}`);