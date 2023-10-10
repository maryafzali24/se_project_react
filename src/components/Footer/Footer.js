import "./Footer.css";

const Footer = () => {
  console.log("footer");
  const year = 2023;

  return (
    <footer className="footer">
      <div>Developed by Maryam Afzali</div>
      <div>{year}</div>
    </footer>
  );
};

export default Footer;
