import { Link } from 'react-router-dom';
import './Categories.css';
import { TiSortAlphabetically,TiShoppingCart } from 'react-icons/ti';


function CategoriesNav() {
    return (
        <div className="categories_nav_wrapper" >
            <h1>Կատեգորիաներ</h1>
            <div className='categories_nav_links'>
            <Link to="/categories/all">
                <button className="categories_nav_btn"><TiSortAlphabetically />Բոլորը</button>{' '}
            </Link>
            <Link to="/categories/Թափք">
                <button className="categories_nav_btn">Թափք</button>{' '}
            </Link>
            <Link to="/categories/Ընթացքաին մաս">
                <button className="categories_nav_btn">Ընթացքաին մաս</button>{' '}
            </Link>
            <Link to="/categories/Շարժիչ">
                <button className="categories_nav_btn">Շարժիչ</button>{' '}
            </Link>
            <Link to="/categories/Փոխ․Տուփ">
                <button className="categories_nav_btn">Փոխ․Տուփ</button>{' '}
            </Link>
            <Link to="/categories/Էլեկտրոնիկա">
                <button className="categories_nav_btn">Էլեկտրոնիկա</button>{' '}
            </Link>
            <Link to="/categories/Ինտերիեր">
                <button className="categories_nav_btn">Ինտերիեր</button>{' '}
            </Link>
            <Link to="/categories/Աքսեսուարներ">
                <button className="categories_nav_btn">Աքսեսուարներ</button>{' '}
            </Link>
            </div>
            <div className='categories_nav_btn_other_wrapper'>
                <Link to="/makers">
                <button title='Smart Search' className="categories_nav_btn_other"><TiShoppingCart/>Որոնել Ըստ Մոդելի </button>{' '}
            </Link>
            </div>
        </div>
    );
}

export default CategoriesNav;
