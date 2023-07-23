import { Link } from 'react-router-dom';
import './ProductInfo/ProductInfo.css';
function BreadcrumbNav({ params }) {
    return (
        
        <nav className="breadcrumb">
            <ul className="breadcrumb_ul">
                <li className="breadcrumb_li">
                    <Link to="/">{'<'} Գլխավոր էջ</Link>
                </li>
                <li className="breadcrumb_li">
                    <Link to={`/categories/${params.category}`}>{params.category}</Link>
                </li>
                <li className="breadcrumb_li">
                    <Link to={`/categories/${params.category}/${params._id}/details`}>{params.title}</Link>
                </li>
            </ul>
        </nav>
    )
}

export default BreadcrumbNav;
