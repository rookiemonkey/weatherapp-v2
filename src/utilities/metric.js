function metric(input, type) {
    switch (type) {
        case "temp":
            return ((input - 32) * (5 / 9));
            break;
        case "distance":
            return Math.round((input * 1.609) * 10) / 10;
            break;
    }
}

export default metric;