import { useState } from 'react';

const Coupon = ({
        applyDiscount,
        selectedLanguage
    }) => {
    const [coupon, setCoupon] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCouponButton = () => {
        let number = parseInt(coupon);

        if (number > 0) {
            applyDiscount(number);
        } else {
            setErrorMessage(selectedLanguage.invalidCoupon);
            setTimeout(() => setErrorMessage(''), 2000);
        }
    }

    return (
        <section className="coupon">
            <input type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder={selectedLanguage.couponPlaceholder} />
            <button onClick={handleCouponButton}>{selectedLanguage.couponButton}</button>
            <div>{errorMessage}</div>
        </section>
    );
}

export default Coupon;