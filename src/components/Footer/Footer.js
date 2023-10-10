import "./Footer.css";

const Footer = () => {
  console.log("footer");
  const year = new Date("2023-09-12").getFullYear();

  return (
    <footer className="footer">
      <div>Developed by Maryam Afzali</div>
      <div>{year}</div>
    </footer>
  );
};

export default Footer;
