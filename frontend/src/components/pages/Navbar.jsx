import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
        <h4>Product Store</h4>
      <ul>
        <Link to={'/'} className="hyperLink"><li>Home</li></Link>
        <Link to={'/products'}  className="hyperLink"><li>Product List</li></Link>
        <Link to={'/create'}><button className="btn-nav">Create Product</button></Link>
      </ul>
    </nav>
  );
};

export default Navbar;
