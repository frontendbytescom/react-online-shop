const Footer = ({ selectedLanguage }) => {
    return (
        <footer>
            <p>{selectedLanguage.footerHeader}</p>
            <p>{selectedLanguage.footerDisclaimer}</p>
        </footer>
    )
};

export default Footer;