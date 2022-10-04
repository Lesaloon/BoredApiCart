
async function getNewActivity() {
    const response = await fetch('https://www.boredapi.com/api/activity');
    const data = await response.json();

    const activity = data.activity;
    const type = data.type;
    const participants = data.participants;
    const price = data.price;
    const accessibility = data.accessibility;
    const link = data.link;

    document.getElementById('activity').innerHTML = activity;
    document.getElementById('type').innerHTML = type;
    document.getElementById('participants').innerHTML = participants;

    // find the color for the price using a lerped color

    const priceColor = findColor(price);

    document.getElementsByClassName('price-bar-fill')[0].style.backgroundColor = `rgb(${priceColor[0]}, ${priceColor[1]}, ${priceColor[2]})`;
    if (price === 0) { 
        document.getElementsByClassName('price-bar-fill')[0].style.width = `0.1%`;
    } else {
        document.getElementsByClassName('price-bar-fill')[0].style.width = `${price * 100}%`;
    }

    // find the color for the accessibility using a lerped color

    const accessibilityColor = findColor(accessibility);

    document.getElementsByClassName('accessibility-bar-fill')[0].style.backgroundColor = `rgb(${accessibilityColor[0]}, ${accessibilityColor[1]}, ${accessibilityColor[2]})`;
    if (accessibility === 0) {
        document.getElementsByClassName('accessibility-bar-fill')[0].style.width = `0.1%`;
    } else {
        document.getElementsByClassName('accessibility-bar-fill')[0].style.width = `${accessibility * 100}%`;
    }

    if (!link) {
        document.getElementsByClassName('link')[0].href = link;
        document.getElementsByClassName('link')[0].style.display = 'block';
    }else {
        document.getElementsByClassName('link')[0].href = '#';
        document.getElementsByClassName('link')[0].style.display = 'none';
    }

}

function findColor(a) {
    if(a <= 0.5) {
        // map a to be between 0 and 1
        let b = a * 2;
        return lerpColor([46, 204, 113], [230, 126, 34], b);
    } else {
        // map a to be between 0 and 1
        let b = (a - 0.5) * 2;
        return lerpColor([243, 156, 18], [231, 76, 60], b);
    }
}

function lerpColor(color1, color2, value) {
    const r = lerp(color1[0], color2[0], value);
    const g = lerp(color1[1], color2[1], value);
    const b = lerp(color1[2], color2[2], value);
    return [r, g, b];
}

function lerp(v0, v1, amt, maxMove = 0, minDiff = 0.0001) {
	let diff = v1 - v0;
	if (maxMove > 0) {
		diff = Math.min(diff, maxMove);
		diff = Math.max(diff, -maxMove);
	}
	if (Math.abs(diff) < minDiff) {
		return v1;
	}
	return v0 + diff * amt;
};

document.getElementsByClassName("reroll-btn")[0].addEventListener("click", getNewActivity);

getNewActivity();


function ChangeLightMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

document.getElementsByClassName("dark-mode-btn")[0].addEventListener("click", ChangeLightMode);
