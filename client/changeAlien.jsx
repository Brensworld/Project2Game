const { createRoot } = require('react-dom/client');
const React = require('react');
const helper = require('./helper.js')

const handleAlienChange = (e) => {
    e.preventDefault();

    const form = document.getElementById('alienForm');
    const radios = form.elements["alienSelect"];
    const alien = radios.value;
    const username = helper.getCookie('username');

    helper.sendPost(e.target.action, { username, alien });
}


const AlienForm = (props) => {

    const [greenChoice, setGreen] = React.useState(props.greenChoice);
    const [blueChoice, setBlue] = React.useState(props.blueChoice);
    const [purpleChoice, setPurple] = React.useState(props.purpleChoice);
    const [paid,setPaid]=React.useState(false);

    React.useEffect(() => {
        const loadAlienURL = async () => {
            const response = await fetch('/getAlien');
            const data = await response.json();
            const alienURL = data.alien;

            const paidRepsonse = await fetch('/getPaid');
            const paidData = await paidRepsonse.json();
            setPaid(paidData.paid);

            setGreen(!(alienURL.includes("bloo")) && !(alienURL.includes("purple")));
            setBlue(alienURL.includes("bloo"));
            setPurple(alienURL.includes("purple") && paidData.paid);
        };
        loadAlienURL();

    }, []);

    //messy choice tree, but unfortunatley i don't know how to make
    //one variable for an element to return and add to that
    if (greenChoice && paid) {
        return (
            <form action="/changeAlien" method="POST" id='alienForm' onSubmit={handleAlienChange}>
                <input type="radio" id='greenAlien' name="alienSelect" value="/assets/img/ailyun.png" defaultChecked />
                <label for="greenAlien">Green</label>
                <img id="greenAlienImg" src="/assets/img/ailyun.png" alt="green alien" widht="128" height="128" />

                <input type="radio" id='blueAlien' name="alienSelect" value="/assets/img/blooailyun.png" />
                <label for="blueAlien">Blue</label>
                <img id="blueAlienImg" src="/assets/img/blooailyun.png" alt="blue alien" widht="128" height="128" />

                <input type="radio" id='purpleAlien' name="alienSelect" value="/assets/img/purpleailyun.png" />
                <label for="purpleAlien">Purple (PAID COSMETIC)</label>
                <img id="purpleAlienImg" src="/assets/img/purpleailyun.png" alt="purple alien" widht="128" height="128" />

                <input type="submit" value="Submit" />
            </form>
        )
    } else if (greenChoice) {
        return (
            <form action="/changeAlien" method="POST" id='alienForm' onSubmit={handleAlienChange}>
                <input type="radio" id='greenAlien' name="alienSelect" value="/assets/img/ailyun.png" defaultChecked />
                <label for="greenAlien">Green</label>
                <img id="greenAlienImg" src="/assets/img/ailyun.png" alt="green alien" widht="128" height="128" />

                <input type="radio" id='blueAlien' name="alienSelect" value="/assets/img/blooailyun.png" />
                <label for="blueAlien">Blue</label>
                <img id="blueAlienImg" src="/assets/img/blooailyun.png" alt="blue alien" widht="128" height="128" />

                <input type="radio" id='purpleAlien' name="alienSelect" value="/assets/img/purpleailyun.png" disabled />
                <label for="purpleAlien">Purple (PAID COSMETIC)</label>
                <img id="purpleAlienImg" src="/assets/img/purpleailyun.png" alt="purple alien" widht="128" height="128" />

                <input type="submit" value="Submit" />
            </form>
        )
    } else if (blueChoice && paid) {
        return (
            <form action="/changeAlien" method="POST" id='alienForm' onSubmit={handleAlienChange}>
                <input type="radio" id='greenAlien' name="alienSelect" value="/assets/img/ailyun.png" />
                <label for="greenAlien">Green</label>
                <img id="greenAlienImg" src="/assets/img/ailyun.png" alt="green alien" widht="128" height="128" />

                <input type="radio" id='blueAlien' name="alienSelect" value="/assets/img/blooailyun.png" defaultChecked />
                <label for="blueAlien">Blue</label>
                <img id="blueAlienImg" src="/assets/img/blooailyun.png" alt="blue alien" widht="128" height="128" />

                <input type="radio" id='purpleAlien' name="alienSelect" value="/assets/img/purpleailyun.png" />
                <label for="purpleAlien">Purple (PAID COSMETIC)</label>
                <img id="purpleAlienImg" src="/assets/img/purpleailyun.png" alt="purple alien" widht="128" height="128" />

                <input type="submit" value="Submit" />
            </form>
        )
    } else if (blueChoice) {
        return (
            <form action="/changeAlien" method="POST" id='alienForm' onSubmit={handleAlienChange}>
                <input type="radio" id='greenAlien' name="alienSelect" value="/assets/img/ailyun.png" />
                <label for="greenAlien">Green</label>
                <img id="greenAlienImg" src="/assets/img/ailyun.png" alt="green alien" widht="128" height="128" />

                <input type="radio" id='blueAlien' name="alienSelect" value="/assets/img/blooailyun.png" defaultChecked />
                <label for="blueAlien">Blue</label>
                <img id="blueAlienImg" src="/assets/img/blooailyun.png" alt="blue alien" widht="128" height="128" />

                <input type="radio" id='purpleAlien' name="alienSelect" value="/assets/img/purpleailyun.png" disabled />
                <label for="purpleAlien">Purple (PAID COSMETIC)</label>
                <img id="purpleAlienImg" src="/assets/img/purpleailyun.png" alt="purple alien" widht="128" height="128" />

                <input type="submit" value="Submit" />
            </form>
        )
    } else if (purpleChoice) {
        return (
            <form action="/changeAlien" method="POST" id='alienForm' onSubmit={handleAlienChange}>
                <input type="radio" id='greenAlien' name="alienSelect" value="/assets/img/ailyun.png" />
                <label for="greenAlien">Green</label>
                <img id="greenAlienImg" src="/assets/img/ailyun.png" alt="green alien" widht="128" height="128" />

                <input type="radio" id='blueAlien' name="alienSelect" value="/assets/img/blooailyun.png" />
                <label for="blueAlien">Blue</label>
                <img id="blueAlienImg" src="/assets/img/blooailyun.png" alt="blue alien" widht="128" height="128" />

                <input type="radio" id='purpleAlien' name="alienSelect" value="/assets/img/purpleailyun.png" defaultChecked />
                <label for="purpleAlien">Purple (PAID COSMETIC)</label>
                <img id="purpleAlienImg" src="/assets/img/purpleailyun.png" alt="purple alien" widht="128" height="128" />

                <input type="submit" value="Submit" />
            </form>
        )
    }

}



const handlePayment = async (e, onPaymentChange) => {
    const response = await fetch('/getPaid');
    const data = await response.json();

    const paid = data.paid;

    const username = helper.getCookie('username');

    helper.sendPost(e.target.value, { paid, username }, onPaymentChange)

    //if they were previously paid, switching to unpaid
    //remove purple alien
    if (paid) {
        helper.sendPost("/changeAlien", { username, alien: "/assets/img/ailyun.png" });
    }
    return false;
}


const PaymentForm = (props) => {
    const [paid, setPaid] = React.useState(props.paid);

    React.useEffect(() => {
        console.log('trigger');
        const loadPaid = async () => {
            const response = await fetch('/getPaid');
            const data = await response.json();

            setPaid(data.paid);
        };
        loadPaid();

    }, [props.reloadPaymentButton]);



    if (paid) {
        return (
            <button type="button" onClick={(e) => handlePayment(e, props.triggerReload)}
                value={'/setPaid'}>Unpurchase Cosmetics</button>
        )
    } else {
        return (
            <button type="button" value={'/setPaid'}
                onClick={(e) => handlePayment(e, props.triggerReload)}>Purchase Cosmetics</button>
        )
    }

}


const App = () => {

    const [reloadPaymentButton, setPaymentButton] = React.useState(false);

    return (
        <div>
            <AlienForm greenChoice={false} blueChoice={false} purpleChoice={false} />
            <PaymentForm paid={false} reloadPaymentButton={reloadPaymentButton} triggerReload={() => setPaymentButton(!reloadPaymentButton)} />
        </div>
    )
}


const init = () => {
    const root = createRoot(document.getElementById('content'));

    root.render(<App />)
}

window.onload = init;